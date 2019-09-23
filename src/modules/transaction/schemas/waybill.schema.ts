import { Schema } from 'mongoose';
import moment from 'moment';

import { ProductRef, StockRef } from '../../settings/schemas';

export const WaybillRef = 'Waybill';
export const WaybillSchema = new Schema(
  {
    actionTitle: String,
    _source: {
      type: Schema.Types.ObjectId,
      ref: StockRef,
    },
    _destination: {
      type: Schema.Types.ObjectId,
      ref: StockRef,
    },
    date: {
      type: String,
      default: () => moment().format('YYYY-MM-DD'),
    },
    products: [
      {
        _id: {
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
