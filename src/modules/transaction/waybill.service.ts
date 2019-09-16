import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWaybillDto } from './dto/CreateWayBill.dto';
import { TransactionService } from './transaction.service';

@Injectable()
export class WaybillService {
  constructor(private readonly transactionService: TransactionService) {}

  async createProductionWayBill(waybill: CreateWaybillDto): Promise<void> {
    // add ready-products to stock
    await Promise.all([
      ...waybill.products.map(async item => {
        console.log('Making transaction', item);
        await this.transactionService.createTransaction(
          item.product._id,
          waybill.destination,
          item.quantity,
          waybill.action,
          waybill.date,
        );
      }),
    ]);
    // remove product dependencies raw materials
  }
}
