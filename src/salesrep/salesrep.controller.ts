import { Controller, Get } from '@nestjs/common';
import { CountriesController } from 'src/countries/countries.controller';

@Controller('salesrep')
export class SalesrepController {
  constructor(
    private readonly countriesController: CountriesController
  ) { }

  @Get()
  async getRequiredSalesrep(): Promise<any> {
    // countries controller'ından işlem yapacağımız tüm ülkeleri çekiyoruz.
    const allCountries = await this.countriesController.getAllCountries();
    // ülkeleri region'lara göre filtreliyoruz. hangi ülkenin hangi rengion'da olduğuna göre
    const countriesSeparatedByRegions = allCountries.reduce((acc, curr) => {
      if (!acc[curr.region.toUpperCase()]) {
        acc[curr.region.toUpperCase()] = [curr.name]
      } else {
        acc[curr.region.toUpperCase()] = [...acc[curr.region.toUpperCase()], curr.name]
      }
      return acc;
    }, {});

    // console.log("countriesSeparatedByRegions", countriesSeparatedByRegions);

    const result = Object.keys(countriesSeparatedByRegions).map(region => ({
      region: region,
      // countryCount: countriesSeparatedByRegions[region].length,  // bölgede bulunan ülke sayısı
      minSalesReq: countriesSeparatedByRegions[region].length === 0 ? 1 : Math.ceil(countriesSeparatedByRegions[region].length / 7),
      maxSalesReq: countriesSeparatedByRegions[region].length === 0 ? 1 : Math.ceil(countriesSeparatedByRegions[region].length / 3),
    }));

    return result;
  }
}
