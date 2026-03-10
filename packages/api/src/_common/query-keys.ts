export const queryKeys = {
	tasks: {
		all: ["tasks"] as const,
		detail: (id: string) => [...queryKeys.tasks.all, "detail", id] as const,
	},
} as const;
