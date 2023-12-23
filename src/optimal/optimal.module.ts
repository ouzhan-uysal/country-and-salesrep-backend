import { Module } from '@nestjs/common';
import { OptimalController } from './optimal.controller';
import { CountriesController } from 'src/countries/countries.controller';
import { CountriesService } from 'src/countries/countries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from 'src/countries/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  providers: [CountriesController, CountriesService],
  controllers: [OptimalController]
})

export class OptimalModule { }
