import { IsIn } from 'class-validator';

export class UpdateTicketDto {
  @IsIn([200, 500, 1000, 2000], {
    message: 'El monto del ticket no es válido.',
  })
  amount?: number;
  sequential?: number;
  expirationDate: Date;
}
