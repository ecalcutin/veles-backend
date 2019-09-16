import { ObjectID } from 'bson';
import { Product } from 'src/modules/settings/interfaces';

interface Item {
  product: Product;
  quantity: number;
}

type TAction = 'production' | 'buy';
export class CreateWaybillDto {
  readonly date: string;
  readonly action: TAction;
  readonly destination: string;
  readonly products: Item[];
}
