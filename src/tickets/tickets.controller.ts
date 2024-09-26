import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket-dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  // @UseGuards(AccessGuard)
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.createTicket(dto);
  }

  @Get()
  getAll() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.getTicketById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.deleteTicketById(id);
  }

  // update ticket
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTicketDto) {
    return this.ticketsService.updateById(id, dto);
  }
}
