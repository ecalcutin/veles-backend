import { Document } from 'mongoose';

export interface Category extends Document {
    readonly title: string;
    readonly _unit: string;
}
