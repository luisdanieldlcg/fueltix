import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryDto {
    @IsNotEmpty()
    employee: string;
    @IsNotEmpty()
    department: string;
    @IsNotEmpty()
    reason: string;
    @IsNotEmpty()
    amount200: number;
    @IsNotEmpty()
    amount500: number;
    @IsNotEmpty()
    amount1000: number;
    @IsNotEmpty()
    amount2000: number;
    @IsNotEmpty()
    province: string;
    @IsNotEmpty()
    travelDate: Date;
    @IsNotEmpty()
    vehicle: string;
}
