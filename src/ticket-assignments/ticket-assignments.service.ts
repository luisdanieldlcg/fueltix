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

    // async findAssignmentsByEmployeeId(employeeId: number) {
    //     return this.assignmentsRepository.find({
    //         where: { employee: employeeId },
    //     });
    // }

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

        // const employeeUser = await this.userService.findById(dto.employee);

        // if (!employeeUser) {
        //     throw new HttpException(
        //         'No se encontró al empleado',
        //         HttpStatus.BAD_REQUEST,
        //     );
        // }

        // asigna los tickets
        const assignment = this.assignmentsRepository.create({
            amount200: dto.amount200,
            amount500: dto.amount500,
            amount1000: dto.amount1000,
            amount2000: dto.amount2000,
            status: 1,
            employee: dto.employee,
            fullName: dto.employee,
            department: dto.department,
            reason: dto.reason,
            province: dto.province,
            travelDate: dto.travelDate,
            vehicle: dto.vehicle,

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

        let missing200 = checkAmount200 - tickets200.length;
        let missing500 = checkAmount500 - tickets500.length;
        let missing1000 = checkAmount1000 - tickets1000.length;
        let missing2000 = checkAmount2000 - tickets2000.length;

        let missingTickets = [];
        if (missing200 > 0) {
            missingTickets.push({
                amount: 200,
                missing: missing200,
            });
        }

        if (missing500 > 0) {
            missingTickets.push({
                amount: 500,
                missing: missing500,
            });
        }

        if (missing1000 > 0) {
            missingTickets.push({
                amount: 1000,
                missing: missing1000,
            });
        }

        if (missing2000 > 0) {
            missingTickets.push({
                amount: 2000,
                missing: missing2000,
            });
        }

        if (missingTickets.length > 0) {
            throw new HttpException(
                `Faltan ${missingTickets
                    .map(
                        (ticket) =>
                            `${ticket.missing} tickets de ${ticket.amount}`,
                    )
                    .join(', ')}`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return true;
    }

    getActiveAssignments() {
        return this.assignmentsRepository.find({
            where: { status: 1 },
        });
    }

    async cancelAssignment(id: number) {
        const assignment = await this.assignmentsRepository.findOne({
            where: { assignmentId: id },
        });

        if (assignment == null) {
            throw new HttpException(
                'No se encontró la asignación',
                HttpStatus.BAD_REQUEST,
            );
        }

        assignment.status = 0;
        let rolledback = false;
        try {
            await this.assignmentsRepository.save(assignment);
            await this.ticketsService.activateTickets(
                assignment.amount200,
                assignment.amount500,
                assignment.amount1000,
                assignment.amount2000,
            );
            rolledback = true;
        } catch (error) {
            console.log(error);
            rolledback = false;
        }

        if (!rolledback) {
            throw new HttpException(
                'Error al cancelar la asignación',
                HttpStatus.CONFLICT,
            );
        } else {
            return {
                message: 'Asignación cancelada satisfactoriamente',
                recoveredTickets: {
                    amount200: assignment.amount200,
                    amount500: assignment.amount500,
                    amount1000: assignment.amount1000,
                    amount2000: assignment.amount2000,
                },
            };
        }
    }
}
