import { Document } from 'mongoose';

export interface Balance extends Document {
  readonly _product: string;
  readonly _stock: string;
}
