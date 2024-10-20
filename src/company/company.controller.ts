import { Controller, Get, Post, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    @Get('drivers')
    getDrivers() {
        return [
            {
                id: 1,
                name: 'Michael Scott',
            },
            {
                id: 2,
                name: 'Dwight Schrute',
            },
            {
                id: 3,
                name: 'Jim Halpert',
            },
            {
                id: 4,
                name: 'Pam Beesly',
            },
        ];
    }

    @Get('departments')
    getDepartments() {
        return [
            {
                id: 1,
                name: 'TI',
            },
            {
                id: 2,
                name: 'HHRR',
            },
            {
                id: 3,
                name: 'Finanzas',
            },
            {
                id: 4,
                name: 'Ventas',
            },
        ];
    }

    @Get('vehicles')
    getVehicles() {
        return [
            {
                id: 1,
                model: 'Toyota Camry',
                year: 2020,
                plate: 'ABC1234',
            },
            {
                id: 2,
                model: 'Honda Civic',
                year: 2018,
                plate: 'XYZ5678',
            },
            {
                id: 3,
                model: 'Ford F-150',
                year: 2022,
                plate: 'LMN3456',
            },
            {
                id: 4,
                model: 'Chevrolet Malibu',
                year: 2019,
                plate: 'JKL9876',
            },
            {
                id: 5,
                model: 'Nissan Altima',
                year: 2021,
                plate: 'QRS2345',
            },
            {
                id: 6,
                model: 'BMW X5',
                year: 2023,
                plate: 'TUV8765',
            },
        ];
    }
}
// ('Toyota Camry', 2020, 'ABC1234'),
//     ('Honda Civic', 2018, 'XYZ5678'),
//     ('Ford F-150', 2022, 'LMN3456'),
//     ('Chevrolet Malibu', 2019, 'JKL9876'),
//     ('Nissan Altima', 2021, 'QRS2345'),
//     ('BMW X5', 2023, 'TUV8765');
