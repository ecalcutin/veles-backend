import { Document } from 'mongoose';

export interface Category extends Document {
    readonly title: string;
    readonly unit: string;
}
