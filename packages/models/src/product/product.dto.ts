import { z } from 'zod';
import { Schema, type Types, type Document } from 'mongoose';

export const productDefinition = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  stock: z.number().nonnegative(),
  createdAt: z.string().datetime().or(z.date()).nullable().optional(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});

export type ProductInput = z.infer<typeof productDefinition>;