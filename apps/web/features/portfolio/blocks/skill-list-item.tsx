import { cn } from "@workspace/utils";

interface SkillListItemProps {
	text: string;
	variant?: "default" | "descriptive" | "compact";
}

export function SkillListItem({ text, variant = "default" }: SkillListItemProps) {
	if (variant === "compact") {
		return (
			<li className="group">
				<span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
					{text}
				</span>
			</li>
		);
	}

	const line = (
		<div
			aria-hidden="true"
			className={cn(
				"bg-secondary group-hover:bg-primary transition-colors h-[2px]",
				variant === "default" ? "w-12" : "w-6 mt-2.5 shrink-0",
			)}
		/>
	);

	return (
		<li
			className={cn(
				"group",
				variant === "default" ? "flex items-center justify-between" : "flex items-start gap-3",
			)}
		>
			{variant === "descriptive" && line}
			<span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">
				{text}
			</span>
			{variant === "default" && line}
		</li>
	);
}
