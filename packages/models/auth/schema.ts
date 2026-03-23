import { z } from "zod";

export const RegisterSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
});

export const RegisterFormSchema = RegisterSchema.extend({
	confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
	message: "Passwords do not match",
	path: ["confirmPassword"],
});

export const LoginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});
