import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { Countries } from './countries.entity';

@Controller('countries')
export class CountriesController {
  constructor(
    private readonly countriesService: CountriesService
  ) { }

  @Get()
  async getAllCountries(@Query('region') region: string): Promise<Array<Countries>> {
    return await this.countriesService.findAll(region);
  }
}
