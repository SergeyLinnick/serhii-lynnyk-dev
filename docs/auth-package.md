# Auth Package

The `@workspace/auth` package provides authentication using [better-auth](https://www.better-auth.com/) with a Drizzle database adapter. It exposes server configuration, client hooks, and proxy helpers that apps consume.

## Structure

```
packages/auth/src/
├── server.ts                   # better-auth server configuration
├── client.ts                   # Client-side auth hooks
├── auth-proxy.ts               # Proxy helper for route protection
└── index.ts                    # Public barrel export
```

## Server Configuration (server.ts)

The server config initializes better-auth with email and password authentication.

```ts
// server.ts

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
export { toNextJsHandler } from "better-auth/next-js";

import { db } from "@workspace/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day
	},
});
```

The auth schema tables (user, session, account, verification) are defined in `@workspace/db/schema/auth.ts` and managed via Drizzle migrations.

## Client Hooks (client.ts)

Client hooks wrap better-auth's `createAuthClient` for use in React components.

```ts
// client.ts

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { useSession, signIn, signOut, signUp } = authClient;
```

### Usage in Components

```tsx
"use client";

import { useSession, signOut } from "@repo/auth";

export function UserMenu() {
	const { data: session, isPending } = useSession();

	if (isPending) return <div>Loading...</div>;
	if (!session) return <a href="/sign-in">Sign In</a>;

	return (
		<div>
			<span>{session.user.email}</span>
			<button onClick={() => signOut()}>Sign Out</button>
		</div>
	);
}
```

### Sign In

```tsx
"use client";

import { signIn } from "@repo/auth";

export function SignInForm() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		await signIn.email({
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name="email" type="email" required />
			<input name="password" type="password" required />
			<button type="submit">Sign In</button>
		</form>
	);
}
```

### Sign Up

```tsx
"use client";

import { signUp } from "@repo/auth";

export function SignUpForm() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		await signUp.email({
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name="name" type="text" required />
			<input name="email" type="email" required />
			<input name="password" type="password" required />
			<button type="submit">Sign Up</button>
		</form>
	);
}
```

## Proxy Helper (auth-proxy.ts)

The proxy helper uses `getSessionCookie` from `better-auth/cookies` for a lightweight cookie check and redirects unauthenticated users. This is an optimistic redirect — real auth verification happens in Server Actions via `getAuthenticatedSession()`.

```ts
// auth-proxy.ts

import { getSessionCookie } from "better-auth/cookies";
import { PAGE_URLS, PUBLIC_ROUTES } from "@workspace/models";
import { type NextRequest, NextResponse } from "next/server";

export function authProxy(request: NextRequest): NextResponse {
	const { pathname } = request.nextUrl;

	const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
	if (isPublicRoute) {
		return NextResponse.next();
	}

	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		const loginUrl = new URL(PAGE_URLS.LOGIN, request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}
```

## Adding Auth to a Next.js App

### 1. Create the API Route Handler

Create `app/api/auth/[...all]/route.ts` in your Next.js app:

```ts
// apps/web/src/app/api/auth/[...all]/route.ts

import { auth } from "@repo/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

This single catch-all route handles all authentication endpoints (sign-in, sign-up, sign-out, session, etc.).

### 2. Add the Proxy

Create or update `proxy.ts` at the app root. The proxy runs on Node.js runtime and delegates to the `authProxy` helper for lightweight cookie checks:

```ts
// apps/web/proxy.ts

import { authProxy } from "@workspace/auth/auth-proxy";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
	return authProxy(request);
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
```

### 3. Wrap the App with Session Context (Optional)

If you need session data available app-wide, you can use the `useSession` hook in your root layout's client boundary:

```tsx
// apps/web/src/app/layout.tsx

import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
```

The `useSession` hook from `@repo/auth` can be called in any client component without a provider -- better-auth manages the session state internally.

## Environment Variables

Apps using auth need these environment variables:

```env
# .env.local
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate a secret with:

```bash
openssl rand -base64 32
```
