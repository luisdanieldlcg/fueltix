import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

import { UserModule } from 'src/user/user.module';
import { TicketAssignmentsService } from 'src/ticket-assignments/ticket-assignments.service';

@Module({
    imports: [TicketAssignmentsService, UserModule],
    controllers: [DeliveryController],
    providers: [DeliveryService],
})
export class DeliveryModule {}
