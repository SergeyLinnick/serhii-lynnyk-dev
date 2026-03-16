export const PAGE_URLS = {
	HOME: "/",
	LOGIN: "/auth/login",
	DASHBOARD: "/dashboard",
	TASKS: "/tasks",
	TASK_CREATE: "/tasks/new",
	TASK_DETAIL: (id: string) => `/tasks/${id}` as const,
} as const;

export const PUBLIC_ROUTES = ["/auth", "/tasks", "/portfolio", "/manifest.webmanifest"] as const;
