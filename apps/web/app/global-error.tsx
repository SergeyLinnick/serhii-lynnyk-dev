"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html>
			<body>
				<div
					style={{
						display: "flex",
						minHeight: "100vh",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "1rem",
					}}
				>
					<h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Something went wrong</h1>
					<p style={{ color: "#666" }}>{error.message}</p>
					<button
						onClick={reset}
						style={{
							padding: "0.5rem 1rem",
							borderRadius: "0.375rem",
							backgroundColor: "#000",
							color: "#fff",
							border: "none",
							cursor: "pointer",
						}}
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	);
}
