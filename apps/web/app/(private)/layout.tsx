import type { ReactNode } from "react";
import { Sidebar } from "./_components/sidebar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen">
			<Sidebar />
			<main className="flex-1 overflow-auto p-6">{children}</main>
		</div>
	);
}
