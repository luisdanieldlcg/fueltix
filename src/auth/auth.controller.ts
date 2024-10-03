import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/register.dto';
import { CookieService } from 'src/common/services/cookie.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cookieService: CookieService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async logIn(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userData = await this.authService.authenticateUser(
            dto.email,
            dto.password,
        );
        this.cookieService.setAccessCookie(res, userData.token);
        return userData;
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(
        @Body() dto: SignupDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const userData = await this.authService.createUser(dto);
        this.cookieService.setAccessCookie(res, userData.token);
        return userData;
    }

    @Get('verify')
    @HttpCode(HttpStatus.OK)
    async verify() {
        return {};
    }

    @Get('logout')
    @HttpCode(HttpStatus.OK)
    async logout() {
        return {};
    }
}
