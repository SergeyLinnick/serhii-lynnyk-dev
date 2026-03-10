import Link from "next/link";
import { COPYRIGHT_TEXT, SOCIAL_LINKS } from "../constants";
import { Container } from "./container";

export function PortfolioFooter() {
	return (
		<Container
			component="footer"
			className="py-8 border-t border-border bg-background text-center max-w-7xl mx-auto"
		>
			<div className="flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="text-xs font-mono text-muted-foreground">{COPYRIGHT_TEXT}</div>
				<div className="flex gap-6 text-xs font-mono text-muted-foreground">
					{SOCIAL_LINKS.map(link => (
						<Link
							key={link.label}
							href={link.href}
							aria-label={link.label}
							{...(!link.href.startsWith("mailto:") && { target: "_blank", rel: "noopener noreferrer" })}
							className="hover:text-primary transition-colors"
						>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</Container>
	);
}
