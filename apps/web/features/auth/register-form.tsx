"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, type RegisterFormType } from "@workspace/models";
import { Button, Input, Label } from "@workspace/ui";
import { useForm } from "react-hook-form";

type RegisterFormProps = {
	onSubmit: (data: RegisterFormType) => void;
	isSubmitting?: boolean;
	serverError?: string;
};

export function RegisterForm({ onSubmit, isSubmitting, serverError }: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormType>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					type="text"
					placeholder="John Doe"
					aria-invalid={!!errors.name || undefined}
					{...register("name")}
				/>
				{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
			</div>
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
			<div className="flex flex-col gap-2">
				<Label htmlFor="confirmPassword">Confirm password</Label>
				<Input
					id="confirmPassword"
					type="password"
					placeholder="••••••••"
					aria-invalid={!!errors.confirmPassword || undefined}
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
			</div>
			{serverError && <p className="text-sm text-destructive">{serverError}</p>}
			<Button type="submit" disabled={isSubmitting} className="w-full">
				{isSubmitting ? "Creating account..." : "Create account"}
			</Button>
		</form>
	);
}
