import { Document } from 'mongoose';

export interface Product extends Document {
  readonly title: string;
  readonly _category: string;

  readonly price_retail: number;
  readonly price_wholesale: number;
}
