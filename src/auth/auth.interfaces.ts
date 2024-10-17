import { Role } from 'src/common/enums';

export interface JwtPayload {
    userId: number;
    role: Role;
}

/**
 * Represents an authenticated user.
 */
export interface UserPrincipal {
    readonly userId: number;
    readonly email: string;
    readonly role: Role;
    readonly username: string;
}
