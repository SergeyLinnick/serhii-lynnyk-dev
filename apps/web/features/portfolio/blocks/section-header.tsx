import { cn } from "@workspace/utils";

interface SectionHeaderProps {
	heading: string;
	description?: string;
	className?: string;
	headingClassName?: string;
}

export function SectionHeader({ heading, description, className, headingClassName }: SectionHeaderProps) {
	return (
		<div className={cn("grid gap-4", className)}>
			<div>
				<h2
					className={cn(
						"text-4xl md:text-6xl font-display tracking-tighter mb-4 whitespace-pre-line",
						headingClassName,
					)}
				>
					{heading}
				</h2>
				<div className="h-1 w-24 bg-primary" aria-hidden="true" />
			</div>
			{description && <p className="text-muted-foreground max-w-sm text-left">{description}</p>}
		</div>
	);
}
