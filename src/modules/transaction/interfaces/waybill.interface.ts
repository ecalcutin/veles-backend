import { Document } from 'mongoose';

interface Product {
  readonly _id: string;
  readonly quantity: number;
}
export interface Waybill extends Document {
  readonly actionTitle: string;
  readonly _source: string;
  readonly _destination: string;
  readonly date: string;
  readonly products: Product[];
}
