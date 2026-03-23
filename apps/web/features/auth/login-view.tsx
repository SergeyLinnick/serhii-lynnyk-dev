"use client";

import { signIn } from "@workspace/auth/client";
import { PAGE_URLS, type LoginType } from "@workspace/models";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "./login-form";

export function LoginView() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [serverError, setServerError] = useState<string | undefined>();

	async function handleSubmit(data: LoginType) {
		setIsSubmitting(true);
		setServerError(undefined);
		const { error } = await signIn.email(data);
		if (error) {
			setServerError("Invalid email or password");
		} else {
			router.push(PAGE_URLS.DASHBOARD);
		}
		setIsSubmitting(false);
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Sign in</CardTitle>
					<CardDescription>Enter your credentials to access your account</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} serverError={serverError} />
					<Button variant="ghost" className="w-full" onClick={() => router.push(PAGE_URLS.REGISTER)}>
						Don&apos;t have an account? Register
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
