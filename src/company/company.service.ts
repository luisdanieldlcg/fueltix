import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Department } from 'src/common/models/departments.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicles } from 'src/common/models/vehicles.model';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Department)
        private departmenRepository: Repository<Department>,

        @InjectRepository(Vehicles)
        private vehicleRepository: Repository<Vehicles>,
    ) {}

    create(createCompanyDto: CreateCompanyDto) {
        return 'This action adds a new company';
    }

    departments() {
        return this.departmenRepository.find();
    }

    vehicles() {
        return this.vehicleRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} company`;
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        return `This action updates a #${id} company`;
    }

    remove(id: number) {
        return `This action removes a #${id} company`;
    }
}
