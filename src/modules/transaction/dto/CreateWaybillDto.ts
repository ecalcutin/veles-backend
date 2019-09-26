interface Item {
  _id: string;
  title: string;
  category: string;
  quantity: number;
  price: {
    value: number;
    type: 'retail' | 'wholesale';
  };
}

export class CreateWaybillDto {
  date: string;
  action: {
    type: 'production' | 'move' | 'sell' | 'utilization' | 'buy' | 'import';
    title: string;
  };
  source?: string;
  destination?: string;
  products: Item[];
}
