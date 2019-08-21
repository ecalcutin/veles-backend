import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { UnitService, CategoryService, PrototypeService, ProductService, StockService } from '../core/services';
import { UnitRef, UnitSchema } from './schemas';

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
                    { name: UnitRef, schema: UnitSchema }
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

    describe('[UNIT] :: Service', () => {
        beforeAll(async () => {
            await unitService.dropCollection();
        });
        it('[UNIT] :: Unit collection should be empty', async () => {
            let units = await unitService.list();
            expect(units.length).toBe(0);
        });
        it('[UNIT] :: Should create unit', async () => {
            let result = await unitService.create({ title: 'метр' });
            expect(result).toBeDefined();
            expect(result._id).toBeDefined();
            expect(result.title).toBe('метр');
        });
    });
});


