import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket-dto';
import { AccessGuard, RoleGuard } from 'src/auth/auth.guards';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @Post()
    @Roles(Role.ADMIN, Role.SUPERVISOR)
    @UseGuards(AccessGuard, RoleGuard)
    create(
        @Body(
            new ParseArrayPipe({
                items: CreateTicketDto,
            }),
        )
        dtos: CreateTicketDto[],
    ) {
        return this.ticketsService.createTicket(dtos);
    }

    @Get()
    @Roles(Role.ADMIN, Role.SUPERVISOR)
    @UseGuards(AccessGuard, RoleGuard)
    getAll() {
        return this.ticketsService.getAllTickets();
    }

    @Get('summary')
    @Roles(Role.ADMIN, Role.SUPERVISOR)
    @UseGuards(AccessGuard, RoleGuard)
    getSummary() {
        return this.ticketsService.getTicketsSummary();
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.SUPERVISOR)
    @UseGuards(AccessGuard, RoleGuard)
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.ticketsService.getTicketById(id);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AccessGuard, RoleGuard)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ticketsService.deleteTicketById(id);
    }

    @Patch(':id')
    @Roles(Role.ADMIN, Role.SUPERVISOR)
    @UseGuards(AccessGuard, RoleGuard)
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateTicketDto,
    ) {
        return this.ticketsService.updateById(id, dto);
    }
}
