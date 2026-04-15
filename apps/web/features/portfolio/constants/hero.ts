import type { HeroContent, StatusPanelItem } from "../types";

export const HERO_CONTENT: HeroContent = {
	statusBadge: "SYSTEM ONLINE // AVAILABLE FOR HIRE",
	headingLines: ["FRONT", "END"],
	headingAccent: "Engineer",
	description:
		"Architecting React/Next.js ecosystems with type-safe contracts, design systems, and monorepo-based platforms — with 10+ years of experience building scalable and maintainable web applications.",
	ctaLabel: "View experience",
	ctaHref: "#projects",
};

export const STATUS_PANEL_TOP: StatusPanelItem[] = [
	{ label: "System Status", value: "NORMAL" },
	{ label: "Uptime", value: "99.9%" },
];

export const STATUS_PANEL_METRICS: StatusPanelItem[] = [
	{ label: "Years of Experience", value: "10+", progress: 100 },
	{ label: "FE Stack Coverage", value: "100%", progress: 100 },
	{ label: "Tech Stack Items", value: "30+", progress: 100 },
	{ label: "Enterprise Apps Built", value: "04", progress: 100 },
	{ label: "Languages", value: "04", progress: 100 },
];

export const STATUS_PANEL_HIGHLIGHT: StatusPanelItem = {
	label: "Work Roles",
	value: "05",
};
