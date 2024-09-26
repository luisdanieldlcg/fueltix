import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  roleId: number;
  @Column()
  roleName: string;
  @Column()
  roleDescription: string;
}
