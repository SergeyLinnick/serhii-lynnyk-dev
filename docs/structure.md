# Project Structure

## Top-Level Layout

```
starter-monorepo/
├── apps/
│   ├── web/                    # Main Next.js application (port 3000)
│   └── admin/                  # Admin Next.js application (port 2999)
├── packages/
│   ├── api/                    # Level 5 — API layer (services, queries, mappers)
│   ├── auth/                   # Level 3 — Authentication (better-auth)
│   ├── eslint-config/          # Level 0 — Shared ESLint v9 flat config
│   ├── models/                 # Level 2 — Zod schemas, types, constants
│   ├── prettier-config/        # Level 0 — Shared Prettier configuration
│   ├── typescript-config/      # Level 0 — Shared TypeScript configuration
│   ├── ui/                     # Level 4 — Shared UI components (shadcn/ui)
│   └── utils/                  # Level 1 — Pure utility functions
├── docs/                       # Documentation
├── .claude/                    # Claude AI configuration & rules
│   ├── commands/
│   └── rules/
├── .github/
│   └── workflows/              # CI (pr-checks.yml)
├── .vscode/                    # VS Code settings & extensions
├── CLAUDE.md                   # AI assistant entry rules
├── README.md                   # Quickstart guide
├── package.json                # Root workspace config & scripts
├── pnpm-workspace.yaml         # Workspace definition (apps/*, packages/*)
├── turbo.json                  # Turborepo task pipeline
├── syncpack.config.js          # Dependency version alignment
├── tsconfig.json               # Root TypeScript config
├── .env.example                # Environment variables template
└── .npmrc                      # npm registry config
```

## Dependency Hierarchy

Dependencies flow **downward only**. A package may depend on packages at its level or below, never above.

```
Level 6  ─  Apps (web, admin)
Level 5  ─  api        → queries, services, mappers
Level 4  ─  ui         → shadcn/ui, Radix, Storybook
Level 3  ─  auth       → better-auth (server, client, middleware)
Level 2  ─  models     → Zod schemas, types, constants
Level 1  ─  utils      → cn(), formatDate(), pure functions
Level 0  ─  typescript-config, eslint-config, prettier-config
```

## App Structure (Next.js App Router)

Apps use the Next.js App Router convention. Feature logic lives in `features/<domain>/`, **not** inside `app/`.

```
apps/web/
├── app/                        # Next.js App Router (routes only)
│   ├── layout.tsx              # Root layout
│   ├── (private)/              # Protected route group
│   │   └── ...
│   ├── auth/                   # Auth routes
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   └── api/                    # API routes
├── features/                   # Feature modules (domain logic + UI)
│   └── tasks/                  # Example: Task management feature
│       ├── blocks/             # Reusable UI compositions
│       │   ├── task-form.tsx
│       │   └── task-columns.tsx
│       ├── tasks-list-view.tsx
│       ├── create-task-view.tsx
│       ├── view-task-view.tsx
│       └── index.ts            # Barrel export
├── components/                 # App-level shared components
├── hooks/                      # App-level shared hooks
├── public/                     # Static assets
├── middleware.ts               # Next.js middleware (auth, redirects)
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── eslint.config.js
├── vitest.config.ts
├── Dockerfile
└── package.json
```

> The `admin/` app follows the same structure.

### Key Rules for Apps

1. **`app/` contains routes only.** Pages are server components that import views from `features/`.
2. **`features/<domain>/` contains all domain logic.** Each domain folder has its own blocks, hooks, helpers, types, etc.
3. **`features/<domain>/blocks/` contains reusable UI compositions.** Blocks are larger UI pieces assembled from `@workspace/ui` primitives.
4. **Pages are server components.** They fetch data and pass it to client-component views.

### Page and View Separation

```
app/(private)/tasks/page.tsx           # Server component (data fetching)
  └── imports: features/tasks/tasks-list-view.tsx   # Client component (rendering)
```

```tsx
// app/(private)/tasks/page.tsx (server component)
import { TasksListView } from "@/features/tasks/tasks-list-view";

export default async function TasksPage() {
	return <TasksListView />;
}
```

```tsx
// features/tasks/tasks-list-view.tsx (client component)
"use client";

export function TasksListView() {
	// Client-side hooks, state, interactivity
	return <div>...</div>;
}
```

## Feature Module Structure

Each feature in `features/<domain>/` can contain any combination of:

```
features/<domain>/
├── blocks/                     # Reusable UI compositions (forms, tables, cards)
├── hooks/                      # Domain-specific hooks
├── helpers/                    # Domain helper functions
├── utils/                      # Domain utilities
├── constants/                  # Domain constants
├── types/                      # Domain types (if not in models)
├── <name>-view.tsx             # Main client views
├── <name>-form.tsx             # Form components
├── <name>-columns.tsx          # Table column definitions
├── <name>-modal.tsx            # Modal components
└── index.ts                    # Public barrel export
```

Not all folders are required — add them as the feature grows.

## Package Structures

### api (`@workspace/api`) — Level 5

