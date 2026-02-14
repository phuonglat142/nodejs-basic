import { z } from "zod";

export const idParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID phải là số nguyên dương"),
});

export type idParamType = z.infer<typeof idParamSchema>;
