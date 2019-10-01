import { Document } from 'mongoose';

export interface Product {
  readonly title: string;
  readonly _category: string;
  readonly price_retail: number;
  readonly price_wholesale: number;
}

export interface ProductModel extends Product, Document {}
export interface ProductPopulated extends Omit<Product, '_category'> {
  readonly _category: any;
}
