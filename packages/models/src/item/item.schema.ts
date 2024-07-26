import type { z } from 'zod';
import { Schema, type Types, type Document } from 'mongoose';
import { itemDefinition } from './item.dto';

export type IItem = z.infer<typeof itemDefinition>;

export type ItemDocument = IItem & Document<Types.ObjectId, any, IItem>;

export const itemSchema = new Schema<IItem, ItemDocument>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: [true, ''],
      trim: true,
    },
    qty: {
      type: Number,
      required: [true, ''],
      trim: true,
      default: 1,
    },
    subtotal: {
      type: Number,
      required: [true, ''],
      trim: true,
    },
  },
  { timestamps: true }
);

