"use client";

import { signIn } from "@workspace/auth/client";
import { PAGE_URLS } from "@workspace/models";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, toast } from "@workspace/ui";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setIsLoading(true);

		try {
			await signIn.email({ email, password });
			router.push(PAGE_URLS.DASHBOARD);
		} catch {
			toast.error("Invalid email or password");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Sign in</CardTitle>
					<CardDescription>Enter your credentials to access your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" disabled={isLoading} className="w-full">
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
