import { z } from 'zod';

export const orderSchema = z.object({
  pet_id: z.string().trim(),
});
