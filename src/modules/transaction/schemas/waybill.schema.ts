import { Schema } from 'mongoose';
import moment from 'moment';

import { ProductRef, StockRef } from '../../settings/schemas';

export const WaybillRef = 'Waybill';
export const WaybillSchema = new Schema(
  {
    _source: {
      type: Schema.Types.ObjectId,
      ref: StockRef,
      required: true,
    },
    _destination: {
      type: Schema.Types.ObjectId,
      ref: StockRef,
      required: true,
    },
    date: {
      type: String,
      default: () => moment().format('YYYY-MM-DD'),
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: ProductRef,
          required: true,
        },
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);
