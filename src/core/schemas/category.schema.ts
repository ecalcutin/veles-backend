import { Schema } from 'mongoose';

export const CategoryRef = 'Category';
export const CategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        unit: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
