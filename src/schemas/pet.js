import { z } from 'zod';
import { PET_CATEGORY } from './enums';

export const petSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be atleast 2 characters')
    .max(15, 'Name must not exceed 10 characters')
    .trim(),
  description: z.string().min(20).max(100).optional(),
  category: z.string().enum(PET_CATEGORY).trim(),
  breed: z.string().trim(),
  age: z.number().positive().trim().optional(),
  height: z.number().positive().trim().optional(),
  weight: z.number().positive().trim().optional(),
  color: z
    .string()
    .min(3, 'Color must be atleast 3 characters')
    .max(15, 'Color must not exceed 15 character')
    .trim()
    .optional(),
  price: z.number().positive().trim(),
  image: z.image(),
});
