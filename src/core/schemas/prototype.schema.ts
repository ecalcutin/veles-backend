import { Schema } from 'mongoose';

import { UnitRef } from './unit.schema';
import { CategoryRef } from './category.schema';

export const PrototypeRef = 'Prototype';
export const PrototypeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        _category: {
            type: Schema.Types.ObjectId,
            ref: CategoryRef,
            required: true,
        },
        _unit: {
            type: Schema.Types.ObjectId,
            ref: UnitRef,
            required: true,
        },
        price_retail: {
            type: Number,
            default: 0,
        },

        price_wholesale: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);
