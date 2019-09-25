import { Document } from 'mongoose';

interface Product {
  readonly original: {
    _id: string;
  };
  readonly title: string;
  readonly category: string;
  readonly unit: string;
  readonly price_retail: number;
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
