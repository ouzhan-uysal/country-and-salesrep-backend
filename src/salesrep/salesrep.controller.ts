import { Controller, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CountriesController } from 'src/countries/countries.controller';
import { firstValueFrom } from 'rxjs';
import { Countries } from 'src/countries/countries.entity';

@Controller('salesrep')
export class SalesrepController {
  constructor(
    private readonly countriesController: CountriesController,
    private readonly httpService: HttpService,
  ) { }

  @Get()
  async getRequiredSalesrep(): Promise<any> {
    //! Method 1: Countries endpoint'e istek atarak tüm ülkelerin verisini çekme işlemi:
    //? Method 1: Retrieving all country data by sending a request to the Countries endpoint.
    const { data: allCountries } = await firstValueFrom(this.httpService.get("http://localhost:3000/countries"));

    //! Method 2: Countries Controller'ı kullanarak tüm ülkelerin verisini çekme işlemi
    //? Method 2: Retrieving all country data using the Countries Controller.
    // const allCountries = await this.countriesController.getAllCountries();

    //! Ülkeleri bulundukları Bölgelere göre ayırma işlemi
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
  }
}
