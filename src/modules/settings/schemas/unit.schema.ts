import { Schema } from 'mongoose';

export const UnitRef = 'Unit';
export const UnitSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);
