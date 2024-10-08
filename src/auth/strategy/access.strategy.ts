import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtCookieConstants } from 'src/common/services/cookie.service';
import { UserService } from 'src/user/user.service';
import { JwtPayload, UserPrincipal } from '../auth.interfaces';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';

const cookieExtractor = (req: Request) => {
    const cookies = req.cookies;
    if (!req || !cookies) {
        return undefined;
    }
    const accessToken = req.cookies[jwtCookieConstants.accessTokenName];
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
    constructor(
        private readonly userService: UserService,
        @Inject(jwtConfig.KEY) config: ConfigType<typeof jwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            _ignoreExpiration: false,
            get ignoreExpiration() {
                return this._ignoreExpiration;
            },
            set ignoreExpiration(value) {
                this._ignoreExpiration = value;
            },
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
        };
    }
}
