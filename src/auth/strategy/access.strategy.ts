import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtCookieConstants } from 'src/common/services/cookie.service';
import { UserService } from 'src/user/user.service';
import { JwtPayload, UserPrincipal } from '../auth.interfaces';

const cookieExtractor = (req: Request) => {
  const cookies = req.cookies;
  console.log('Checking Cookies', cookies);
  if (!req || !cookies) {
    return undefined;
  }
  const accessToken = req.cookies[jwtCookieConstants.accessTokenName];
  console.log('Access Token', accessToken);
  if (!accessToken) {
    return undefined;
  }
  return accessToken;
};
@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  jwtCookieConstants.accessTokenName,
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: 'my-example-private-key',
    });
  }

  public async validate(payload: JwtPayload): Promise<UserPrincipal> {
    // This will validate that the user still exists
    const user = await this.userService.validateById(payload.userId);
    console.log('User', user);
    return {
      userId: user.id,
      email: user.email,
    };
  }
}
