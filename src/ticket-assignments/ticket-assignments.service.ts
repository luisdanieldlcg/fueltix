import { Injectable } from '@nestjs/common';

@Injectable()
export class  TicketAssignmentsService {
  constructor() {}

  assignTicket() {
    return 'Assigning ticket';
  }
}
