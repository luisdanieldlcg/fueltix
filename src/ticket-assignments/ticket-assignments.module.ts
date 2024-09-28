import { Module } from '@nestjs/common';
import { TicketAssignmentsService } from './ticket-assignments.service';
import { TicketAssignmentsController } from './ticket-assignments.controller';

@Module({
    providers: [TicketAssignmentsService],
    controllers: [TicketAssignmentsController],
})
export class TicketAssignmentsModule { }
