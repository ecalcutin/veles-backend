import { Schema } from 'mongoose';
import moment from 'moment';

import { ProductRef, StockRef } from '../../settings/schemas';

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
    change: {
      type: Number,
      validate: {
        validator: (value: number) => value !== 0,
      },
      required: true,
    },
    date: {
      type: String,
      default: () => moment().format('YYYY-MM-DD'),
    },
    action: String,
    actionTitle: String
  },
  {
    timestamps: true,
  },
);
