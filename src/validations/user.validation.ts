import { z } from "zod";

const userSchema = z.object({
    email: z.email(),
    name: z.string().min(2).max(100),
    genderId: z.coerce.number().int().positive(),
    phoneNumber: z.string().min(11),
    address: z.string().min(2).max(200),
    dateOfBirth: z.coerce.date(),
    description: z.string().min(2).max(500).optional(),
});

export const createUserSchema = userSchema;

export const updateUserSchema = userSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
