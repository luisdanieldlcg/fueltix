import { IsNotEmpty } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  amount: number;
}
