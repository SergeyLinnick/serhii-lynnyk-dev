# Starter Monorepo

A production-ready monorepo template built with modern web technologies.

## Architecture

```
                        +-------------------+
                        |   Level 7: Apps    |
                        |  apps/web          |
                        |  apps/admin        |
                        +--------+----------+
                                 |
                        +--------v----------+
                        |   Level 6: api     |
                        | (Server Actions,   |
                        |  TanStack Query)   |
                        +--------+----------+
                                 |
                        +--------v----------+
                        |   Level 5: ui      |
                        | (components,       |
                        |  Storybook)        |
                        +--------+----------+
                                 |
                        +--------v----------+
                        |   Level 4: auth    |
                        | (better-auth +     |
                        |  Drizzle adapter)  |
                        +--------+----------+
                                 |
                        +--------v----------+
                        |  Level 3: models   |
                        | (drizzle-zod,      |
                        |  types, constants) |
                        +--------+----------+
                                 |
                        +--------v----------+
                        |   Level 2: db      |
                        | (Drizzle ORM,      |
                        |  Neon Postgres)    |
                        +--------+----------+
                                 |
                        +--------v----------+
                        |  Level 1: utils    |
                        | (cn, formatDate,   |
                        |  pure functions)   |
                        +--------+----------+
                                 |
              +------------------+------------------+
              |                  |                  |
     +--------v------+  +-------v-------+  +-------v--------+
     | Level 0:      |  | Level 0:      |  | Level 0:       |
     | typescript-   |  | eslint-       |  | prettier-      |
     | config        |  | config        |  | config         |
     +---------------+  +---------------+  +----------------+
```

Dependencies flow **downward only**. A package may depend on packages at its own level or below, never above.

## Packages

| Package             | Level | Path                         | Purpose                                         |
| ------------------- | ----- | ---------------------------- | ----------------------------------------------- |
| `typescript-config` | 0     | `packages/typescript-config` | Shared `tsconfig.json` bases                    |
| `eslint-config`     | 0     | `packages/eslint-config`     | Shared ESLint flat config presets               |
| `prettier-config`   | 0     | `packages/prettier-config`   | Shared Prettier configuration                   |
| `utils`             | 1     | `packages/utils`             | Pure utility functions (cn, formatDate, etc.)   |
| `db`                | 2     | `packages/db`                | Drizzle ORM, Neon Postgres, schema & migrations |
| `models`            | 3     | `packages/models`            | drizzle-zod schemas, inferred types, constants  |
| `auth`              | 4     | `packages/auth`              | Authentication (better-auth + Drizzle adapter)  |
| `ui`                | 5     | `packages/ui`                | Shared UI components (shadcn/ui, Radix, CVA)    |
| `api`               | 6     | `packages/api`               | Server Actions, TanStack Query hooks            |
| `web`               | 7     | `apps/web`                   | Main Next.js application                        |
| `admin`             | 7     | `apps/admin`                 | Admin Next.js application                       |

## Tech Stack

| Category        | Technology       | Version |
| --------------- | ---------------- | ------- |
| Framework       | Next.js          | 16      |
| UI Library      | React            | 19      |
| Language        | TypeScript       | 5.9     |
| Styling         | Tailwind CSS     | 4       |
| Database ORM    | Drizzle ORM      | 0.45    |
| Database        | Neon Postgres    | latest  |
| Data Fetching   | TanStack Query   | 5       |
| Validation      | Zod              | 4       |
| Authentication  | better-auth      | 1.5     |
| Testing         | Vitest           | latest  |
| Documentation   | Storybook        | 10      |
| Package Manager | pnpm (workspace) | latest  |

## Environment Setup

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd starter-monorepo

# Install dependencies
pnpm install

# Start the web app in development mode
pnpm --filter web dev

# Start the admin app in development mode
pnpm --filter admin dev

# Run all tests
pnpm -r test

# Run Storybook
pnpm --filter ui storybook

# Build all packages
pnpm -r build

# Lint all packages
pnpm -r lint

# Format all packages
pnpm -r format
```

### Environment Variables

Each app has its own `.env.local` file. Copy the example:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

Required variables are documented in each app's `.env.example` file.

## Documentation

- [Project Structure](./structure.md)
- [Feature Modules](./features.md)
- [API Package](./api-package.md)
- [Models Package](./models-package.md)
- [Auth Package](./auth-package.md)
- [UI Package](./ui.md)
- [Utils Package](./utils-package.md)
- [Best Practices](./BEST_PRACTICES.md)
- [Database Package](./db-package.md)
- [Architecture Decisions](./DECISIONS.md)
