import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketAssignmentDto } from './dto/create-assignment.dto';
import { TicketsService } from 'src/tickets/tickets.service';
import { FuelTickets } from 'src/tickets/tickets.model';
import { Repository } from 'typeorm';
import { TicketAssignments } from './ticket-assignments.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TicketAssignmentsService {
    constructor(
        private readonly ticketsService: TicketsService,
        @InjectRepository(TicketAssignments)
        private readonly assignmentsRepository: Repository<TicketAssignments>,
        private readonly userService: UserService,
    ) {}

    async assignTicket(dto: CreateTicketAssignmentDto) {
        const availableTickets = await this.ticketsService.getActiveTickets();
        if (availableTickets.length === 0) {
            throw new HttpException(
                'No hay tickets disponibles',
                HttpStatus.BAD_REQUEST,
            );
        }
        this.throwIfNotEnoughTickets(
            availableTickets,
            dto.amount200,
            dto.amount500,
            dto.amount1000,
            dto.amount2000,
        );

        const employeeUser = await this.userService.findById(dto.employeeId);

        if (!employeeUser) {
            throw new HttpException(
                'No se encontró al empleado',
                HttpStatus.BAD_REQUEST,
            );
        }

        // asigna los tickets
        const assignment = this.assignmentsRepository.create({
            amount:
                dto.amount200 * 200 +
                dto.amount500 * 500 +
                dto.amount1000 * 1000 +
                dto.amount2000 * 2000,
            status: 1,
            employeeId: dto.employeeId,
            fullName: employeeUser.fullName,
        });

        await this.assignmentsRepository.save(assignment);
        await this.ticketsService.deactivateTickets(
            dto.amount200,
            dto.amount500,
            dto.amount1000,
            dto.amount2000,
        );

        return assignment;
    }

    private throwIfNotEnoughTickets(
        availableTickets: FuelTickets[],
        checkAmount200: number,
        checkAmount500: number,
        checkAmount1000: number,
        checkAmount2000: number,
    ): boolean {
        // prueba si hay suficientes tickets de cada tipo
        const tickets200 = availableTickets.filter(
            (fuel) => fuel.amount === 200,
        );
        const tickets500 = availableTickets.filter(
            (fuel) => fuel.amount === 500,
        );
        const tickets1000 = availableTickets.filter(
            (fuel) => fuel.amount === 1000,
        );
        const tickets2000 = availableTickets.filter(
            (fuel) => fuel.amount === 2000,
        );

        if (checkAmount200 > tickets200.length) {
            throw new HttpException(
                'No hay suficientes tickets de 200',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (checkAmount500 > tickets500.length) {
            throw new HttpException(
                'No hay suficientes tickets de 500',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (checkAmount1000 > tickets1000.length) {
            throw new HttpException(
                'No hay suficientes tickets de 1000',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (checkAmount2000 > tickets2000.length) {
            throw new HttpException(
                'No hay suficientes tickets de 2000',
                HttpStatus.BAD_REQUEST,
            );
        }
        return true;
    }

    getAssignments() {
        return this.assignmentsRepository.find();
    }
}
