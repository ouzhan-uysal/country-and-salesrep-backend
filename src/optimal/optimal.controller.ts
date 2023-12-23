import { BadRequestException, Controller, Get } from '@nestjs/common';
import { CountriesController } from 'src/countries/countries.controller';
import { IOptimalResponse } from './optimal.interface';

@Controller('optimal')
export class OptimalController {
  constructor(
    private readonly countriesController: CountriesController
  ) { }

  @Get()
  async getAllRegionDetails(): Promise<Array<IOptimalResponse>> {
    try {
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
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
