import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FuelTickets } from './tickets.model';
import { Repository } from 'typeorm';
import * as bwipjs from 'bwip-js';
import { UpdateTicketDto } from './dtos/update-ticket-dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(FuelTickets)
    private ticketRepository: Repository<FuelTickets>,
  ) {}

  async createTicket(dto: CreateTicketDto) {
    const barcode = bwipjs.toSVG({
      bcid: 'code128',
      text: Math.random().toString(36).substring(7),
    });
    const registerDate = new Date();
    // delivery month is the current month
    const deliveryMonth = registerDate.getMonth();

    const ticket = this.ticketRepository.create({
      ...dto,
      barcode,
      registerDate,
      deliveryMonth,
      status: 0,
      // TODO: update this with the id of the client who SENT the ticket
      employeeId: 0,
    });
    return this.ticketRepository.save(ticket);
  }
  createManyTickets() {}

  getAllTickets() {
    return this.ticketRepository.find();
  }

  getTicketById(id: number) {
    return this.ticketRepository.findOneBy({
      fuelTicketId: id,
    });
  }

  deleteTicketById(id: number) {
    this.ticketRepository.delete(id);
    return this.ticketRepository.findOneBy({
      fuelTicketId: id,
    });
  }

  async updateById(id: number, dto: UpdateTicketDto) {
    await this.ticketRepository.update(id, dto);
    // return the updated ticket
    return this.ticketRepository.findOneBy({
      fuelTicketId: id,
    });
  }
}
