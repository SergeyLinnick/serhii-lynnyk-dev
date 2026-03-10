"use client";

import { PAGE_URLS } from "@workspace/models";
import { Button, cn } from "@workspace/ui";
import { CheckSquare, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navItems = [
	{ label: "Dashboard", href: PAGE_URLS.DASHBOARD, icon: LayoutDashboard },
	{ label: "Tasks", href: PAGE_URLS.TASKS, icon: CheckSquare },
];

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="flex min-h-screen">
			<aside className="flex w-64 flex-col border-r bg-sidebar-background">
				<div className="flex h-14 items-center border-b px-4">
					<Link href={PAGE_URLS.DASHBOARD} className="text-lg font-semibold">
						Starter
					</Link>
				</div>
				<nav className="flex flex-1 flex-col gap-1 p-3">
					{navItems.map(item => {
						const isActive = pathname.startsWith(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
									isActive
										? "bg-sidebar-accent text-sidebar-accent-foreground"
										: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
								)}
							>
								<item.icon className="h-4 w-4" />
								{item.label}
							</Link>
						);
					})}
				</nav>
				<div className="border-t p-3">
					<Button variant="ghost" size="sm" className="w-full justify-start gap-3">
						<LogOut className="h-4 w-4" />
						Sign out
					</Button>
				</div>
			</aside>
			<main className="flex-1 overflow-auto p-6">{children}</main>
		</div>
	);
}
