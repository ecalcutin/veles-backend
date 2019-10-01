import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { ConfigModule, ConfigService } from '../../config';

import { StockService } from './stock.service';
import { StockRef, StockSchema } from './schemas';
import { StockModel } from './interfaces';

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Stock module', () => {
  let stockService: StockService;
  let testable: StockModel;
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

  it('should create stock', async () => {
    testable = await stockService.create({
      title: 'TEST',
      waybillPrefix: 'TEST-Prefix',
    });
    let result = await stockService.get(testable._id);
    expect(result.title).toBe('TEST');
    expect(result.waybillPrefix).toBe('TEST-Prefix');
  });

  it('should update stock', async () => {
    await stockService.update(testable._id, {
      title: 'Test-Updated',
      waybillPrefix: 'Prefix-Updated',
    });
    let result = await stockService.get(testable._id);
    expect(result.title).toBe('Test-Updated');
    expect(result.waybillPrefix).toBe('Prefix-Updated');
  });

  it('should remove stock', async () => {
    await stockService.remove(testable._id);
    let result = await stockService.get(testable._id);
    expect(result).toBe(null);
  });
});
