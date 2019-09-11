import { Schema } from 'mongoose';

import { ProductRef, StockRef } from '../../settings/schemas';

export const BalanceRef = 'Balance';
export const BalanceSchema = new Schema(
  {
    _product: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    _stock: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
