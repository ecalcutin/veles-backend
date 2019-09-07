import { Schema } from 'mongoose';

import { PrototypeRef } from './prototype.schema';
import { StockRef } from './stock.schema';

export const ProductRef = 'Product';
export const ProductSchema = new Schema(
    {
        prototype: {
            type: Schema.Types.ObjectId,
            ref: PrototypeRef,
            required: true,
        },
        stock: {
            type: Schema.Types.ObjectId,
            ref: StockRef,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    },
);
