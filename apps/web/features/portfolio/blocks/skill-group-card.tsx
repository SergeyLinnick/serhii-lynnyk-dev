import { cn } from "@workspace/utils";
import { SkillListItem } from "./skill-list-item";

interface SkillGroupCardProps {
	category: string;
	items: string[];
	variant?: "default" | "descriptive";
}

export function SkillGroupCard({ category, items, variant = "default" }: SkillGroupCardProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-xl font-display border-b border-primary/30 pb-2 inline-block">{category}</h3>
			<ul className={cn(variant === "default" ? "space-y-3" : "space-y-2")}>
				{items.map(item => (
					<SkillListItem key={item} text={item} variant={variant} />
				))}
			</ul>
		</div>
	);
}
