import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from 'src/common/models/departments.model';
import { Vehicles } from 'src/common/models/vehicles.model';

@Module({
    controllers: [CompanyController],
    providers: [CompanyService],
    imports: [TypeOrmModule.forFeature([Department, Vehicles])],
})
export class CompanyModule {}
