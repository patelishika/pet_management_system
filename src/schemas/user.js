import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be atleast 2 character')
    .max(15, 'Name must not exceed 10 character')
    .trim(),
  email: z.email().toLowerCase().trim().optional(),
  mobileNo: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/)
    .optional(),
  password: z
    .string()
    .min(6, 'Password must be atleast 6 character')
    .max(10, 'Password must not exceed 10 character')
    .trim(),
});

export const loginSchema = z.object({
  email: z.email().toLowerCase().trim().optional(),
  mobileNo: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/)
    .optional(),
  password: z
    .string()
    .min(6, 'Password must be atleast 6 character')
    .max(10, 'Password must not exceed character')
    .trim(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be atleast 2 character')
    .max(15, 'Name must not exceed 10 character')
    .trim(),
});
