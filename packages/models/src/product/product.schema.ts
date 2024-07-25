import type { z } from 'zod';
import { Schema, type Types, type Document } from 'mongoose';
import { productDefinition } from './product.dto';

export type IProduct = z.infer<typeof productDefinition>;

export type ProductDocument = IProduct & Document<Types.ObjectId, any, IProduct>;

export const productSchema = new Schema<IProduct, ProductDocument>(
  {
    name: {
      type: String,
      required: [true, ''],
      trim: true,
    },
    description: {
      type: String,
      required: [true, ''],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, ''],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, ''],
      trim: true,
    },
  },
  { timestamps: true }
);
