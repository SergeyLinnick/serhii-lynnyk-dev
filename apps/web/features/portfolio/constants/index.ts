import { Bot, Code2, Cpu, Github, Linkedin, Mail, ShieldCheck } from "lucide-react";
import type {
	EducationEntry,
	HeroContent,
	IconBoxItem,
	NavLink,
	Project,
	SectionContent,
	SkillGroup,
	SocialLink,
	StatusPanelItem,
} from "../types";

// header

export const BRAND_NAME = "Serhii_Lynnyk";
export const RESUME_PATH = "/portfolio/Serhii_Lynnyk_FE_Engineer.pdf";
export const RESUME_LABEL = "Download CV";

export const NAV_LINKS: NavLink[] = [
	{ label: "Experience", href: "#projects" },
	{ label: "Skills", href: "#skills" },
	{ label: "About", href: "#about" },
];

// social shared by Hero + Footer

export const SOCIAL_LINKS: SocialLink[] = [
	{ icon: Github, href: "https://github.com/SergeyLinnick", label: "GITHUB" },
	{ icon: Linkedin, href: "https://www.linkedin.com/in/sergeylinnick/", label: "LINKEDIN" },
	{ icon: Mail, href: "mailto:serhiilynnyk@duck.com", label: "EMAIL" },
];

// hero

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

// projects

export const PROJECTS_SECTION: SectionContent = {
	heading: "WORK\nEXPERIENCE",
	description: "A decade of building enterprise-grade web applications and scalable front-end architectures.",
};

