interface Item {
  original: string;
  title: string;
  quantity: number;
}
type TWaybillChange = 'income' | 'outcome';
type TWaybill = 'production' | 'move' | 'sell' | 'utilization' | 'buy';

export class CreateWaybillDto {
  date: string;
  action: {
    type: TWaybill;
    change: TWaybillChange;
    title: string;
  };
  source?: string;
  destination?: string;
  products: Item[];
}
