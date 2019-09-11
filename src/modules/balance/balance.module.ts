import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

import { ProductRef, ProductSchema } from '../settings/schemas';
import { BalanceRef, BalanceSchema } from './schemas/balance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductRef, schema: ProductSchema },
      { name: BalanceRef, schema: BalanceSchema },
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
