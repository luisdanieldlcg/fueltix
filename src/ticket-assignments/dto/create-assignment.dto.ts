import { IsIn, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Check } from 'typeorm';

export class CreateTicketAssignmentDto {
  // year is in between this year and infinity
  @IsNotEmpty()
  year: number;
  @IsNotEmpty()
  @IsIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  month: number;
  @IsNotEmpty()
  amount200: number;
  @IsNotEmpty()
  amount500: number;
  @IsNotEmpty()
  amount1000: number;
  @IsNotEmpty()
  amount2000: number;
  @IsNotEmpty()
  employeeId: number;
}
