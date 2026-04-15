import { Mail } from "lucide-react";
import { GithubIcon } from "../blocks/github-icon";
import { LinkedinIcon } from "../blocks/linkedin-icon";
import type { SocialLink } from "../types";

export const SOCIAL_LINKS: SocialLink[] = [
	{
		icon: GithubIcon,
		href: "https://github.com/SergeyLinnick",
		label: "GITHUB",
		deepLinkScheme: "github://github.com/SergeyLinnick",
	},
	{
		icon: LinkedinIcon,
		href: "https://www.linkedin.com/in/sergeylinnick/",
		label: "LINKEDIN",
		deepLinkScheme: "linkedin://in/sergeylinnick/",
	},
	{ icon: Mail, href: "mailto:serhiilynnyk@duck.com", label: "EMAIL" },
];
