import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelTickets } from './tickets.model';

@Module({

  imports: [TypeOrmModule.forFeature([FuelTickets])],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
