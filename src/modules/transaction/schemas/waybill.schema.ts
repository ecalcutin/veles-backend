import { Schema } from 'mongoose';
import moment from 'moment';

import { ProductRef, StockRef } from '../../settings/schemas';

export const WaybillRef = 'Waybill';
export const WaybillSchema = new Schema(
  {
    action: {
      type: Object,
    },
    _stock: {
      type: Schema.Types.ObjectId,
      ref: StockRef,
      required: true,
    },
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
    number: {
      type: String,
    },
    products: [
      {
        original: {
          type: Schema.Types.ObjectId,
          ref: ProductRef,
          required: true,
        },
        title: String,
        category: String,
        unit: String,
        price_wholesale: Number,
        price_retail: Number,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);
