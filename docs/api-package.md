# API Package

The `@workspace/api` package provides the data layer for all apps. It encapsulates Server Actions (database operations), auth helpers, and TanStack Query hooks behind a clean domain-oriented API.

## Structure

```
packages/api/src/
├── _common/                    # Shared API infrastructure
│   ├── auth.ts                 # Server Action auth helper (getAuthenticatedSession)
│   └── query-keys.ts           # Centralized query key factory
├── context/                    # React context and providers
│   └── api-provider.tsx        # QueryClientProvider wrapper
├── <domain>/                   # Domain-specific API modules
│   ├── actions.ts              # Server Actions (database operations)
│   └── queries/                # TanStack Query hooks
│       ├── <domain>-query-options.ts
│       ├── use-get-<domain>s.ts
│       ├── use-get-<domain>.ts
│       ├── use-create-<domain>.ts
│       ├── use-update-<domain>.ts
│       └── use-delete-<domain>.ts
└── index.ts                    # Public barrel export
```

## Domain Module Anatomy

### actions.ts -- Server Actions

Server Actions are `"use server"` functions that run on the server. They handle authentication, database operations, and return data directly — no HTTP layer needed.

```ts
// task/actions.ts
"use server";

import { db } from "@workspace/db";
import { task } from "@workspace/db/schema";
import { eq, and } from "drizzle-orm";
import type { TaskFormType } from "@workspace/models";
import { getAuthenticatedSession } from "../_common/auth";

export async function getTasksAction() {
	const session = await getAuthenticatedSession();
	return db.select().from(task)
		.where(eq(task.userId, session.user.id))
		.orderBy(task.createdAt);
}

export async function createTaskAction(data: TaskFormType) {
	const session = await getAuthenticatedSession();
	const [result] = await db.insert(task)
		.values({ ...data, userId: session.user.id })
		.returning();
	return result;
}
```

**Rules for Server Actions:**

1. Always start with `"use server"` directive.
2. Always call `getAuthenticatedSession()` first.
3. Always filter by `userId` — never expose data across users.
4. Throw errors on failure (mutations catch in hooks, queries propagate to error boundaries).

### Auth Helper

The shared auth helper verifies the session for every Server Action:

```ts
// _common/auth.ts
"use server";

import { headers } from "next/headers";
import { auth } from "@workspace/auth/server";

export async function getAuthenticatedSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new Error("Unauthorized");
	}

	return session;
}
```

### queries/ -- TanStack Query Hooks

Query hooks wrap Server Actions with TanStack Query for caching, invalidation, and optimistic updates.

| Operation | Hook Name         | TanStack Primitive |
| --------- | ----------------- | ------------------ |
| Read list | `use-get-*s.ts`   | `useQuery`         |
| Read one  | `use-get-*.ts`    | `useQuery`         |
| Create    | `use-create-*.ts` | `useMutation`      |
| Update    | `use-update-*.ts` | `useMutation`      |
| Delete    | `use-delete-*.ts` | `useMutation`      |

Query options are extracted into a separate file for reuse:

```ts
// task/queries/task-query-options.ts

import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "../../_common/query-keys";
import { getTaskAction, getTasksAction } from "../actions";

export const taskListQueryOptions = queryOptions({
	queryKey: queryKeys.tasks.list(),
	queryFn: getTasksAction,
});

export function taskDetailQueryOptions(id: string) {
	return queryOptions({
		queryKey: queryKeys.tasks.detail(id),
		queryFn: () => getTaskAction(id),
		enabled: !!id,
	});
}
```

Hooks support `initialData` for SSR hydration:

```ts
// task/queries/use-get-tasks.ts

import { useQuery } from "@tanstack/react-query";
import type { TaskViewType } from "@workspace/models";
import { taskListQueryOptions } from "./task-query-options";

export function useGetTasks(initialData?: TaskViewType[]) {
	return useQuery({
		...taskListQueryOptions,
		initialData,
	});
}
```

Mutation hooks invalidate related queries on success:

```ts
// task/queries/use-create-task.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskFormType } from "@workspace/models";
import { toast } from "@workspace/ui";
import { queryKeys } from "../../_common/query-keys";
import { createTaskAction } from "../actions";

export function useCreateTask() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: TaskFormType) => createTaskAction(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
			toast.success("Task created successfully");
		},
	});
}
```

## SSR Data Flow

Pages call Server Actions directly for initial data, then pass it to client views via `initialData`:

```tsx
// app/(private)/tasks/page.tsx (server component)
import { getTasksAction } from "@workspace/api";
import { TasksListView } from "@/features/tasks";

export default async function TasksPage() {
	const tasks = await getTasksAction();
	return <TasksListView initialData={tasks} />;
}
```

```tsx
// features/tasks/tasks-list-view.tsx (client component)
"use client";

import { useGetTasks } from "@workspace/api";

export function TasksListView({ initialData }: { initialData?: TaskViewType[] }) {
	const { data: tasks } = useGetTasks(initialData);
	// render with tasks...
}
```

