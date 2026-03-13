import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { task } from "@workspace/db/schema";

export const TaskViewSchema = createSelectSchema(task);

export const TaskFormSchema = createInsertSchema(task, {
	title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters"),
	description: z.string().max(2000, "Description must be at most 2000 characters").optional(),
}).omit({ id: true, createdAt: true, updatedAt: true, userId: true });

export const TaskUpdateSchema = TaskFormSchema.partial();
