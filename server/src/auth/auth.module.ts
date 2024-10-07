import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from 'src/common/services/cookie.service';
import { AccessStrategy } from './strategy/access.strategy';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: (config: ConfigType<typeof jwtConfig>) => {
                return {
                    privateKey: config.JWT_PRIVATE_KEY,
                    signOptions: {
                        expiresIn: 60 * config.JWT_LIFETIME,
                    },
                };
            },
            inject: [jwtConfig.KEY],
        }),
    ],
    providers: [AuthService, AccessStrategy, UserService, CookieService],
    controllers: [AuthController],
})
export class AuthModule {}
