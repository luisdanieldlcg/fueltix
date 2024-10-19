import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FuelTickets {
    @PrimaryGeneratedColumn()
    fuelTicketId: number;
    @Column()
    amount: number;
    @Column()
    sequential: number;
    @Column({
        type: 'varchar',
        length: 1024,
        unique: true,
    })
    barcode_svg: string;
    @Column({ unique: true })
    barcode: number;
    @Column()
    deliveryMonth: number;
    @Column({
        type: 'date',
        default: new Date(),
    })
    expirationDate: Date;
    @Column({
        type: 'bit',
        default: 1,
    })
    status: number;
    @Column()
    employeeId: number;
    @Column()
    registerDate: Date;
}
