interface Item {
    _id: string;
    quantity: number;
}
type TWaybill = 'production' | 'move' | 'sell' | 'utilization' | 'buy';

export class CreateWaybill {
    date: string;
    action: TWaybill;
    source?: string;
    destination?: string;
    products: Item[];
}
