import { Document } from 'mongoose';

interface Product {
  readonly _id: any;
  readonly quantity: number;
}
export interface Waybill extends Document {
  readonly action: string;
  readonly _source: any;
  readonly _destination: any;
  readonly date: string;
  readonly type: string;
  readonly products: Product[];
}
