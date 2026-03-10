import type { TaskFormType, TaskViewType } from "@workspace/models";
import type { CreateTaskPayload, TaskApiPayload } from "./contracts";

export function mapTaskFromApi(payload: TaskApiPayload): TaskFormType {
	return {
		title: payload.title,
		description: payload.description ?? undefined,
		status: payload.status,
		priority: payload.priority,
	};
}

export function mapTaskViewFromApi(payload: TaskApiPayload): TaskViewType {
	return {
		id: payload.id,
		title: payload.title,
		description: payload.description ?? undefined,
		status: payload.status,
		priority: payload.priority,
		createdAt: payload.created_at,
		updatedAt: payload.updated_at,
	};
}

export function mapTaskToApi(form: TaskFormType): CreateTaskPayload {
	return {
		title: form.title,
		description: form.description ?? null,
		status: form.status,
		priority: form.priority,
	};
}
