import { z } from 'zod';

export const requestSchema = z.object({
  pet: z.string().trim(),
});
