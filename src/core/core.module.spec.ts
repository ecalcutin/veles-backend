import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';

import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from '../core/services';

afterAll(async () => {
    await mongoose.disconnect();
});

describe('[CORE] :: Instances', () => {

    let unitService: UnitService;
    let categoryService: CategoryService;
    let prototypeService: PrototypeService;
    let productService: ProductService;
    let stockService: StockService;

    beforeAll(async () => {
        await console.log('Initializing')
        const module = await Test.createTestingModule({
            providers: [UnitService, CategoryService, PrototypeService, ProductService, StockService]
        }).compile();
        unitService = module.get(UnitService);
        categoryService = module.get(CategoryService);
        prototypeService = module.get(PrototypeService);
        productService = module.get(ProductService);
        stockService = module.get(StockService);
    });

    it('[Service] :: Unit :: is ready', async () => {
        expect(unitService).toBeDefined();
    });

    it('[Service] :: Category :: is ready', async () => {
        expect(categoryService).toBeDefined();
    });

    it('[Service] :: Prototype :: is ready', async () => {
        expect(prototypeService).toBeDefined();
    });

    it('[Service] :: Product :: is ready', async () => {
        expect(productService).toBeDefined();
    });

    it('[Service] :: Stock :: is ready', async () => {
        expect(stockService).toBeDefined();
    });

});
