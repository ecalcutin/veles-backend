import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { StockProvider } from './core/stock.provider';

import * as mongoose from 'mongoose';
import { CoreModule } from './core';

afterAll(async () => {
    await mongoose.disconnect();
})


describe('Stock service', () => {
    let stockService: StockProvider;
    let StockSchema = new mongoose.Schema({
        name: String
    })


    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(
                    'mongodb://instagib:Iamtheone1@ds145486.mlab.com:45486/erp-backend',
                ),
                MongooseModule.forFeature([
                    {
                        name: 'Stock',
                        schema: StockSchema,
                    },
                ]),
            ],
            providers: [StockProvider],
        }).compile();
        stockService = module.get<StockProvider>(StockProvider);
    });

    it('Stock service', async () => {
        expect(stockService).toBeDefined();
    });

});
