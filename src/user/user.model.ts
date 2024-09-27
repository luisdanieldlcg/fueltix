import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role: number;
  @Column({ unique: true })
  email: string;
  @Column()
  username: string;
  @Column()
  fullName: string;
  @Column()
  password: string;
  @Column()
  createdAt: Date;
}
