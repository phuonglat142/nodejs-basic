import { z } from "zod";

const createUserBody = z.object({
  email: z.email(),
  name: z.string().min(2).max(100),
});

export const createUserSchema = z.object({
  body: createUserBody,
});

export const updateUserSchema = z.object({
  body: createUserBody.partial().extend({
    id: z.string(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserBody>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
