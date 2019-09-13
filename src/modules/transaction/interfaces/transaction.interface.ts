import { Document } from 'mongoose';

export interface Transaction extends Document {
  readonly _product: string;
  readonly _stock: string;
  readonly change: number;
  readonly action: string;
}