## Centralized Query Keys

All query keys are managed through a single factory in `_common/query-keys.ts`:

```ts
export const queryKeys = {
	tasks: {
		all: ["tasks"] as const,
		list: (filters?: Record<string, unknown>) => [...queryKeys.tasks.all, "list", filters] as const,
		detail: (id: string) => [...queryKeys.tasks.all, "detail", id] as const,
	},
};
```

## Context -- ApiProvider

The `ApiProvider` wraps the app with `QueryClientProvider` and sets default query options:

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function ApiProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
						retry: (failureCount, error) => {
							if (error instanceof Error && error.message === "Unauthorized") return false;
							return failureCount < 1;
						},
					},
				},
			}),
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

## Server-Side Validation -- safeAction

The `safeAction` wrapper provides runtime Zod validation for Server Actions. It sits between the caller and the handler, ensuring data integrity even if client-side validation is bypassed.

```ts
// _common/safe-action.ts
import * as Sentry from "@sentry/nextjs";
import { ApplicationError, ERROR_CODES } from "@workspace/models";
import { type z, flattenError } from "zod";

export function safeAction<TSchema extends z.ZodType, TResult>(
	schema: TSchema,
	handler: (data: z.infer<TSchema>) => Promise<TResult>,
) {
	return async (raw: unknown): Promise<TResult> => {
		const result = schema.safeParse(raw);
		if (!result.success) {
			const fieldErrors = flattenError(result.error).fieldErrors;
			Sentry.captureException(
				new Error(`Contract violation in ${handler.name || "action"}`),
				{ tags: { category: "validation" }, extra: { fieldErrors }, level: "warning" },
			);
			throw new ApplicationError(ERROR_CODES.VALIDATION, "Validation failed", { fieldErrors });
		}
		return handler(result.data);
	};
}
```

**Key design decisions:**

- **`raw: unknown`** — Forces Zod to prove data shape. Typing as `z.infer<TSchema>` would let TypeScript pre-trust the data, defeating the purpose of runtime validation.
- **`Sentry.captureException`** — Bypassed client validation is an anomaly worth alerting on, not just a breadcrumb.
- **`flattenError()`** — Zod v4 standalone function replacing the deprecated `.flatten()` instance method.
- **`ApplicationError`** — Reuses the existing error class with `ERROR_CODES.VALIDATION`.

### Usage -- Single-arg Actions

```ts
// task/actions.ts
import { TaskFormSchema } from "@workspace/models";
import { safeAction } from "../_common/safe-action";

export const createTaskAction = safeAction(TaskFormSchema, async (data) => {
	const session = await getAuthenticatedSession();
	const [result] = await db.insert(task).values({ ...data, userId: session.user.id }).returning();
	return result;
});
```

### Usage -- Multi-arg Actions (Combined Payload Schema)

When an action needs multiple arguments (e.g., `id` + `data`), combine them into a single Zod schema:

```ts
const UpdateTaskPayloadSchema = z.object({
	id: z.string().uuid(),
	data: TaskUpdateSchema,
});

export const updateTaskAction = safeAction(UpdateTaskPayloadSchema, async (payload) => {
	const session = await getAuthenticatedSession();
	const [result] = await db.update(task)
		.set({ ...payload.data, updatedAt: new Date() })
		.where(and(eq(task.id, payload.id), eq(task.userId, session.user.id)))
		.returning();
	return result;
});
```

Call site in the hook: `updateTaskAction({ id, data })`.

### When to Use safeAction

| Action type | Use safeAction? | Reason |
|-------------|-----------------|--------|
| Create / Update (write mutations) | Yes | Untrusted input must be validated |
| Read-only queries | No | No external input to validate |
| Delete by ID | Optional | UUID check may be worthwhile |

### Dual-Layer Validation Flow

```
Client (React Hook Form + zodResolver)
  → validates form fields for UX
  → submits to Server Action

Server (safeAction + Zod)
  → re-validates with `raw: unknown`
  → blocks invalid data even if client is bypassed
  → reports anomalies to Sentry
```

## Observability -- ApiProvider Sentry Integration

The `ApiProvider` adds Sentry breadcrumbs for all TanStack Query errors via `MutationCache` and `QueryCache` `onError` callbacks. Validation errors (detected via `isAppError()`) are tagged as `"warning"` level; all others as `"error"`.

## Testing

Tests are co-located next to source files (`*.test.ts`). The package uses Vitest.

```bash
pnpm --filter @workspace/api test
```

## Adding a New Domain

1. Create `packages/api/src/<domain>/` directory.
2. Add `actions.ts` with Server Actions (always authenticate, filter by userId).
3. Wrap write mutations with `safeAction(Schema, handler)` using schemas from `@workspace/models`.
4. Create `queries/` directory with query options and TanStack Query hooks.
5. Register query keys in `_common/query-keys.ts`.
6. Export the public API from `index.ts`.
