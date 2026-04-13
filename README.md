# Starter Monorepo

A production-ready Next.js 16 monorepo starter kit with Turborepo, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

| Category        | Package              | Version  |
| --------------- | -------------------- | -------- |
| Package Manager | pnpm                 | 10.4.1   |
| Build System    | turbo                | ^2.5.6   |
| Runtime         | Node.js              | >=20     |
| Language        | TypeScript           | ^5.9.2   |
| Framework       | Next.js              | ^16.0.0  |
| UI              | React                | ^19.2.0  |
| CSS             | Tailwind CSS         | ^4.1.2   |
| Components      | shadcn/ui + Radix UI | latest   |
| Auth            | better-auth          | latest   |
| Server State    | TanStack Query       | ^5.72.1  |
| Validation      | Zod                  | ^4.1.4   |
| Forms           | react-hook-form      | ^7.62.0  |
| Testing         | Vitest + RTL         | ^3.2.4   |
| Storybook       | Storybook            | ^10.1.10 |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Open apps
# Web: http://localhost:3000
# Admin: http://localhost:2999
```

## Scripts

| Script                | Description                        |
| --------------------- | ---------------------------------- |
| `pnpm dev`            | Start all apps in dev mode         |
| `pnpm build`          | Build all apps and packages        |
| `pnpm lint`           | Lint all packages                  |
| `pnpm check-types`    | Type-check all packages            |
| `pnpm test`           | Run all tests                      |
| `pnpm format`         | Format all files with Prettier     |
| `pnpm syncpack-check` | Check dependency version alignment |

## Testing

Tests use [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

```bash
# Run all tests across the monorepo
pnpm test

# Run tests for a specific package
pnpm --filter @workspace/api test
pnpm --filter @workspace/ui test

# Run tests for a specific app
pnpm --filter web test
pnpm --filter admin test
```

Test files are **co-located** with source files using the `*.test.ts(x)` naming convention.

| Package          | Config             | Environment | Coverage        |
| ---------------- | ------------------ | ----------- | --------------- |
| `@workspace/ui`  | `vitest.config.ts` | jsdom       | Component tests |
| `@workspace/api` | `vitest.config.ts` | node        | Unit tests      |
| `web`            | `vitest.config.ts` | jsdom       | Feature tests   |
| `admin`          | `vitest.config.ts` | jsdom       | Feature tests   |

## Packages

| Package                        | Description                       | Docs                                             |
| ------------------------------ | --------------------------------- | ------------------------------------------------ |
| `@workspace/typescript-config` | Shared TypeScript configs         | —                                                |
| `@workspace/eslint-config`     | Shared ESLint v9 flat configs     | —                                                |
| `@workspace/prettier-config`   | Shared Prettier config            | —                                                |
| `@workspace/utils`             | Shared utilities (cn, formatDate) | [docs/utils-package.md](docs/utils-package.md)   |
| `@workspace/models`            | Schemas, types, constants         | [docs/models-package.md](docs/models-package.md) |
| `@workspace/auth`              | Authentication (better-auth)      | [docs/auth-package.md](docs/auth-package.md)     |
| `@workspace/ui`                | UI components (shadcn/ui)         | [docs/ui.md](docs/ui.md)                         |
| `@workspace/api`               | API client, TanStack Query hooks  | [docs/api-package.md](docs/api-package.md)       |

## Apps

| App     | Port | Description                  |
| ------- | ---- | ---------------------------- |
| `web`   | 3000 | Main user-facing application |
| `admin` | 2999 | Admin dashboard              |
