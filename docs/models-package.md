# Models Package

The `@workspace/models` package is the single source of truth for all domain schemas, types, constants, and navigation definitions. It has **no UI, no API calls, and no React dependencies**. Domain schemas are derived from Drizzle table definitions using `drizzle-zod`.

## Structure

```
packages/models/src/
├── constants/                  # App-wide constants
│   └── index.ts
├── navigation/                 # Navigation route definitions
│   └── index.ts
├── errors.ts                   # Error codes and error classes
├── <domain>/                   # Domain module
│   ├── schema.ts               # Zod v4 schemas
│   └── types.ts                # Inferred TypeScript types
├── <domain>/
│   ├── schema.ts
│   └── types.ts
└── index.ts                    # Public barrel export
```

## Rules

1. **No UI.** This package must not import React or any UI library.
2. **No API calls.** This package must not import fetch, ky, axios, or any HTTP client.
3. **No React.** No hooks, no components, no JSX.
4. **Drizzle tables are the source of truth.** Domain schemas are derived from `@workspace/db/schema` using `drizzle-zod`. Types are inferred from schemas using `z.infer`.
5. **One schema file, one types file per domain.**

## Zod Schemas (schema.ts)

Schemas are derived from Drizzle table definitions using `drizzle-zod`, with form-level validation overrides:

```ts
// task/schema.ts

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { task } from "@workspace/db/schema";

// View schema — inferred from DB table (all columns)
export const TaskViewSchema = createSelectSchema(task);

// Form schema — insert schema with validation overrides, omitting server-managed fields
export const TaskFormSchema = createInsertSchema(task, {
	title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters"),
	description: z.string().max(2000, "Description must be at most 2000 characters").optional(),
}).omit({ id: true, createdAt: true, updatedAt: true, userId: true });
```

**Key patterns:**

- `createSelectSchema(table)` — generates a Zod schema matching all columns (for view/display types)
- `createInsertSchema(table, overrides)` — generates a Zod schema for inserts, with optional field-level validation overrides
- `.omit(...)` — removes server-managed fields (id, timestamps, userId) from form schemas

## Inferred Types (types.ts)

Types are always inferred from schemas. Never define types manually if a schema exists.

```ts
// orders/types.ts

import { z } from "zod";
import { orderSchema, orderCreateSchema, orderUpdateSchema, lineItemSchema } from "./schema";

export type Order = z.infer<typeof orderSchema>;
export type OrderCreate = z.infer<typeof orderCreateSchema>;
export type OrderUpdate = z.infer<typeof orderUpdateSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;
```

## Constants

App-wide constants that are shared across packages.

```ts
// constants/index.ts

export const APP_NAME = "Starter App";
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
```

## Navigation

Route definitions used for building navigation menus and type-safe linking.

```ts
// navigation/index.ts

export const routes = {
	home: "/",
	signIn: "/sign-in",
	signUp: "/sign-up",
	dashboard: "/dashboard",
	orders: {
		list: "/orders",
		detail: (id: string) => `/orders/${id}`,
		create: "/orders/create",
		edit: (id: string) => `/orders/${id}/edit`,
	},
} as const;
```

## Error Codes and Error Classes (errors.ts)

Centralized error definitions used across all packages.

```ts
// errors.ts

export enum ERROR_CODES {
	// Auth errors
	UNAUTHORIZED = "UNAUTHORIZED",
	FORBIDDEN = "FORBIDDEN",
	SESSION_EXPIRED = "SESSION_EXPIRED",

	// Validation errors
	VALIDATION_FAILED = "VALIDATION_FAILED",
	INVALID_INPUT = "INVALID_INPUT",

	// Resource errors
	NOT_FOUND = "NOT_FOUND",
	CONFLICT = "CONFLICT",
	ALREADY_EXISTS = "ALREADY_EXISTS",

	// Server errors
	INTERNAL_ERROR = "INTERNAL_ERROR",
	SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
}

export class AppError extends Error {
	constructor(
		public code: ERROR_CODES,
		message: string,
		public statusCode?: number,
	) {
		super(message);
		this.name = "AppError";
	}
}

export class ValidationError extends AppError {
	constructor(
		message: string,
		public fields?: Record<string, string[]>,
	) {
		super(ERROR_CODES.VALIDATION_FAILED, message, 400);
		this.name = "ValidationError";
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string, id?: string) {
		const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
		super(ERROR_CODES.NOT_FOUND, message, 404);
		this.name = "NotFoundError";
	}
}
```

## Dependencies

- `@workspace/db` — Drizzle table definitions used as schema source
- `drizzle-zod` — Bridges Drizzle tables to Zod schemas
- `zod` — Runtime validation

## Adding a New Domain

1. Ensure the Drizzle table exists in `@workspace/db/schema`.
2. Create `packages/models/src/<domain>/` directory.
3. Add `schema.ts` using `createSelectSchema` and `createInsertSchema` from `drizzle-zod`.
4. Add `types.ts` with inferred types (`z.infer<typeof schema>`).
5. Export from `index.ts`.
6. Never write manual TypeScript interfaces when a Zod schema exists.
