import { z } from 'zod';

export const trackUploadSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'), // Added max for safety

  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),

  consent: z
    .boolean()
    .refine((val) => val === true, 'You must accept the consent to upload'),

  genre: z.enum(['Afrobeats', 'Hip_Hop'], {
    message: 'Please select a genre',
  }),
});

export type TrackUploadValidator = z.infer<typeof trackUploadSchema>;
