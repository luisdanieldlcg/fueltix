import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Drivers {
  @PrimaryColumn()
  employeeId: number;
  @Column()
  identification: string;
  @Column()
  fullName: string;
  @Column()
  licenseCategory: number;
}
