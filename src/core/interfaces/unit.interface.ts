import { Document } from 'mongoose';

export interface Unit extends Document {
    readonly title: string;
}