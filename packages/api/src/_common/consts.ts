export const API_PATH = {
	TASKS: {
		LIST: "tasks",
		CREATE: "tasks",
		DETAIL: (id: string) => `tasks/${id}`,
		UPDATE: (id: string) => `tasks/${id}`,
		DELETE: (id: string) => `tasks/${id}`,
	},
} as const;
