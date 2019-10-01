import { Schema } from 'mongoose';

import { CategoryRef } from '../../category/schemas';

export const ProductRef = 'Product';
export const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    _category: {
      type: Schema.Types.ObjectId,
      ref: CategoryRef,
      required: true,
    },
    price_retail: {
      type: Number,
      default: 0,
    },

    price_wholesale: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
