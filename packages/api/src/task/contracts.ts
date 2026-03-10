export type TaskApiPayload = {
	id: string;
	title: string;
	description: string | null;
	status: "todo" | "in_progress" | "done";
	priority: "low" | "medium" | "high";
	created_at: string;
	updated_at: string | null;
};

export type CreateTaskPayload = Omit<TaskApiPayload, "id" | "created_at" | "updated_at">;
export type UpdateTaskPayload = Partial<CreateTaskPayload>;
