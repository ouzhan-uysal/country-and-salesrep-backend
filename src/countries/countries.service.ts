import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from './countries.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Countries) private countriesRepository: MongoRepository<Countries>
  ) { }

  async findAll(region?: string): Promise<Array<Countries>> {
    if (region) {
      return await this.countriesRepository.find({ region: region })
    }
    return await this.countriesRepository.find();
  }
}
