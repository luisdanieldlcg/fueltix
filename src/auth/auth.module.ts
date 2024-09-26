import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { CookieService } from 'src/common/services/cookie.service';
import { AccessStrategy } from './strategy/access.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      privateKey: 'my-example-private-key',
      secret: 'my-example'
    }),
  ],
  providers: [AuthService, AccessStrategy, UserService, CookieService],
  controllers: [AuthController],
})
export class AuthModule {}
