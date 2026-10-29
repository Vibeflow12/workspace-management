import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  dueDate: z.iso.refine(
      (date) => date >= new Date().toISOString().split("T")[0],
      { message: "Due date cannot be in the past" }
    )
    .optional()
});

export const updateTaskSchema = z.object({
  completed: z.boolean(),
});
