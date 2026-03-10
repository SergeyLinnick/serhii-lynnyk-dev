# Auth Package

The `@repo/auth` package provides authentication using [better-auth](https://www.better-auth.com/). It exposes server configuration, client hooks, and middleware helpers that apps consume.

## Structure

```
packages/auth/src/
├── server.ts                   # better-auth server configuration
├── client.ts                   # Client-side auth hooks
├── middleware.ts               # Middleware helper for route protection
└── index.ts                    # Public barrel export
```

## Server Configuration (server.ts)

The server config initializes better-auth with email and password authentication.

```ts
// server.ts

import { betterAuth } from "better-auth";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	// Add database adapter when ready:
	// database: drizzle(db),
	//
	// Add social providers as needed:
	// socialProviders: {
	//   google: {
	//     clientId: process.env.GOOGLE_CLIENT_ID!,
	//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	//   },
	// },
});
```

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

## Middleware Helper (middleware.ts)

The middleware helper checks for a valid session cookie and redirects unauthenticated users.

```ts
// middleware.ts

import { type NextRequest, NextResponse } from "next/server";
import { auth } from "./server";

export async function authMiddleware(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
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

### 2. Add the Middleware

Create or update `middleware.ts` at the app root:

```ts
// apps/web/middleware.ts

import { authMiddleware } from "@repo/auth";
import { type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/orders", "/settings"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Check if the route is protected
	const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

	if (isProtected) {
		return authMiddleware(request);
	}
}

export const config = {
	matcher: ["/dashboard/:path*", "/orders/:path*", "/settings/:path*"],
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
