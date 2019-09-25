import { Schema } from 'mongoose';

export const StockRef = 'Stock';
export const StockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    waybillPrefix: {
      type: String,
      unique: true,
      required: true,
    },
    waybillNumber: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
