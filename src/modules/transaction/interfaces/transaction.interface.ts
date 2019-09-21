import { Document } from 'mongoose';

export interface TransactionOptions {
  _product: string;
  _stock: string;
  change: number;
  date: string;
  action: string;
  actionTitle: string;
}

export interface Transaction extends TransactionOptions, Document { }
