export const queryKeys = {
	tasks: {
		all: ["tasks"] as const,
		list: (filters?: Record<string, unknown>) => [...queryKeys.tasks.all, "list", filters] as const,
		detail: (id: string) => [...queryKeys.tasks.all, "detail", id] as const,
	},
} as const;
