import { Module } from '@nestjs/common';
import { SalesrepController } from './salesrep.controller';
import { CountriesModule } from 'src/countries/countries.module';
import { CountriesController } from 'src/countries/countries.controller';
import { CountriesService } from 'src/countries/countries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from 'src/countries/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  providers: [CountriesController, CountriesService],
  controllers: [SalesrepController]
})
export class SalesrepModule { }
