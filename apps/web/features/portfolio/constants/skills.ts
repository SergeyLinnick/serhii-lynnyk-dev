import { Bot, Code2, Cpu, ShieldCheck } from "lucide-react";
import type { IconBoxItem, SectionContent, SkillGroup } from "../types";

export const SKILLS_SECTION: SectionContent = {
	heading: "TECH_STACK",
	description: "My preferred weapons of choice for building digital products. Always learning, always evolving.",
};

export const SKILL_ICON_BOXES: IconBoxItem[] = [
	{ icon: Code2, label: "CLEAN_CODE" },
	{ icon: ShieldCheck, label: "TYPE_SAFETY" },
	{ icon: Cpu, label: "PERFORMANCE" },
	{ icon: Bot, label: "AI_TOOLING" },
];

export const skills: SkillGroup[] = [
	{
		category: "Frontend",
		items: ["React", "Next.js", "TypeScript", "JavaScript (ES2020+)", "React Hook Form + Zod", "Zustand", "Redux"],
	},
	{
		category: "UI & Design",
		items: [
			"Tailwind CSS",
			"Shadcn UI",
			"Radix UI",
			"React Aria",
			"CSS Modules",
			"styled-components",
			"Web Accessibility (a11y)",
		],
	},
	{
		category: "Data & State",
		items: [
			"TanStack Query",
			"TanStack Table",
			"Optimistic Updates",
			"Caching Strategies",
			"Pagination & Infinite",
			"Prefetching & Refetching",
			"API Integration Patterns",
		],
	},
	{
		category: "Architecture",
		items: [
			"Feature-Sliced Design",
			"PNPM Workspaces",
			"Turborepo",
			"Monorepo Design",
			"Contract-Driven API Layers",
		],
	},
	{
		category: "Backend & APIs",
		items: ["NextAuth (JWT)", "OAuth 2.0", "REST", "GraphQL", "Swagger / OpenAPI"],
	},
	{
		category: "Testing & QA",
		items: ["Vitest", "Jest", "React Testing Library", "Storybook", "Chromatic"],
	},
];
