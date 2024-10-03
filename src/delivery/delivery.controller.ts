import { Controller, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @Post()
    create() {
        return this.deliveryService.createDelivery();
    }

    @Post(':id')
    cancelDelivery() {
        return this.deliveryService.createDelivery();
    }
}
