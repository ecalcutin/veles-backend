interface Item {
  product: any;
  quantity: number;
}
type TWaybill = 'production' | 'buy' | 'import' | 'return';

export class CreateWaybill {
  products: Item[];
  date: string;
  action: TWaybill;
  destination: string;
  source?: string;
}
