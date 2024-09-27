import { Controller, Post } from '@nestjs/common';
import { TicketAssignmentsService } from './ticket-assignments.service';

@Controller('ticket-assignments')
export class TicketAssignmentsController {
  constructor(
    private readonly ticketAssignmentsService: TicketAssignmentsService,
  ) {}

  @Post()
  assignTicket() {
    return this.ticketAssignmentsService.assignTicket();
  }
}
