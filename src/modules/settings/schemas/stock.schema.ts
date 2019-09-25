import { Schema } from 'mongoose';

export const StockRef = 'Stock';
export const StockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    waybill: {
      prefix: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);
