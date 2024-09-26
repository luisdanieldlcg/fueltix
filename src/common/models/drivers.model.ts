import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Drivers {
  @PrimaryColumn()
  employeeNumber: number;
  @Column()
  identification: string;
  @Column()
  fullName: string;
  @Column()
  licenseCategory: number;
}
