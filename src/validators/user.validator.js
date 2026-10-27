import z from "zod";

export const sigupSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(4).max(10),
});

export const siginSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});
