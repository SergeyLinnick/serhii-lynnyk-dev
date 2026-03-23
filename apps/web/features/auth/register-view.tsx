"use client";

import { signUp } from "@workspace/auth/client";
import { PAGE_URLS, type RegisterFormType } from "@workspace/models";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterForm } from "./register-form";

export function RegisterView() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [serverError, setServerError] = useState<string | undefined>();

	async function handleSubmit(data: RegisterFormType) {
		setIsSubmitting(true);
		setServerError(undefined);
		const { error } = await signUp.email({ name: data.name, email: data.email, password: data.password });
		if (error) {
			setServerError(error.message ?? "Failed to create account. Please try again.");
		} else {
			router.push(PAGE_URLS.DASHBOARD);
		}
		setIsSubmitting(false);
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Create account</CardTitle>
					<CardDescription>Enter your details to get started</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<RegisterForm onSubmit={handleSubmit} isSubmitting={isSubmitting} serverError={serverError} />
					<Button variant="ghost" className="w-full" onClick={() => router.push(PAGE_URLS.LOGIN)}>
						Already have an account? Sign in
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
