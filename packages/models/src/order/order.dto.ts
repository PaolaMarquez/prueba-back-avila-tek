import { z } from 'zod';
import { Schema, Types, type Document } from 'mongoose';

export const orderDefinition = z.object({
  user: z.instanceof(Types.ObjectId),
  items: z.array(z.instanceof(Types.ObjectId)),
  subtotal: z.number().positive(),
  total: z.number().positive(),
  status: z.string().min(3),
  createdAt: z.string().datetime().or(z.date()).nullable().optional(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});

export type orderInput = z.infer<typeof orderDefinition>;