import { Injectable, Logger } from '@nestjs/common';
import { SignupDto } from 'src/auth/dtos/register.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor() {}

  create(dto: SignupDto) {
    this.logger.log('Creating user');
    return {};
  }

  exists(email: string): boolean {
    return false;
  }
}
