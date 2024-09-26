import { AuthGuard } from '@nestjs/passport';
import { jwtCookieConstants } from 'src/common/services/cookie.service';

export class AccessGuard extends AuthGuard(jwtCookieConstants.accessTokenName) {
  constructor() {
    super();
  }
}
