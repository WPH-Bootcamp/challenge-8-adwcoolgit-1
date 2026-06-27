import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string().min(1).max(100),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
