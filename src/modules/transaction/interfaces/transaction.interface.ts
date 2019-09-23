import { Document } from 'mongoose';

export interface TransactionOptions {
  _product: string;
  _stock: string;
  change: number;
}

export interface Transaction extends TransactionOptions, Document { }
