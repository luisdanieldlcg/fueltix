import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FuelTickets } from './tickets.model';
import { Repository } from 'typeorm';
import * as bwipjs from 'bwip-js';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(FuelTickets)
    private userRepository: Repository<FuelTickets>,
  ) {}

  async createTicket(dto: CreateTicketDto) {
    const barcode = bwipjs.toSVG({
      // use the barcode value from the dto
      bcid: 'code128',
      text: Math.random().toString(36).substring(7),
    });
    console.log(barcode);
    // register date is current date and time
    const registerDate = new Date();
    // delivery month is the current month
    const deliveryMonth = registerDate.getMonth();
    const ticket = this.userRepository.create({
      ...dto,
      barcode,
      registerDate,
      deliveryMonth,
      status: 0,
      // TODO: update this with the id of the client who SENT the ticket
      employeeNumber: 0,
    });
    return this.userRepository.save(ticket);
  }
  createManyTickets() {}
}
