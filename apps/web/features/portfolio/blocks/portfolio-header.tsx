"use client";

import { Button } from "@workspace/ui/components/base/button";
import { cn } from "@workspace/utils";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND_NAME, NAV_LINKS, RESUME_LABEL, RESUME_PATH } from "../constants/header";
import { useActiveSection } from "../hooks/use-active-section";
import { Container } from "./container";

const MobileNavSheet = dynamic(() => import("./mobile-nav-sheet").then(m => m.MobileNavSheet), { ssr: false });

export function PortfolioHeader() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const activeId = useActiveSection();

	useEffect(() => setMounted(true), []);

	const [firstName, lastName] = BRAND_NAME.split("_");

	const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

	const themeIcon = mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;

	return (
		<Container
			component="header"
			wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
			className="mx-auto max-w-7xl flex items-center justify-between h-16 uppercase"
		>
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-primary focus:font-mono focus:text-sm"
			>
				Skip to main content
			</a>
			<div className="text-xl font-bold font-mono tracking-tighter">
				{firstName}
				<span className="text-primary">_</span>
				{lastName}
			</div>

			<nav
				className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground"
				aria-label="Main navigation"
			>
				{NAV_LINKS.map(link => (
					<Link
						key={link.href}
						href={link.href}
						aria-current={activeId === link.href.replace("#", "") ? "page" : undefined}
						className={cn(
							"hover:text-primary transition-colors",
							activeId === link.href.replace("#", "") && "text-primary",
						)}
					>
						{link.label}
					</Link>
				))}
			</nav>

			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-primary/10 hover:text-primary"
					onClick={toggleTheme}
					aria-label="Toggle theme"
				>
					{themeIcon}
				</Button>
				<Button
					variant="outline"
					className="hidden md:inline-flex font-mono text-xs border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary"
					asChild
				>
					<a href={RESUME_PATH} download>
						{RESUME_LABEL}
					</a>
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden hover:bg-primary/10 hover:text-primary"
					onClick={() => setMobileOpen(true)}
					aria-label="Open navigation menu"
				>
					<Menu className="h-5 w-5" />
				</Button>
			</div>

			<MobileNavSheet
				open={mobileOpen}
				onOpenChange={setMobileOpen}
				activeId={activeId}
				resolvedTheme={resolvedTheme}
				mounted={mounted}
				onToggleTheme={toggleTheme}
			/>
		</Container>
	);
}
