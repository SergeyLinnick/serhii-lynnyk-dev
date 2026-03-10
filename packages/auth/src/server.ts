import { betterAuth } from "better-auth";
export { toNextJsHandler } from "better-auth/next-js";

// Configure your database adapter here when ready.
// Example with Drizzle: import { drizzleAdapter } from "better-auth/adapters/drizzle";
export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
	},
});
