import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() dto: LoginDto) {
    this.authService.authenticateUser(dto.email, dto.password);
    return 'login';
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: SignupDto) {
    this.authService.createUser(dto);
    return {};
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify() {
    return {};
  }
}
