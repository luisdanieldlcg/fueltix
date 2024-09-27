import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket-dto';
import { AccessGuard } from 'src/auth/auth.guards';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Post()
    @UseGuards(AccessGuard)
    create(@Body() dto: CreateTicketDto) {
        return this.ticketsService.createTicket(dto);
    }

    @Get()
    @UseGuards(AccessGuard)
    getAll() {
        return this.ticketsService.getAllTickets();
    }

    @Get(':id')
    @UseGuards(AccessGuard)
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.ticketsService.getTicketById(id);
    }

    @Delete(':id')
    @UseGuards(AccessGuard)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ticketsService.deleteTicketById(id);
    }

    // update ticket
    @Patch(':id')
    @UseGuards(AccessGuard)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTicketDto) {
        return this.ticketsService.updateById(id, dto);
    }
}
