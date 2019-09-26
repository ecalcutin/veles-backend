import { Document } from 'mongoose';

export interface TransactionOptions {
  _product: string;
  _stock: string;
  change: number;
  price: {
    value: number;
    type: 'retail' | 'wholesale';
  };
  waybill_id: string;
  waybillType: 'income' | 'outcome';
  waybillSubType: string;
  date: string;
  type: string;
}

export interface Transaction extends TransactionOptions, Document {}
