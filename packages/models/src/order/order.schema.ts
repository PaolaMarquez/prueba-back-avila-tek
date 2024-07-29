import type { z } from 'zod';
import { Schema, Types, type Document } from 'mongoose';
import { orderDefinition } from './order.dto';
import { itemSchema } from '../item/item.schema';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export type IOrder = z.infer<typeof orderDefinition>;

export type OrderDocument = IOrder & Document<Types.ObjectId, any, IOrder>;

export type OrderSchemaType = {
  user: Schema.Types.ObjectId;
  items: [typeof itemSchema];
  total: number;
  status: string;
};

export const orderSchema = new Schema<OrderSchemaType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, ''],
      trim: true,
    },
    items: {
      type: [itemSchema],
      required: [true, ''],
      trim: true,
    },
    total: {
      type: Number,
      required: [true, ''],
      trim: true,
    },
    status: {
      type: String,
      required: [true, ''],
      trim: true,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePagination)