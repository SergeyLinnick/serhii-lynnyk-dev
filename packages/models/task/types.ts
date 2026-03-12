import type { z } from "zod";
import type { TaskFormSchema, TaskUpdateSchema, TaskViewSchema } from "./schema";

export type TaskFormType = z.infer<typeof TaskFormSchema>;
export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>;
export type TaskViewType = z.infer<typeof TaskViewSchema>;
