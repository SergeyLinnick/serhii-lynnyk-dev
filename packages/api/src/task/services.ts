import type { CreateTaskPayload, TaskApiPayload, UpdateTaskPayload } from "./contracts";

// Replace with real API calls using createApi() from ../_common/api-client.ts when backend is ready.

const store: Map<string, TaskApiPayload> = new Map();

function seed() {
	const tasks: TaskApiPayload[] = [
		{
			id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
			title: "Set up CI/CD pipeline",
			description: "Configure GitHub Actions for automated testing and deployment",
			status: "done",
			priority: "high",
			created_at: "2025-01-15T10:00:00.000Z",
			updated_at: "2025-01-16T14:30:00.000Z",
		},
		{
			id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
			title: "Implement user authentication",
			description: "Add login, registration, and session management using better-auth",
			status: "in_progress",
			priority: "high",
			created_at: "2025-01-16T09:00:00.000Z",
			updated_at: null,
		},
		{
			id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
			title: "Design landing page",
			description: null,
			status: "todo",
			priority: "medium",
			created_at: "2025-01-17T11:00:00.000Z",
			updated_at: null,
		},
	];

	for (const task of tasks) {
		store.set(task.id, task);
	}
}

seed();

async function delay() {
	await new Promise(r => setTimeout(r, 300));
}

export async function getTasks(): Promise<TaskApiPayload[]> {
	await delay();
	return Array.from(store.values());
}

export async function getTask(id: string): Promise<TaskApiPayload> {
	await delay();
	const task = store.get(id);
	if (!task) {
		throw new Error(`Task with id "${id}" not found`);
	}
	return task;
}

export async function createTask(payload: CreateTaskPayload): Promise<TaskApiPayload> {
	await delay();
	const task: TaskApiPayload = {
		id: crypto.randomUUID(),
		...payload,
		created_at: new Date().toISOString(),
		updated_at: null,
	};
	store.set(task.id, task);
	return task;
}

export async function updateTask(id: string, payload: UpdateTaskPayload): Promise<TaskApiPayload> {
	await delay();
	const existing = store.get(id);
	if (!existing) {
		throw new Error(`Task with id "${id}" not found`);
	}
	const updated: TaskApiPayload = {
		...existing,
		...payload,
		updated_at: new Date().toISOString(),
	};
	store.set(id, updated);
	return updated;
}

export async function deleteTask(id: string): Promise<void> {
	await delay();
	if (!store.has(id)) {
		throw new Error(`Task with id "${id}" not found`);
	}
	store.delete(id);
}
