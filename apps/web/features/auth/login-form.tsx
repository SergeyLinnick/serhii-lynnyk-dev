"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginType } from "@workspace/models/client";
import { Button, Input, Label } from "@workspace/ui";
import { useForm } from "react-hook-form";

type LoginFormProps = {
	onSubmit: (data: LoginType) => void;
	isSubmitting?: boolean;
	serverError?: string;
};

export function LoginForm({ onSubmit, isSubmitting, serverError }: LoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: "", password: "" },
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="you@example.com"
					aria-invalid={!!errors.email || undefined}
					{...register("email")}
				/>
				{errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					type="password"
					placeholder="••••••••"
					aria-invalid={!!errors.password || undefined}
					{...register("password")}
				/>
				{errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
			</div>
			{serverError && <p className="text-sm text-destructive">{serverError}</p>}
			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? "Signing in..." : "Sign in"}
			</Button>
		</form>
	);
}
