import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPrincipal } from './auth.interfaces';

export const GetUserPrincipal = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const user = ctx.switchToHttp().getRequest().user as UserPrincipal;
        return user;
    },
);
