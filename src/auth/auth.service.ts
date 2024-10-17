import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    Logger,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dtos/register.dto';
import { comparePasswordHash } from 'src/common/bcrypt-util';
import { JwtPayload } from './auth.interfaces';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { User } from 'src/user/user.model';
import { Response } from 'express';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly config: ConfigType<typeof jwtConfig>,
    ) {}

    async authenticateUser(email: string, password: string) {
        console.log('Attempting to authenticate user');
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new HttpException(
                'El usuario no existe o la contraseña es incorrecta',
                HttpStatus.NOT_FOUND,
            );
        }
        const valid = await comparePasswordHash(password, user.password);

        if (!valid) {
            throw new HttpException(
                'El usuario no existe o la contraseña es incorrecta',
                HttpStatus.UNAUTHORIZED,
            );
        }

        return this.logIn(user);
    }

    async createUser(dto: SignupDto) {
        this.logger.log('Attempting to create user');
        const exists = await this.userService.exists(dto.email);
        if (exists) {
            this.logger.error('User already exists');
            throw new HttpException(
                'El usuario ya existe',
                HttpStatus.CONFLICT,
            );
        }
        const user = await this.userService.create(dto);
        return this.logIn(user);
    }

    private async logIn(user: User) {
        const payload: JwtPayload = {
            userId: user.id,
            role: user.role,
        };

        // Sign access token
        const token = await this.jwtService.signAsync(payload, {
            privateKey: this.config.JWT_PRIVATE_KEY,
        });

        return {
            ...user,
            token,
        };
    }
}
