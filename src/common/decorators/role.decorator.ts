import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums';

export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata('roles', roles);
