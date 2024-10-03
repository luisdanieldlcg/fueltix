import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TicketAssignmentsService } from './ticket-assignments.service';
import { CreateTicketAssignmentDto } from './dto/create-assignment.dto';

@Controller('ticket-assignments')
export class TicketAssignmentsController {
  constructor(
    private readonly ticketAssignmentsService: TicketAssignmentsService,
  ) {}

  private static readonly CURRENT_DATE = new Date();

  @Post()
  assignTicket(@Body() dto: CreateTicketAssignmentDto) {
    if (dto.year < TicketAssignmentsController.CURRENT_DATE.getFullYear()) {
      throw new HttpException(
        'El año no puede ser menor a este',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.month < TicketAssignmentsController.CURRENT_DATE.getMonth()) {
      throw new HttpException(
        'El mes no puede ser anterior a este',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.ticketAssignmentsService.assignTicket(dto);
  }
}
