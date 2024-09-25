import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dtos/register.dto';
import { comparePasswordHash} from 'src/common/bcrypt-util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {
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

    return user;
  }

  async createUser(dto: SignupDto) {
    this.logger.log('Attempting to create user');
    const exists = await this.userService.exists(dto.email);
    if (exists) {
      this.logger.error('User already exists');
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return this.userService.create(dto);
  }
}
