import { Document } from 'mongoose';

export interface Prototype extends Document {
    readonly title: string;
    readonly category: string;

    readonly price_retail: number;
    readonly price_wholesale: number;
}

