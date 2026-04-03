"use client";

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "@workspace/ui";
import { lazy, Suspense, useState, type ReactNode } from "react";

const ReactQueryDevtools =
	process.env.NODE_ENV === "development"
		? lazy(() => import("@tanstack/react-query-devtools").then(m => ({ default: m.ReactQueryDevtools })))
		: () => null;

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				retry: (failureCount, error) => {
					if (error instanceof Error && error.message === "Unauthorized") return false;
					return failureCount < 3;
				},
			},
		},
		mutationCache: new MutationCache({
			onError: error => {
				toast.error(error.message ?? "Something went wrong");
			},
		}),
		queryCache: new QueryCache({
			onError: error => {
				toast.error(error.message ?? "Failed to fetch data");
			},
		}),
	});
}

export function ApiProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(makeQueryClient);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<Suspense>
				<ReactQueryDevtools initialIsOpen={false} />
			</Suspense>
		</QueryClientProvider>
	);
}