```
packages/api/src/
├── _common/                    # Shared API utilities (error handling, client)
├── context/                    # React providers (ApiProvider, Hydration)
├── <domain>/                   # Domain-specific API modules
│   ├── contracts.ts            # Request/response type contracts
│   ├── services.ts             # HTTP calls (ky) or in-memory mocks
│   ├── mappers.ts              # Response → domain model transformations
│   └── queries/                # TanStack Query hooks (useQuery, useMutation)
└── index.ts                    # Public API (barrel export)
```

### ui (`@workspace/ui`) — Level 4

```
packages/ui/src/
├── components/
│   ├── base/                   # Radix UI + shadcn primitives (button, input, dialog…)
│   └── application/            # Composed app-level components
├── styles/
│   └── globals.css             # Global CSS (Tailwind v4 imports)
├── hooks/                      # UI-related hooks
└── utils/                      # UI utilities
```

Storybook config lives in `packages/ui/.storybook/`.

### auth (`@workspace/auth`) — Level 3

```
packages/auth/src/
├── index.ts                    # Main export
├── client.ts                   # Client-side auth hooks (useSession, signIn, signOut)
├── server.ts                   # Server-side auth utilities
├── middleware.ts               # Next.js middleware helpers
└── types.ts                    # Auth types
```

### models (`@workspace/models`) — Level 2

```
packages/models/
├── <domain>/                   # Domain-specific schemas
│   ├── schema.ts               # Zod schemas
│   └── types.ts                # Inferred TypeScript types
├── constants/                  # Shared constants
│   ├── api-constants.ts
│   └── error-messages.ts
├── navigation/
│   └── constants.ts            # Navigation route constants
├── errors.ts                   # Error schemas
├── error-map.ts                # Zod error map
└── index.ts                    # Barrel export
```

### utils (`@workspace/utils`) — Level 1

```
packages/utils/src/
├── cn.ts                       # ClassNames merge (clsx + tailwind-merge)
├── format-date.ts              # Date formatting (date-fns)
└── index.ts                    # Barrel export
```

### Config Packages — Level 0

| Package             | Contents                                                          |
| ------------------- | ----------------------------------------------------------------- |
| `typescript-config` | Shared `tsconfig.json` base files                                 |
| `eslint-config`     | ESLint v9 flat configs: `base.js`, `next.js`, `react-internal.js` |
| `prettier-config`   | Shared `prettierrc.json` with import sorting plugin               |

## Naming Conventions

All naming uses **kebab-case** for files and directories.

| Item            | Convention          | Example                           |
| --------------- | ------------------- | --------------------------------- |
| Directories     | kebab-case          | `purchase-orders/`                |
| Component files | kebab-case          | `order-card.tsx`                  |
| View files      | `*-view.tsx`        | `dashboard-view.tsx`              |
| Form files      | `*-form.tsx`        | `create-order-form.tsx`           |
| Modal files     | `*-modal.tsx`       | `confirm-delete-modal.tsx`        |
| Column files    | `*-columns.tsx`     | `order-columns.tsx`               |
| Hook files      | `use-*.ts`          | `use-orders.ts`                   |
| Type files      | `types.ts`          | `types.ts`                        |
| Schema files    | `schema.ts`         | `schema.ts`                       |
| Constants files | `constants.ts`      | `constants.ts`                    |
| Utility files   | kebab-case          | `format-currency.ts`              |
| Test files      | `*.test.ts(x)`      | `order-card.test.tsx`             |
| Story files     | `*.stories.tsx`     | `order-card.stories.tsx`          |
| Package names   | `@workspace/<name>` | `@workspace/ui`, `@workspace/api` |

## Root Scripts

```bash
pnpm dev              # Start all apps in dev mode (Turbo)
pnpm build            # Build all packages & apps
pnpm lint             # Lint all workspaces
pnpm check-types      # Type-check all workspaces
pnpm test             # Run all tests (Vitest)
pnpm format           # Prettier format all files
pnpm syncpack-check   # Check dependency version alignment
```

## Tech Stack Summary

| Category            | Technology                     | Version |
| ------------------- | ------------------------------ | ------- |
| Package Manager     | pnpm (workspaces)              | 10.4.1  |
| Build Orchestration | Turborepo                      | 2.5.6   |
| Runtime             | Node.js                        | >= 20   |
| Language            | TypeScript                     | 5.9     |
| Framework           | Next.js                        | 16      |
| UI Library          | React                          | 19      |
| Styling             | Tailwind CSS                   | 4       |
| Components          | shadcn/ui + Radix UI           | latest  |
| Authentication      | better-auth                    | latest  |
| Server State        | TanStack Query                 | 5       |
| Forms               | react-hook-form                | 7       |
| Validation          | Zod                            | 4       |
| HTTP Client         | ky                             | 1.x     |
| Tables              | @tanstack/react-table          | 8       |
| Testing             | Vitest + React Testing Library | latest  |
| Component Docs      | Storybook                      | 10      |
| Linting             | ESLint v9 (flat config)        | 9       |
| Formatting          | Prettier                       | 3       |
