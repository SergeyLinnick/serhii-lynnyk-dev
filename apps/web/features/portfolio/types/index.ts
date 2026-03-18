import type { ComponentType } from "react";

export interface Project {
	title: string;
	role: string;
	company: string;
	period: string;
	projectOverview: string;
	responsibilities: string[];
	tags: string[];
	featured?: boolean;
}

export interface SkillGroup {
	category: string;
	items: string[];
}

export interface NavLink {
	label: string;
	href: string;
}

export interface SocialLink {
	icon: ComponentType<{ className?: string }>;
	href: string;
	label: string;
	deepLinkScheme?: string;
}

export interface IconBoxItem {
	icon: ComponentType<{ className?: string }>;
	label: string;
}

export interface StatusPanelItem {
	label: string;
	value: string;
	progress?: number;
}

export interface HeroContent {
	statusBadge: string;
	headingLines: string[];
	headingAccent: string;
	description: string;
	ctaLabel: string;
	ctaHref: string;
}

export interface SectionContent {
	heading: string;
	description?: string;
}

export interface EducationEntry {
	degree: string;
	school: string;
}
