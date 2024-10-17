import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/delivery.dtos';

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @Post()
    create(dto: CreateDeliveryDto) {
        return this.deliveryService.createDelivery(dto);
    }

    @Post(':id')
    cancelDelivery(@Param('id', ParseIntPipe) id: number) {
        return this.deliveryService.cancelDelivery(id);
    }
}
