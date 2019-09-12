import { Schema } from 'mongoose';
import moment from 'moment';

import { ProductRef, StockRef } from '../../settings/schemas';

export const TransactionRef = 'Transaction';
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
    quantity: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
