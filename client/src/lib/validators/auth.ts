import { z } from 'zod';

export const RegistrationSchema = z.object({
  username: z
    .string(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  role: z.enum(['Fans', 'Artist'], {
    message: 'Role is required',
  }),
  referralCode: z.string().optional(),
});

export type TRegistrationSchema = z.infer<typeof RegistrationSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  rememberMe: z.boolean().optional(),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const OnboardingSchema = z.object({
  fullname: z.string().min(1, { message: 'Please enter your full name.' }),
  stagename: z.string().min(1, { message: 'Stage name is required.' }),
  bio: z.string().min(3, { message: 'Bio must be at least 3 characters.' }),

  genre: z.string().min(10, { message: 'Please enter your genre' }),
  role: z.enum(['Fans', 'Artist'], {
    message: 'Role is required',
  }),
});

export type TOnboardingSchema = z.infer<typeof OnboardingSchema>;