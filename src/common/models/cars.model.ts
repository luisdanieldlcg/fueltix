import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cars {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    ficha: string;
    @Column()
    model: number;
    @Column()
    year: number;
    @Column()
    plate: string;
    @Column()
    chassis: string;
}
