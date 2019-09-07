import { Document } from 'mongoose';

export interface Product extends Document {
    _prototype: string;
    _stock: string;
    quantity: number;
}

