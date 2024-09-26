import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsIn([200, 500, 1000, 2000], {
    message: 'El monto del ticket no es válido.',
  })
  amount: number;
  @IsNotEmpty({ message: 'El campo secuencial no puede estar vacío.' })
  sequential: number;
  barcode: string;
  expirationDate: Date;
}
