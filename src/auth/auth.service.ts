import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignupDto } from './dtos/register.dto';
import { hashPassword } from 'src/common/bcrypt-util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userService: UserService) {}

  async authenticateUser(email: string, password: string) {
    this.logger.log('Authenticating user with email {email}');

    if (!this.userService.exists(email)) {
      return;
    }
    const hash = await hashPassword(password);
    if (!hash) return;

    // login user
  }

  async createUser(dto: SignupDto) {
    this.logger.log('Creating user');
    this.userService.create(dto);
  }
}
