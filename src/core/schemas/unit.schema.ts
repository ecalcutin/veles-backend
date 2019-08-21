import { Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export const UnitRef = "Unit";
export const UnitSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true

    }
);

UnitSchema.plugin(paginate);