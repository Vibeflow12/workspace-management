import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string().min(4).max(10),
});

export const signinSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});