export const projects: Project[] = [
	{
		title: "Wrangler.AI Platform",
		role: "Senior Front-End Engineer",
		company: "GentleCode",
		period: "2025 – Present",
		featured: true,
		projectOverview:
			"A next-generation Field Service Platform built to eliminate operational friction for businesses with 10+ field technicians. The platform serves as a connective layer over existing FSM, HR, and accounting systems to streamline fleet management, compliance tracking, and daily operations.",
		responsibilities: [
			"Led the full lifecycle of complex enterprise features — from requirements clarification and architecture design to implementation, testing, and production rollout.",
			"Architected and maintained a scalable PNPM + Turborepo monorepo (Next.js applications + shared packages), improving code reuse, type-safety, and cross-team consistency.",
			"Designed and implemented advanced UI systems using React, Tailwind, Shadcn, Radix, React Aria, React Query, and custom hooks — delivering accessible, performant, and maintainable user interfaces for complex enterprise workflows.",
			"Integrated AI-powered engineering workflows using Cursor and Claude.ai, type-safe contract generation, architectural guidance, and large-scale code refactoring support.",
			"Developed custom MCP tooling enabling reliable Swagger analysis, schema resolution, and automated scaffolding of API layers (contracts → services → queries), significantly improving development velocity and accuracy.",
			"Enhanced team productivity through AI-assisted reviews.",
			"Collaborated effectively across the entire delivery chain — clarifying requirements with Product/BA, coordinating implementation with BE/FE teams, and working closely with QA to ensure high-quality releases.",
		],
		tags: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind",
			"Radix UI",
			"Shadcn UI",
			"React Aria",
			"TanStack Query",
			"TanStack Table",
			"Zod",
			"React Hook Form",
			"dnd-kit",
			"Testing Library",
			"Jest",
			"Vitest",
			"Storybook",
			"Turborepo",
			"PNPM",
			"Monorepo",
			"NextAuth.js",
			"Zitadel OIDC",
			"next-intl",
			"MCP",
			"Claude Code",
			"AI-powered",
		],
	},
	{
		title: "FinTech CRM Solution",
		role: "Front-End Engineer",
		company: "GentleCode",
		period: "2020 – 2025",
		projectOverview:
			"A comprehensive FinTech and CRM platform built to protect margins and drive new revenue streams for software vendors and high-volume merchants. The system serves as a connective layer over existing payment, invoicing, and customer management tools to streamline the checkout experience, API integrations, and daily financial operations.",
		responsibilities: [
			"Developed and maintained high-performance front-end applications using React.js and TypeScript in a complex FinTech domain.",
			"Built reusable component library and custom hooks to ensure consistency, scalability, and faster feature delivery.",
			"Work closely with back-end developers to integrate with RESTful APIs, ensuring seamless communication between the front end and back end. Implement secure authentication and authorization mechanisms using protocols such as OAuth, JWT, and SSO.",
			"Translated Figma designs into pixel-perfect, responsive UI components with strong focus on UX and accessibility.",
			"Optimized applications for cross-browser compatibility and multi-device responsiveness.",
			"Developed and documented UI components in Storybook, improving visibility, testing workflows, and cross-team adoption.",
			"Participate in code reviews, share knowledge, and collaborate in a fast-paced, agile development environment.",
		],
		tags: [
			"React",
			"TypeScript",
			"Redux",
			"React Query",
			"React Hook Form",
			"React Router",
			"REST",
			"Axios",
			"Bootstrap",
			"SASS",
			"React Table",
			"React Select",
			"Google Maps",
			"Testing Library",
			"Storybook",
			"ESLint",
			"Prettier",
		],
	},
	{
		title: "CRM Solution",
		role: "Front-End Engineer",
		company: "GentleCode",
		period: "2019 – 2020",
		projectOverview:
			"A comprehensive mobility and dispatch ecosystem built to automate end-to-end logistics and real-time fleet coordination for global transportation providers. The platform serves as a unified operational layer over fragmented booking and payment systems to streamline driver-passenger interactions, affiliate networking, and cross-border scheduling.",
		responsibilities: [
			"Created a customizable, theme-able UI component library using React and styled-components, enabling developers to easily integrate consistent design patterns across various applications.",
			"Implemented responsive design strategies to ensure UI components performed well on mobile, tablet, and desktop devices.",
			"Developed and documented UI components in Storybook, allowing for easy testing, demonstration, and adoption by developers across the team.",
			"Contributed to the design system of the company, collaborating closely with the UX team to ensure a cohesive visual identity and user experience.",
		],
		tags: [
			"React",
			"TypeScript",
			"GraphQL",
			"styled-components",
			"CSS-in-JS",
			"Storybook",
			"PWA",
			"Snapshot Testing",
			"Testing Library",
			"ESLint",
			"Prettier",
			"Design System",
			"Mobile-first",
		],
	},
	{
		title: "Dispatch CRM Solution",
		role: "Front-End Engineer",
		company: "GentleCode",
		period: "2016 – 2019",
		projectOverview:
			"A large-scale ASP Classic/.NET dispatch platform serving the livery industry — managing real-time dispatch grids, reservation scheduling, GPS tracking, driver and fleet management, and white-labeled passenger booking experiences across operator, driver, and passenger-facing applications.",
		responsibilities: [
			"Maintained and extended a large-scale legacy ASP Classic/.NET dispatch platform serving livery and transportation businesses, working across operator, driver, and passenger-facing applications.",
			"Rebuilt legacy HTML components and UI modules from the ASP Classic codebase into modern, reusable React components as part of an incremental front-end migration strategy.",
			"Developed and maintained features for the core web-based dispatch console, including a live customizable dispatch grid, reservation management, automated scheduling, and integrated billing interfaces.",
			"Built UI for the operator mobile experience, enabling dispatchers to book reservations, dispatch jobs, manage billing, and perform batch updates on the go.",
			"Contributed to the driver-facing application features — ride management, real-time status updates, digital greeting signs for airport pickups, and dispatcher messaging interfaces.",
			"Implemented front-end features for the white-labeled passenger web app (PWA), including live booking, real-time driver tracking with GPS, ETA displays, and custom branding support.",
			"Redesigned styles and layouts for legacy UI elements, improving visual consistency across the platform.",
			"Supported the migration of legacy UI elements to a modern, modular design system built with React and styled-components.",
			"Assisted in the optimization of web applications for maximum speed and scalability across desktop and mobile devices.",
			"Collaborated closely with the UX team on the company design system to ensure a cohesive visual identity and user experience across all platform applications.",
		],
		tags: [
			"JavaScript",
			"HTML5",
			"CSS3",
			"jQuery",
			"ASP Classic",
			"Responsive Design",
			"Adaptive Design",
			"Legacy Migration",
			"Redesign",
		],
	},
	{
		title: "Freelance Projects",
		role: "Front-End Engineer",
		company: "Freelance",
		period: "2015 – 2016",
		projectOverview:
			"A collection of client projects spanning responsive marketing websites, HTML email campaign templates, and custom WordPress themes — delivering pixel-perfect, mobile-friendly web experiences across diverse industries.",
		responsibilities: [
			"Created clean, semantic HTML5 and CSS3 markup for web pages and UI components, ensuring adherence to design specifications and project requirements.",
			"Implemented pixel-perfect designs using CSS, ensuring consistency in layout, typography, and overall styling.",
			"Built responsive layouts using floats and media queries to ensure seamless experiences across various devices.",
			"Optimized HTML/CSS code for faster loading times and improved SEO performance by following best practices in markup structure.",
			"Created responsive, mobile-friendly email designs using inline CSS and table-based layouts, ensuring consistent rendering across all devices and email clients.",
			"Designed and optimized HTML email templates for marketing campaigns, ensuring cross-browser and email-client compatibility.",
			"Created custom WordPress themes and layouts, ensuring seamless integration of design elements with dynamic content.",
			"Developed responsive WordPress templates using PHP, HTML5, CSS3, and JavaScript to meet client-specific needs.",
			"Integrated jQuery plug-ins and widgets to enhance functionality while maintaining the integrity of the overall layout.",
		],
		tags: [
			"HTML",
			"CSS",
			"JavaScript",
			"jQuery",
			"WordPress",
			"Adaptive Design",
			"W3C Validator",
			"SEO",
			"Semantic HTML",
			"Accessibility",
		],
	},
];

// skills

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

// about

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

// footer

export const COPYRIGHT_TEXT = "\u00A9 2026 SERHII LYNNYK. ALL RIGHTS RESERVED.";
