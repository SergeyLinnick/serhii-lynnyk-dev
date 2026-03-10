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

## 5. In-memory mock for starter

### Context

The starter template needs to be self-contained and runnable without any external backend service or database. However, the API layer should be structured so that connecting a real backend later is straightforward.

### Decision

Use an in-memory mock implementation in the `api` package's services layer. When a real backend is available, swap the mock services to use `ky` (or `fetch`) for actual HTTP calls.

### Rationale

- Self-contained: `pnpm dev` works immediately without configuring a backend, database, or Docker.
- The services layer is the only place that needs to change -- contracts, mappers, and query hooks remain untouched.
- Developers can build and test full features (CRUD flows, optimistic updates, error states) against realistic mock data.
- The architectural boundary between services and the rest of the API package is enforced from day one, making the eventual swap trivial.
- `ky` is the recommended HTTP client for production use due to its clean API, retry support, and built-in hooks.
