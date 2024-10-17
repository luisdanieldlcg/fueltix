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
    amount200: number;
    @Column()
    amount500: number;
    @Column()
    amount1000: number;
    @Column()
    amount2000: number;
    @Column()
    status: number;
    @Column({
        nullable: true,
    })
    travelDate?: Date;
    @Column({ default: 'N/A' })
    reason: string;
    @Column({ nullable: true })
    departmentId: number;
    @Column({ nullable: true })
    vehicleId?: number;
    @Column({ default: 'N/A' })
    province?: string;
}
