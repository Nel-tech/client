import { z } from 'zod';

export const RegistrationSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  role: z.enum(['Fan', 'Artist'], {
    message: 'Role is required',
  }),
  referralCode: z.string().optional(),
});

export type TRegistrationSchema = z.infer<typeof RegistrationSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
