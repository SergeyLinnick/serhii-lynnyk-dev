"use client";

import { Button } from "@workspace/ui";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4">
			<h1 className="text-2xl font-bold">Something went wrong</h1>
			<p className="text-muted-foreground">{error.message}</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	);
}
