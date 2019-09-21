interface Item {
    _id: string;
    quantity: number;
}
type TWaybill = 'production' | 'move' | 'sell' | 'utilization' | 'buy';

export class CreateWaybill {
    date: string;
    action: TWaybill;
    actionTitle: string;
    source?: string;
    destination?: string;
    products: Item[];
}
