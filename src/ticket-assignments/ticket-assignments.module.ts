import { Module } from '@nestjs/common';
import { TicketAssignmentsService } from './ticket-assignments.service';
import { TicketAssignmentsController } from './ticket-assignments.controller';
import { TicketsService } from 'src/tickets/tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelTickets } from 'src/tickets/tickets.model';
import { TicketAssignments } from './ticket-assignments.model';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';

@Module({
    providers: [TicketAssignmentsService, TicketsService, UserService],
    controllers: [TicketAssignmentsController],
    imports: [TypeOrmModule.forFeature([FuelTickets, TicketAssignments, User])],
    exports: [TicketAssignmentsService],
})
export class TicketAssignmentsModule {}
