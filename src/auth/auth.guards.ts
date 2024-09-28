import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { jwtCookieConstants } from 'src/common/services/cookie.service';
import { UserPrincipal } from './auth.interfaces';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/enums';

export class AccessGuard extends AuthGuard(jwtCookieConstants.accessTokenName) {
  constructor() {
    super();
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user as UserPrincipal;

    if (!user) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const hasRequiredRole = requiredRoles.some((role) => user.role === role);
    return hasRequiredRole;
  }
}
