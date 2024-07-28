
import { z } from 'zod';

const productDefinition = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  stock: z.number().nonnegative().optional(),
  createdAt: z.string().datetime().or(z.date()).nullable().optional(),
  updatedAt: z.string().datetime().or(z.date()).nullable().optional(),
});

export type ProductUpdate = z.infer<typeof productDefinition>;

export type OrderStatus = 'In Progress' | 'Processing' | 'In Transit' | 'Delivered' | 'Paid';
