import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dtos/register.dto';
import { comparePasswordHash } from 'src/common/bcrypt-util';
import { JwtPayload } from './auth.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    //
  }

  async authenticateUser(email: string, password: string) {
    this.logger.log('Attempting to login user with email {}', email);
    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.error('User does not exist');
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const valid = await comparePasswordHash(password, user.password);
    if (!valid) {
      this.logger.error('Invalid password');
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload: JwtPayload = {
      userId: user.id,
    };

    const token = await this.jwtService.signAsync(payload, {
      privateKey: 'my-example-private-key',
    });

    return {
      ...user,
      token,
    };
  }

  async createUser(dto: SignupDto) {
    this.logger.log('Attempting to create user');
    const exists = await this.userService.exists(dto.email);
    if (exists) {
      this.logger.error('User already exists');
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const user = await this.userService.create(dto);

    const payload: JwtPayload = {
      userId: user.id,
    };
    const token = await this.jwtService.signAsync(payload, {
      privateKey: 'my-example-private-key',
    });
    return {
      ...user,
      token,
    };
  }
}
