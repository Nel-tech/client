import z from 'zod';
export const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
});

export const RequestEmailChangeSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email('Please enter a valid email address'),
  password: z.string({
    message: 'Password is required',
  }),
});


export const VerifyEmailChangeSchema = z.object({
  verificationCode: z.string().length(6, 'Verification code must be 6 digits'),
});

// Inferred types from Zod schemas
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
export type RequestEmailChangeData = z.infer<typeof RequestEmailChangeSchema>;
export type VerifyEmailChangeData = z.infer<typeof VerifyEmailChangeSchema>;
