import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import mongoose from 'mongoose';

import { UnitService } from '../services';
import { UnitRef, UnitSchema } from '../schemas';

import { ConfigService, ConfigModule } from '../../config';

afterAll(async () => {
    await mongoose.disconnect();
});

describe('[UnitService]', () => {
    let unitService: UnitService;

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
            providers: [UnitService]
        }).compile();
        unitService = module.get(UnitService);
    });

    describe('[UnitService] :: Service', () => {
        beforeAll(async () => {
            await unitService.dropCollection();
        });
        it('[UnitService] :: Unit collection should be empty', async () => {
            let units = await unitService.getAll();
            expect(units.length).toBe(0);
        });
        it('[UnitService] :: Should create unit', async () => {
            let result = await unitService.create({ title: 'метр' });
            expect(result).toBeDefined();
            expect(result._id).toBeDefined();
            expect(result.title).toBe('метр');
        });
    });
});


