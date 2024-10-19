import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtCookieConstants } from 'src/common/services/cookie.service';
import { UserService } from 'src/user/user.service';
import { JwtPayload, UserPrincipal } from '../auth.interfaces';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';

const logger = new Logger('AuthGuard');

const cookieExtractor = (req: Request) => {
    const cookies = req.cookies;
    if (!req || !cookies) {
        logger.warn('No cookies found in the request');
        return undefined;
    }
    const accessToken = req.cookies[jwtCookieConstants.accessTokenName];
    if (!accessToken) {
        logger.warn('Request has cookies but no access token');
        return undefined;
    }

    return accessToken;
};
@Injectable()
export class AccessStrategy extends PassportStrategy(
    Strategy,
    jwtCookieConstants.accessTokenName,
) {
    constructor(
        @Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                cookieExtractor,
            ]),
            _ignoreExpiration: false,
            secretOrKey: config.JWT_PRIVATE_KEY,
        });
    }

    public async validate(payload: JwtPayload): Promise<UserPrincipal> {
        // This will validate that the user still exists
        const user = await this.userService.validateById(payload.userId);
        return {
            userId: user.id,
            email: user.email,
            role: user.role,
            username: user.username,
        };
    }
}
