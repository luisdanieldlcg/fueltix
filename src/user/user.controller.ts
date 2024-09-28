import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AccessGuard, RoleGuard } from 'src/auth/auth.guards';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AccessGuard, RoleGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
