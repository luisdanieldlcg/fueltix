export interface JwtPayload {
  userId: number;
}

/**
 * Represents an authenticated user.
 */
export interface UserPrincipal {
  readonly userId: number;
  readonly email: string;
}
