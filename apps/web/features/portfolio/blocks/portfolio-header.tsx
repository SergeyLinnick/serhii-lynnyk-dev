"use client";

import { Button, Sheet, SheetContent, SheetHeader, SheetTitle } from "@workspace/ui";
import { cn } from "@workspace/utils";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND_NAME, NAV_LINKS, RESUME_LABEL, RESUME_PATH } from "../constants";
import { useActiveSection } from "../hooks/use-active-section";
import { Container } from "./container";

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

			<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
				<SheetContent side="right" className="bg-background border-border w-full sm:max-w-sm flex flex-col">
					<SheetHeader>
						<SheetTitle className="font-mono text-sm text-primary uppercase">Navigation</SheetTitle>
					</SheetHeader>

					<nav className="flex flex-col gap-6 mt-8" aria-label="Mobile navigation">
						{NAV_LINKS.map(link => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setMobileOpen(false)}
								className={cn(
									"text-lg font-display uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors",
									activeId === link.href.replace("#", "") && "text-primary",
								)}
							>
								{link.label}
							</Link>
						))}
					</nav>

					<div className="mt-auto pt-8 flex flex-col gap-4 border-t border-border">
						<Button
							variant="ghost"
							className="justify-start gap-3 hover:bg-primary/10 hover:text-primary"
							onClick={toggleTheme}
							aria-label="Toggle theme"
						>
							{themeIcon}
							<span className="font-mono text-xs uppercase">
								{mounted && resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
							</span>
						</Button>
						<Button
							variant="outline"
							className="font-mono text-xs border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary"
							asChild
						>
							<a href={RESUME_PATH} download>
								{RESUME_LABEL}
							</a>
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</Container>
	);
}
