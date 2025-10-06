import { z } from 'zod';

export const RegistrationSchema = z.object({
  username: z.string().min(1, { message: 'Please enter a username' }),
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
  fullName: z.string().min(1, { message: 'Please enter your full name.' }),
  stageName: z.string().min(1, { message: 'Stage name is required.' }), // Changed to camelCase
  bio: z.string().min(3, { message: 'Bio must be at least 3 characters.' }),
  genre: z.enum(['Afrobeats', 'Hip-Hop'], {
    message: 'Please select a genre',
  }),
});
export type TOnboardingSchema = z.infer<typeof OnboardingSchema>;
