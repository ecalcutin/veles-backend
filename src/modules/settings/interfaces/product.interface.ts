import { Document } from 'mongoose';

export interface Product extends Document {
    prototype: string;
    stock: string;
    quantity: number;
}

