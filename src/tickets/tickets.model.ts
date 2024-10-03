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
  barcode: string;
  @Column()
  deliveryMonth: number;
  @Column()
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
