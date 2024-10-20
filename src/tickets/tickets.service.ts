import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FuelTickets } from './tickets.model';
import { Repository } from 'typeorm';
import * as bwipjs from 'bwip-js';
import { UpdateTicketDto } from './dtos/update-ticket-dto';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(FuelTickets)
        private ticketRepository: Repository<FuelTickets>,
    ) {}

    async createTicket(dtos: CreateTicketDto[]) {
        const tickets = dtos.map((dto) => {
            const barcode_svg = bwipjs.toSVG({
                bcid: 'code128',
                text: dto.barcode.toString(),
                scale: 3,
            });
            const registerDate = new Date();
            // delivery month is the current month
            const deliveryMonth = registerDate.getMonth();
            return this.ticketRepository.create({
                ...dto,
                barcode_svg,
                barcode: dto.barcode,
                registerDate,
                deliveryMonth,
                employeeId: 0,
                status: 1,
                amount: Number(dto.amount),
            });
        });

        try {
            return this.ticketRepository.save(tickets);
        } catch (error) {
            console.log(error);
            throw new Error('Error al guardar los tickets');
        }
    }

    getActiveTickets() {
        return this.ticketRepository.find({
            where: {
                status: 1,
            },
        });
    }

    getInactiveTickets() {
        return this.ticketRepository.find({
            where: {
                status: 0,
            },
        });
    }

    getAllTickets() {
        return this.ticketRepository.find();
    }

    async getTicketsSummary() {
        const allActiveTickets = await this.getActiveTickets();

        const amount200 = allActiveTickets.filter(
            (ticket) => ticket.amount === 200,
        ).length;

        const amount500 = allActiveTickets.filter(
            (ticket) => ticket.amount === 500,
        ).length;

        const amount1000 = allActiveTickets.filter(
            (ticket) => ticket.amount === 1000,
        ).length;

        const amount2000 = allActiveTickets.filter(
            (ticket) => ticket.amount === 2000,
        ).length;

        return {
            amount200,
            amount500,
            amount1000,
            amount2000,
        };
    }

    getTicketById(id: number) {
        return this.ticketRepository.findOneBy({
            fuelTicketId: id,
        });
    }

    deleteTicketById(id: number) {
        this.ticketRepository.delete(id);
        return this.ticketRepository.findOneBy({
            fuelTicketId: id,
        });
    }

    async updateById(id: number, dto: UpdateTicketDto) {
        await this.ticketRepository.update(id, dto);
        // return the updated ticket
        return this.ticketRepository.findOneBy({
            fuelTicketId: id,
        });
    }

    async activateTickets(
        amount200: number,
        amount500: number,
        amount1000: number,
        amount2000: number,
    ) {
        const allInactiveTickets = await this.getInactiveTickets();

        // activate the number of tickets requested
        // if there are not enough tickets, activate all of them

        const tickets200 = allInactiveTickets
            .filter((ticket) => ticket.amount === 200)
            .slice(0, amount200)
            .map((ticket) => {
                ticket.status = 1;
                return ticket;
            });

        const tickets500 = allInactiveTickets
            .filter((ticket) => ticket.amount === 500)
            .slice(0, amount500)
            .map((ticket) => {
                ticket.status = 1;
                return ticket;
            });

        const tickets1000 = allInactiveTickets
            .filter((ticket) => ticket.amount === 1000)
            .slice(0, amount1000)
            .map((ticket) => {
                ticket.status = 1;
                return ticket;
            });

        const tickets2000 = allInactiveTickets
            .filter((ticket) => ticket.amount === 2000)
            .slice(0, amount2000)
            .map((ticket) => {
                ticket.status = 1;
                return ticket;
            });

        await this.ticketRepository.save([
            ...tickets200,
            ...tickets500,
            ...tickets1000,
            ...tickets2000,
        ]);
    }

    async deactivateTickets(
        amount200: number,
        amount500: number,
        amount1000: number,
        amount2000: number,
    ) {
        const allActiveTickets = await this.getActiveTickets();

        const tickets200 = allActiveTickets.filter(
            (ticket) => ticket.amount === 200,
        );
        const tickets500 = allActiveTickets.filter(
            (ticket) => ticket.amount === 500,
        );

        const tickets1000 = allActiveTickets.filter(
            (ticket) => ticket.amount === 1000,
        );

        const tickets2000 = allActiveTickets.filter(
            (ticket) => ticket.amount === 2000,
        );

        if (amount200 > tickets200.length) {
            throw new Error('No hay suficientes tickets de 200');
        }

        if (amount500 > tickets500.length) {
            throw new Error('No hay suficientes tickets de 500');
        }

        if (amount1000 > tickets1000.length) {
            throw new Error('No hay suficientes tickets de 1000');
        }

        if (amount2000 > tickets2000.length) {
            throw new Error('No hay suficientes tickets de 2000');
        }

        if (amount200 > 0) {
            tickets200.slice(0, amount200).forEach((ticket) => {
                ticket.status = 0;
            });
        }

        if (amount500 > 0) {
            tickets500.slice(0, amount500).forEach((ticket) => {
                ticket.status = 0;
            });
        }

        if (amount1000 > 0) {
            tickets1000.slice(0, amount1000).forEach((ticket) => {
                ticket.status = 0;
            });
        }

        if (amount2000 > 0) {
            tickets2000.slice(0, amount2000).forEach((ticket) => {
                ticket.status = 0;
            });
        }

        await this.ticketRepository.save([
            ...tickets200,
            ...tickets500,
            ...tickets1000,
            ...tickets2000,
        ]);
    }
}
