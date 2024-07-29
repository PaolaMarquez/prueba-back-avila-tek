import { z } from 'zod';
import { Schema, Types, type Document } from 'mongoose';

export const itemDefinition = z.object({
  product: z.instanceof(Types.ObjectId),
  qty: z.number().positive(),
  subtotal: z.number().nonnegative(),
  createdAt: z.string().datetime().or(z.date()).nullable().optional(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});

export type TItem = z.infer<typeof itemDefinition>;