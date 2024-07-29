import type { z } from 'zod';
import { Schema, type Types, type Document } from 'mongoose';
import { productDefinition } from './product.dto';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export type IProduct = z.infer<typeof productDefinition>;

export type ProductDocument = IProduct & Document<Types.ObjectId, any, IProduct> & Pagination<IProduct>;

export type ProductSchemaType = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export const productSchema = new Schema<ProductSchemaType>(
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

productSchema.plugin(mongoosePagination)