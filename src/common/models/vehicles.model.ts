import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehicles {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    model: string;
    @Column()
    year: number;
    @Column()
    plateNumber: string;
}
