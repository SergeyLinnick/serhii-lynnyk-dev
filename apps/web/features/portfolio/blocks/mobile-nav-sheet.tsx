"use client";

import { Button } from "@workspace/ui/components/base/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@workspace/ui/components/base/sheet";
import { cn } from "@workspace/utils";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS, RESUME_LABEL, RESUME_PATH } from "../constants/header";

interface MobileNavSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	activeId: string | null;
	resolvedTheme: string | undefined;
	mounted: boolean;
	onToggleTheme: () => void;
}

export function MobileNavSheet({
	open,
	onOpenChange,
	activeId,
	resolvedTheme,
	mounted,
	onToggleTheme,
}: MobileNavSheetProps) {
	const themeIcon = mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />;

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="bg-background border-border w-full sm:max-w-sm flex flex-col">
				<SheetHeader>
					<SheetTitle className="font-mono text-sm text-primary uppercase">Navigation</SheetTitle>
				</SheetHeader>

				<nav className="flex flex-col gap-6 mt-8" aria-label="Mobile navigation">
					{NAV_LINKS.map(link => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => onOpenChange(false)}
							aria-current={activeId === link.href.replace("#", "") ? "page" : undefined}
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
						onClick={onToggleTheme}
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
	);
}
