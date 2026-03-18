import type { ComponentType } from "react";

interface IconBoxProps {
	icon: ComponentType<{ className?: string }>;
	label: string;
}

export function IconBox({ icon: Icon, label }: IconBoxProps) {
	return (
		<div className="p-4 border border-border bg-background flex flex-col items-center justify-center aspect-square hover:border-primary transition-colors">
			<Icon className="h-8 w-8 mb-2 text-primary" aria-hidden="true" />
			<span className="font-mono text-xs">{label}</span>
		</div>
	);
}
