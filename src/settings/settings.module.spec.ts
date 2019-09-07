import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { CategoryService, PrototypeService, ProductService, StockService } from './services';
import { CategoryRef, CategorySchema, PrototypeRef, PrototypeSchema } from './schemas';

import { ConfigService, ConfigModule } from '../config';

afterAll(async () => {
    await mongoose.disconnect();
});

describe('[CORE] :: Instances', () => {
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
                    { name: CategoryRef, schema: CategorySchema },
                    { name: PrototypeRef, schema: PrototypeSchema }
                ]),
            ],
            providers: [CategoryService, PrototypeService, ProductService, StockService]
        }).compile();
        categoryService = module.get(CategoryService);
        prototypeService = module.get(PrototypeService);
        productService = module.get(ProductService);
        stockService = module.get(StockService);
    });

    it('[CORE] - [CategoryService] should be defined', () => {
        expect(categoryService).toBeDefined();
    });
});


