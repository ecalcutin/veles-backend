import { Schema } from 'mongoose';

import { StockRef } from '../../stock/schemas';
import { ProductRef } from '../../product/schemas';

export const TransactionRef = 'Transactions';
export const TransactionSchema = new Schema(
  {
    _product: {
      type: Schema.Types.ObjectId,
      ref: ProductRef,
      required: true,
    },
    _stock: {
      type: Schema.Types.ObjectId,
      ref: StockRef,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    waybillType: {
      type: String,
      required: true,
    },
    waybillSubType: {
      type: String,
      required: true,
    },
    waybill_id: {
      type: String,
      required: true,
    },
    price: {
      type: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    change: {
      type: Number,
      validate: {
        validator: (value: number) => value !== 0,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
