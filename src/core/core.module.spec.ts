import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from './services';
import { UnitRef, UnitSchema, CategoryRef, CategorySchema } from './schemas';

import { ConfigService, ConfigModule } from '../config';

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
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    imports: [ConfigModule],
                    useFactory: async (configService: ConfigService) => ({
                        uri: configService.get('DATABASE_URL')
                    }),
                    inject: [ConfigService]
                }),
                MongooseModule.forFeature([
                    { name: UnitRef, schema: UnitSchema },
                    { name: CategoryRef, schema: CategorySchema }
                ]),
            ],
            providers: [UnitService, CategoryService, PrototypeService, ProductService, StockService]
        }).compile();
        unitService = module.get(UnitService);
        categoryService = module.get(CategoryService);
        prototypeService = module.get(PrototypeService);
        productService = module.get(ProductService);
        stockService = module.get(StockService);
    });

    it('[CORE] - [UnitService] should be defined', () => {
        expect(unitService).toBeDefined();
    });

    it('[CORE] - [CategoryService] should be defined', () => {
        expect(categoryService).toBeDefined();
    });
});


