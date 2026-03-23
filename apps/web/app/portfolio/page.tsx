import { PortfolioView } from "@/features/portfolio/portfolio-view";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
	title: "Serhii Lynnyk — Front-End Engineer",
	description:
		"Front-End Engineer with 10+ years of experience. React/Next.js specialist building scalable, maintainable web applications.",
	openGraph: {
		title: "Serhii Lynnyk — Front-End Engineer",
		description: "Front-End Engineer with 10+ years of experience. React/Next.js specialist.",
		siteName: "Serhii Lynnyk",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Serhii Lynnyk — Front-End Engineer",
		description: "Front-End Engineer with 10+ years of experience. React/Next.js specialist.",
	},
};

export default function PortfolioPage() {
	return <PortfolioView />;
}
