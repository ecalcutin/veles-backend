import { Document } from 'mongoose';

export interface Transaction extends Document {
  readonly _product: string;
  readonly _stock: string;
}
