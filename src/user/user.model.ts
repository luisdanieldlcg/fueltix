import { Role } from 'src/common/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: 'varchar',
        enum: Role,
        default: Role.BASIC,
    })
    role: Role;
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
