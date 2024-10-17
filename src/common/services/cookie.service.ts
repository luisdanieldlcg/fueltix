import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

const REFRESH_TOKEN_PATH = '/api/v1/auth/refresh-token';

export const jwtCookieConstants = {
    accessTokenName: 'access-token',
    refreshTokenName: 'refresh-token',
};

@Injectable()
export class CookieService {
    constructor(private readonly config: ConfigService) {}

    public setAccessCookie(response: Response, token: string) {
        // const minutes = this.config.SESSION_LIFETIME;
        // const maxAgeInMS = minutes * 60 * 1000;
        response.cookie(jwtCookieConstants.accessTokenName, token, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 100,
        });
    }

    public clearAccessCookie(res: Response) {
        res.clearCookie(jwtCookieConstants.accessTokenName, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
    }

    public setRefreshCookie(response: Response, token: string) {
        // const hours = this.config.REFRESH_TOKEN_LIFETIME;
        // const maxAgeInMS = hours * 60 * 60 * 1000;
        // response.cookie(jwtCookieConstants.refreshTokenName, token, {
        //   httpOnly: true,
        //   secure: false,
        //   path: REFRESH_TOKEN_PATH,
        //   maxAge: maxAgeInMS,
        // });
    }

    // public terminateRefreshTokenCookie(response: Response) {
    //   response.clearCookie(jwtCookieConstants.refreshTokenName, {
    //     path: REFRESH_TOKEN_PATH,
    //   });
    // }
    // public terminateAccessTokenCookie(response: Response) {
    //   response.clearCookie(jwtCookieConstants.refreshTokenName);
    // }
}
