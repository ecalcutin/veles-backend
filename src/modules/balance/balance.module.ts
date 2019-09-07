import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
    imports: [],
    controllers: [BalanceController],
    providers: [BalanceService]
})
export class BalanceModule { }