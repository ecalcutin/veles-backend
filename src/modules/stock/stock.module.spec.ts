import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { ConfigModule, ConfigService } from '../../config';

import { StockService } from './stock.service';
import { StockRef, StockSchema } from './schemas';

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Stock module', () => {
  let stockService: StockService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get('DATABASE_URL'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: StockRef, schema: StockSchema }]),
      ],
      providers: [StockService],
    }).compile();
    stockService = module.get(StockService);
  });

  it('Stock service should be defined', () => {
    expect(stockService).toBeDefined();
  });
});
