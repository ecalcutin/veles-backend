interface Item {
  product: any;
  quantity: number;
}
type TWaybill = 'production' | 'buy' | 'import';

export class CreateProductionWaybillDto {
  products: Item[];
  date: string;
  action: TWaybill = 'production';

  // destination stock for ready products
  destination: string;

  // source stock for raw materials to be consumed
  source: string;
}
