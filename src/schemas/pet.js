import { z } from 'zod';
import { PET_CATEGORY } from './enums.js';

export const petSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be atleast 2 characters')
    .max(15, 'Name must not exceed 10 characters')
    .trim(),
  description: z.string().min(20).max(100).optional(),
  category: z.enum(PET_CATEGORY),
  breed: z.string().trim(),
  age: z.number().positive().optional(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  color: z
    .string()
    .min(3, 'Color must be atleast 3 characters')
    .max(15, 'Color must not exceed 15 character')
    .trim()
    .optional(),
  price: z.coerce.number().positive(),
});
