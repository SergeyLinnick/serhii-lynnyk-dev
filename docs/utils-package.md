# Utils Package

The `@repo/utils` package contains **pure utility functions** shared across the monorepo. It is a leaf dependency -- it depends only on Level 0 config packages and external libraries, never on other workspace packages.

## Structure

```
packages/utils/src/
├── cn.ts                       # Tailwind class name merging
├── format-date.ts              # Date formatting
└── index.ts                    # Public barrel export
```

## Rules

1. **Pure functions only.** No side effects, no React, no DOM access.
2. **No React.** No hooks, no components, no JSX, no `"use client"`.
3. **Leaf dependency.** Must not depend on any other `@repo/*` workspace package (except Level 0 configs).
4. **Reused across 2+ packages.** Only add a function here if it is used in at least two other packages.

## Functions

### cn() -- Tailwind Class Merging

Combines `clsx` (conditional class joining) with `tailwind-merge` (intelligent Tailwind class deduplication).

```ts
// cn.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
```

**Usage:**

```tsx
import { cn } from "@repo/utils";

// Simple merge
cn("p-4 bg-white", "bg-blue-500");
// => "p-4 bg-blue-500" (tailwind-merge deduplicates bg-*)

// Conditional classes
cn("p-4", isActive && "bg-primary", className);

// Array of classes
cn(["p-4", "rounded"], isDisabled && "opacity-50");
```

### formatDate() -- Date Formatting

Formats dates consistently across the app using `date-fns`.

```ts
// format-date.ts

import { format, formatDistanceToNow } from "date-fns";

export function formatDate(date: Date | string, pattern = "PPP"): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return format(d, pattern);
}

export function formatRelativeDate(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return formatDistanceToNow(d, { addSuffix: true });
}
```

**Usage:**

```ts
import { formatDate, formatRelativeDate } from "@repo/utils";

formatDate(new Date()); // "March 4, 2026"
formatDate(new Date(), "yyyy-MM-dd"); // "2026-03-04"
formatRelativeDate(new Date()); // "less than a minute ago"
```

## Adding a New Utility

Before adding a function to this package, verify that it meets **all** of the following criteria:

| Criterion                       | Check |
| ------------------------------- | ----- |
| Pure function (no side effects) | Yes   |
| No React dependency             | Yes   |
| No workspace package dependency | Yes   |
| Reused in 2+ packages           | Yes   |

If all checks pass:

1. Create a new file in `packages/utils/src/` with the function.
2. Export it from `index.ts`.
3. Add tests in `packages/utils/src/__tests__/`.

If the function is domain-specific or only used in one package, keep it in that package's local `utils/` or `helpers/` directory instead.
