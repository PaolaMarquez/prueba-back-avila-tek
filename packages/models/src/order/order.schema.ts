import type { z } from 'zod';
import { Schema, Types, type Document } from 'mongoose';
import { orderDefinition } from './order.dto';

export type IOrder = z.infer<typeof orderDefinition>;

export type OrderDocument = IOrder & Document<Types.ObjectId, any, IOrder>;

export const orderSchema = new Schema<IOrder, OrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, ''],
      trim: true,
    },
    items: {
      type: [Types.ObjectId],
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
