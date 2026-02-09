import { email, z } from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(2).max(100),
});

export const updateUserSchema = createUserSchema.partial().extend({
  id: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
