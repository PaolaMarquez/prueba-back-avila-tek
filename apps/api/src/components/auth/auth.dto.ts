import { z } from 'zod';

export const signInInput = z.object({
  name: z.string().email().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignInInput = z.infer<typeof signInInput>;
