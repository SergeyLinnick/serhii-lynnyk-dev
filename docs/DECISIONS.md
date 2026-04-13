# Architecture Decisions

This document records key architectural decisions for the starter monorepo. Each entry explains the context, the decision made, and the rationale behind it.

---

## 1. Better Auth over NextAuth

### Context

The project needs authentication with email/password support, session management, and middleware integration for Next.js. NextAuth (now Auth.js v5) is the most popular option in the Next.js ecosystem, but it has been in beta for an extended period with frequent breaking changes.

### Decision

Use [better-auth](https://www.better-auth.com/) as the authentication library.

### Rationale

- Simpler, more intuitive API compared to NextAuth v5.
- Production-ready with a stable release -- not in beta.
- First-class TypeScript support with excellent type inference.
- Built-in `toNextJsHandler` for clean Next.js App Router integration.
- Straightforward client hooks (`useSession`, `signIn`, `signOut`, `signUp`) without complex provider configuration.
- Easier to understand and extend for teams onboarding to the codebase.

---

## 2. shadcn/ui + Radix over React Aria

### Context

The project needs an accessible, composable component library that supports custom styling with Tailwind CSS. The two main contenders are shadcn/ui (built on Radix UI) and React Aria Components (by Adobe).

### Decision

Use shadcn/ui with Radix UI primitives and CVA (Class Variance Authority) for the component library.

### Rationale

- Wider ecosystem adoption means more community resources, examples, and third-party integrations.
- The CVA pattern provides type-safe variant management that maps cleanly to Tailwind classes.
- shadcn/ui components are copy-paste by design -- full control over the source code with no version lock-in.
- Radix UI provides solid accessibility primitives without imposing a styling opinion.
- React Aria, while excellent, has a steeper learning curve and a smaller ecosystem of ready-made examples and templates.

---

## 3. Zod v4

### Context

The project needs runtime validation for form data, API payloads, and environment variables. Zod is the de facto standard for TypeScript-first schema validation.

### Decision

Use Zod v4 (the latest major version) for all schema definitions and validation.

### Rationale

- New API surface is cleaner and more consistent.
- Significant performance improvements over Zod v3.
- Better error messages and formatting out of the box.
- Improved TypeScript inference with `z.infer`.
- The `models` package benefits from a single, modern validation library as the source of truth for all types.

---

## 4. Tailwind CSS v4

### Context

The project uses Tailwind CSS for styling. Tailwind v4 introduces a new CSS-first configuration approach that replaces the JavaScript `tailwind.config.js` file.

### Decision

Use Tailwind CSS v4 with the `@theme` inline directive for design token configuration.

### Rationale

- CSS-first configuration eliminates the need for a separate `tailwind.config.js` file in most cases.
- The `@theme inline` directive allows design tokens to be defined directly in CSS, co-located with other styles.
- Faster build times due to the new Oxide engine.
- Simplified setup across the monorepo -- apps import `@repo/ui/theme.css` for consistent theming.
- Native CSS cascade layers provide better style ordering without configuration overhead.

---

## 5. Drizzle ORM

### Context

The project needed a database ORM for PostgreSQL. Options considered: Prisma, Drizzle ORM, and raw SQL with pg.

### Decision

Use Drizzle ORM for all database operations.

### Rationale

- SQL-like API — queries read like SQL, reducing the learning curve for developers familiar with SQL.
- Zero runtime overhead — Drizzle compiles to raw SQL with no query engine.
- Schema-as-code — table definitions in TypeScript serve as both schema and type source.
- `drizzle-zod` integration bridges table definitions to Zod schemas, eliminating manual type duplication.
- Excellent migration tooling via `drizzle-kit` (generate, push, studio).
- Lightweight — no heavy runtime like Prisma Client.

---

## 6. Neon Postgres over Vercel Postgres

### Context

`@vercel/postgres` was deprecated in late 2024 when Vercel moved to a marketplace model. It was always a thin wrapper around Neon's serverless driver. The package is now archived and no longer maintained.

### Decision

Use `@neondatabase/serverless` with the `drizzle-orm/neon-http` adapter. Rename the env var from `POSTGRES_URL` to `DATABASE_URL` to follow Neon conventions.

### Rationale

- Direct access to Neon's full feature set (branching, autoscaling, instant restore).
- HTTP transport (`neon-http`) is ideal for serverless/Server Actions — no WebSocket polyfill needed.
- Actively maintained vs archived package.
- `DATABASE_URL` is the Neon marketplace convention and more portable across providers.
- No schema or query code changes required — Drizzle ORM abstracts the driver.

---

## 7. Server Actions over HTTP Services

### Context

The previous architecture used an HTTP client (`ky`) with contracts, services, and mappers to communicate with a backend. With the database now accessible directly from the Next.js server, an HTTP layer is unnecessary overhead.

### Decision

Replace HTTP services with Next.js Server Actions that call Drizzle directly. Keep TanStack Query hooks for client-side caching and invalidation.

### Rationale

- Eliminates an entire architectural layer (contracts, services, mappers, HTTP client).
- No serialization overhead — Server Actions pass data directly between server and client.
- Type safety end-to-end — Drizzle return types flow through to TanStack Query hooks without manual mapping.
- Authentication is handled via `getAuthenticatedSession()` in each action, keeping security co-located with data access.
- SSR data is fetched by calling Server Actions directly in page Server Components, passed as `initialData` to client views.

---

## 8. proxy.ts over middleware.ts

### Context

Next.js 16 deprecated `middleware.ts` in favor of `proxy.ts`. A critical CVE (CVE-2025-29927) in March 2025 exposed that middleware-based auth is architecturally fragile. The rename clarifies that the file acts as a network proxy, not application middleware.

### Decision

Use `proxy.ts` for lightweight cookie checks only. Real auth verification happens in Server Actions via `getAuthenticatedSession()`.

### Rationale

- Aligns with Next.js 16 file convention (`proxy.ts` replaces `middleware.ts`).
- Proxy handles optimistic redirects; Server Actions handle real authorization at the data access point.
- Uses `getSessionCookie` from `better-auth/cookies` for a lightweight, non-blocking check.
- Proxy runs on Node.js runtime (not Edge), matching the project's deployment model.

---

## 9. Sentry for Error Tracking and Performance Monitoring

### Context

The project needs error tracking, performance monitoring, and session replay to observe production behavior across the Next.js web app. Key contenders were Sentry, Datadog, New Relic, and BetterStack.

### Decision

Use [Sentry](https://sentry.io/) with the `@sentry/nextjs` SDK.

### Rationale

- First-party Next.js SDK with deep integration into App Router, server components, edge middleware, and Turbopack.
- Single SDK covers client, server, and edge runtimes — no separate packages to maintain.
- Built-in session replay, distributed tracing, and structured logging.
- Vercel partnership ensures continued compatibility with Next.js releases.
- Generous free tier suitable for early-stage projects; transparent pricing at scale.
- The `/monitoring` tunnel route avoids ad blocker interference without a proxy.
- Source map uploads via `SENTRY_AUTH_TOKEN` in CI produce readable stack traces in production.

---

## 10. safeAction Wrapper for Server-Side Validation

### Context

Server Actions receive data from the client. Even with client-side form validation (React Hook Form + zodResolver), the server boundary is untrusted — users can bypass the UI, call actions directly, or submit malformed data via browser dev tools. The project needed a consistent pattern for runtime validation on the server.

### Options Considered

1. **Inline validation** — Each action calls `schema.safeParse()` manually. Simple but repetitive and error-prone.
2. **Generic wrapper (`safeAction`)** — Single function that validates, reports, and delegates. Consistent pattern across all actions.
3. **Middleware-based validation** — Framework-level validation layer. Over-engineered for Server Actions.

### Decision

Use a generic `safeAction(schema, handler)` wrapper in `packages/api/src/_common/safe-action.ts`. All write mutations (create, update) must be wrapped. Read-only actions are exempt.

### Rationale

- **`raw: unknown` type boundary** — Forces Zod to prove the data shape at runtime. Typing the input as `z.infer<TSchema>` would let TypeScript pre-trust it, defeating the purpose.
- **`Sentry.captureException`** — Bypassed client validation is an anomaly (not routine), warranting an alert rather than just a breadcrumb.
- **Combined payload schema** — Multi-arg actions (e.g., `updateTaskAction(id, data)`) use `z.object({ id, data })` to fit the single-argument wrapper without inline validation.
- **`flattenError()` (Zod v4)** — Standalone import from `zod` replacing the deprecated `.flatten()` instance method.
- **Reuses `ApplicationError`** — Leverages the existing error class with `ERROR_CODES.VALIDATION` instead of inventing a new error type.
- **Scalable** — Every new domain module follows the same pattern: define schema in `@workspace/models`, wrap action with `safeAction`.

---

## 11. Dual-Layer Validation Strategy

### Context

The project validates user input on the client (React Hook Form + zodResolver) for UX and on the server (safeAction + Zod) for security. The question was whether both layers are necessary and how they should interact.

### Decision

Maintain both validation layers. Client validates for UX (instant feedback). Server validates for security (blocks tampered/bypassed requests). Schemas are shared from `@workspace/models`.

### Rationale

- Client validation alone is insufficient — it can be bypassed entirely.
- Server validation alone would degrade UX — users would wait for a round trip to see errors.
- Shared Zod schemas from `@workspace/models` eliminate duplication between layers.
- Server-side violations trigger Sentry alerts, providing observability into potential attacks or bugs.
