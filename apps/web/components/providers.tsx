"use client";

import { ApiProvider } from "@workspace/api";
import { Toaster } from "@workspace/ui";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ApiProvider>
			{children}
			<Toaster position="top-center" richColors />
		</ApiProvider>
	);
}
