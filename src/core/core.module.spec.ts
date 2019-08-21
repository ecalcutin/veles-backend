import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from '../core/services';

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Core module', () => {

    let unitService: UnitService;
    let categoryService: CategoryService;
    let prototypeService: PrototypeService;
    let productService: ProductService;
    let stockService: StockService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [UnitService, CategoryService, PrototypeService, ProductService, StockService]
        }).compile();
        stockService = module.get<StockService>(StockService);
    });

    it('Stock service', async () => {
        expect(stockService).toBeDefined();
    });

});
