import { Document } from 'mongoose';

export interface Product {
  readonly title: string;
  readonly _category: string;
  readonly price_retail: number;
  readonly price_wholesale: number;
}
export interface ProductPopulated {}
export interface ProductModel extends Product, Document {}
