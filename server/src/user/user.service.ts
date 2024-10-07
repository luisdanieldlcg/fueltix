import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dtos/register.dto';
import { User } from './user.model';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/common/bcrypt-util';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async create(dto: SignupDto) {
        const hash = await hashPassword(dto.password);
        const newUser = this.userRepository.create({
            email: dto.email,
            password: hash,
            createdAt: new Date(),
            fullName: dto.fullname,
            role: dto.role,
            username: dto.username,
        });
        return this.userRepository.save(newUser);
    }

    getAllUsers() {
        return this.userRepository.find();
    }

    exists(email: string): Promise<boolean> {
        return this.userRepository.exists({ where: { email: email } });
    }

    findByEmail(email: string): Promise<User> | null {
        return this.userRepository.findOne({ where: { email: email } });
    }

    findById(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id: id } });
    }

    validateById(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id: id } });
    }
}
