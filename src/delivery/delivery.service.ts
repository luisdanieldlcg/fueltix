import { CreateDeliveryDto } from './dto/delivery.dtos';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TicketAssignmentsService } from 'src/ticket-assignments/ticket-assignments.service';

@Injectable()
export class DeliveryService {
    constructor(
        private readonly assignmentsService: TicketAssignmentsService,
        private readonly userService: UserService,
    ) {}

    async createDelivery(dto: CreateDeliveryDto) {
        const today = new Date();
        const assignment = await this.assignmentsService.assignTicket({
            amount200: dto.amount200,
            amount500: dto.amount500,
            amount1000: dto.amount1000,
            amount2000: dto.amount2000,
            employeeId: dto.driverId,
            month: today.getMonth(),
            year: today.getFullYear(),
        });
        return dto;
    }

    cancelDelivery(id: number) {
        const assignment = this.assignmentsService.cancelAssignment(id);
        return id;
    }
}
