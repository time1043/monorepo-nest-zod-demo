import z from 'zod';

export const DeleteResponseSchema = z.object({
  success: z.boolean(),
});
export type DeleteResponse = z.infer<typeof DeleteResponseSchema>;
