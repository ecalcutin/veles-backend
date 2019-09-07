import { Schema } from 'mongoose';

export const StockRef = 'Stock';
export const StockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
