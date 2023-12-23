import { BadRequestException, Controller, Get, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CountriesController } from 'src/countries/countries.controller';
import { Countries } from 'src/countries/countries.entity';
import { ISalesrepResponse } from './salesrep.interface';

@Controller('salesrep')
export class SalesrepController {
  constructor(
    private readonly countriesController: CountriesController,
    private readonly httpService: HttpService,
  ) { }

  @Get()
  async getRequiredSalesrep(@Headers() headers: any): Promise<Array<ISalesrepResponse>> {
    try {
      //! Method 1: Retrieving all country data by sending a request to the Countries endpoint.
      // const { data: allCountries } = await firstValueFrom(this.httpService.get(`http://${headers.host}/countries`));
      //! Method 2: Retrieving all country data using the Countries Controller.
      const allCountries = await this.countriesController.getAllCountries(); // To send a get request without using a controller, remove the comment line in method 1 and make this line a comment line.

      //? Dividing the countries based on their regions.
      const countriesSeparatedByRegions = allCountries.reduce((acc, curr: Countries) => {
        if (!acc[curr.region.toUpperCase()]) {
          acc[curr.region.toUpperCase()] = [curr.name]
        } else {
          acc[curr.region.toUpperCase()] = [...acc[curr.region.toUpperCase()], curr.name]
        }
        return acc;
      }, {});

      const result = Object.keys(countriesSeparatedByRegions).map(region => ({
        region: region,
        minSalesReq: countriesSeparatedByRegions[region].length === 0 ? 1 : Math.ceil(countriesSeparatedByRegions[region].length / 7), // If there are no registered countries for a region, it is mandatory to have at least one sales representative for that region.
        maxSalesReq: countriesSeparatedByRegions[region].length === 0 ? 1 : Math.ceil(countriesSeparatedByRegions[region].length / 3),
      }));

      return result;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
