import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

import { UserModule } from 'src/user/user.module';
import { TicketAssignmentsModule } from 'src/ticket-assignments/ticket-assignments.module';

@Module({
    imports: [TicketAssignmentsModule, UserModule],
    controllers: [DeliveryController],
    providers: [DeliveryService],
})
export class DeliveryModule {}
