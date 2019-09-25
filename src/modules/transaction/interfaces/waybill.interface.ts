import { Document } from 'mongoose';

type TWaybillChange = 'income' | 'outcome';
type TWaybill = 'production' | 'move' | 'sell' | 'utilization' | 'buy';
interface Product {
  readonly original: {
    readonly _id: string;
    readonly title: string;
    readonly category: string;
    readonly unit: string;
    readonly price_wholesale: number;
    readonly price_retail: number;
    readonly quantity: number;
  };
  readonly title: string;
  readonly category: string;
  readonly unit: string;
  readonly price_retail: number;
  readonly quantity: number;
}
export interface Waybill extends Document {
  readonly action: {
    title: string;
    type: TWaybill;
    change: TWaybillChange;
  };
  readonly _source: any;
  readonly _destination: any;
  readonly _stock: any;
  readonly date: string;

  readonly products: Product[];
}
