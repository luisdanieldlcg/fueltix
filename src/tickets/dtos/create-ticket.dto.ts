import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateTicketDto {
    @IsIn([200, 500, 1000, 2000], {
        message: 'El monto del ticket no es válido.',
    })
    amount: number;

    @IsNotEmpty({
        message: 'El campo de código de barras no puede estar vacío.',
    })
    barcode: number;

    @IsNotEmpty({ message: 'El campo secuencial no puede estar vacío.' })
    sequential: number;

    @IsNotEmpty({
        message: 'El campo de fecha de vencimiento no puede estar vacío.',
    })
    expirationDate: Date;
}
