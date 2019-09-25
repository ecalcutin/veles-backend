import { Document } from 'mongoose';

export interface TransactionOptions {
  _product: string;
  _stock: string;
  change: number;
  price: {
    value: number;
    type: 'retail' | 'wholesale'
  };
  date: string;
  type: string;
}

export interface Transaction extends TransactionOptions, Document { }
