import { Controller, Get } from '@nestjs/common';
import { CountriesController } from 'src/countries/countries.controller';

@Controller('optimal')
export class OptimalController {
  constructor(
    private readonly countriesController: CountriesController
  ) { }

  @Get()
  async getAllRegionDetails(): Promise<any> {
    const allCountries = await this.countriesController.getAllCountries();

    const countriesSeparatedByRegions = allCountries.reduce((acc, curr) => {
      if (!acc[curr.region.toUpperCase()]) {
        acc[curr.region.toUpperCase()] = [curr.name]
      } else {
        acc[curr.region.toUpperCase()] = [...acc[curr.region.toUpperCase()], curr.name]
      }
      return acc;
    }, {});


    const result = Object.keys(countriesSeparatedByRegions).map(region => ({
      region: region,
      countryList: countriesSeparatedByRegions[region],
      countryCount: countriesSeparatedByRegions[region].length,
    }));

    return result;
  }
}
