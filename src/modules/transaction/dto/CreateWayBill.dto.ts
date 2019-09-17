interface Item {
  product: any;
  quantity: number;
}

type TWaybill = 'production' | 'buy' | 'import';

class WaybillDto {
  readonly products: Item[];
  readonly action: TWaybill;
  readonly date: string;
  readonly destination_stock_id: string;
}

export class ProductionWaybillDto extends WaybillDto {
  readonly source_stock_id: string;
}
