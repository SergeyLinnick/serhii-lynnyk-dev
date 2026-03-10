import type { z } from "zod";
import type { TaskFormSchema, TaskViewSchema } from "./schema";

export type TaskFormType = z.infer<typeof TaskFormSchema>;
export type TaskViewType = z.infer<typeof TaskViewSchema>;
