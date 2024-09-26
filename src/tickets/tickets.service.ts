import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FuelTickets } from './tickets.model';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(FuelTickets)
    private userRepository: Repository<FuelTickets>,
  ) {}

  async createTicket(dto: CreateTicketDto) {
    return "fpd;"
  }

  createManyTickets() {}
}
