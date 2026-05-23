import { z } from 'zod';

export const otpSchema = z.object({
  validate: z.union([
    z.string().email().trim(),
    z.string().regex(/^[0-9]{10}$/, 'Invalid mobile number'),
  ]),

  value: z
    .string()
    .regex(/^[a-zA-Z0-9]{6}$/, 'OTP must be 6 alphanumeric characters'),
});
