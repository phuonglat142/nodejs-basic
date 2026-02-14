import { z } from "zod";

export const genderSchema = z.object({
    name: z.string().min(2).max(10),
});

export const createGenderSchema = genderSchema;
export const updateGenderSchema = genderSchema.partial();

export type CreateGenderInput = z.infer<typeof createGenderSchema>;
export type UpdateGenderInput = z.infer<typeof updateGenderSchema>;
