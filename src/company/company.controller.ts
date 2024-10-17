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

    @Get('departments')
    getDepartments() {
        return this.companyService.departments();
    }

    @Get('vehicles')
    getVehicles() {
        return this.companyService.vehicles();
    }
}
