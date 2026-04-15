import type { EducationEntry, SectionContent, SkillGroup } from "../types";

export const ABOUT_SECTION: SectionContent = {
	heading: "About_Me",
	description:
		"Senior Frontend Engineer with 10+ years of experience building scalable web platforms and complex SaaS products.\n\nFocused on frontend architecture, cross-team delivery, and AI-augmented engineering workflows.",
};

export const softSkills: SkillGroup[] = [
	{
		category: "Ownership",
		items: [
			"Taking ownership of features from product idea to production delivery",
			"Ensuring technical quality, scalability, and long-term maintainability",
		],
	},
	{
		category: "Leadership",
		items: [
			"Leading implementation across the full product lifecycle — from discovery to production",
			"Translating business goals into scalable frontend architecture",
		],
	},
	{
		category: "Collaboration",
		items: [
			"Driving cross-functional collaboration across Engineering, QA, and Product",
			"Aligning technical execution across the full delivery lifecycle",
		],
	},
	{
		category: "AI Engineering",
		items: [
			"AI-augmented engineering workflows integrating LLMs into the development lifecycle",
			"Building custom MCP tooling to accelerate development and architectural exploration",
		],
	},
];

export const languages: string[] = ["English", "Ukrainian", "Russian", "Polish"];

export const EDUCATION: EducationEntry = {
	degree: "Master's Degree in Construction Engineering",
	school: "Ukrainian National Academy of Railway Transport, Kharkiv, Ukraine",
};

export const activities: string[] = ["Running", "Football", "Hiking", "Travel"];
