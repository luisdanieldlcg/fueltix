import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketAssignments {
  @PrimaryGeneratedColumn()
  assignmentId: number;
  @Column()
  employeeId: number;
  @Column()
  fullName: string;
  @Column()
  amount: number;
  @Column()
  status: number;
  @Column()
  vehicleId: number;
  @Column()
  driverId: number;
  @Column()
  departmentId: number;
}
