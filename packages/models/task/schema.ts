import { z } from "zod";

export const TaskFormSchema = z.object({
	title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters"),
	description: z.string().max(2000, "Description must be at most 2000 characters").optional(),
	status: z.enum(["todo", "in_progress", "done"]),
	priority: z.enum(["low", "medium", "high"]),
});

export const TaskViewSchema = TaskFormSchema.extend({
	id: z.string().uuid(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime().nullable().optional(),
});
