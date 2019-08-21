import { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { UnitRef } from './unit.schema';

export const CategoryRef = 'Category';
export const CategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        _unit: {
            type: Schema.Types.ObjectId,
            ref: UnitRef,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
CategorySchema.plugin(paginate);