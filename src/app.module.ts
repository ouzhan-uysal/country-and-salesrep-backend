import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CountriesModule } from './countries/countries.module';
import { SalesrepModule } from './salesrep/salesrep.module';
import { OptimalModule } from './optimal/optimal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URI,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
    CountriesModule,
    SalesrepModule,
    OptimalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
