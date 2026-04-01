import dynamic from "next/dynamic";
import { PortfolioFooter } from "./blocks/portfolio-footer";
import { PortfolioHeader } from "./blocks/portfolio-header";
import { PortfolioHero } from "./blocks/portfolio-hero";
import { SparkleTrail } from "./blocks/sparkle-trail";

const PortfolioProjects = dynamic(() => import("./blocks/portfolio-projects").then(m => m.PortfolioProjects));
const PortfolioSkills = dynamic(() => import("./blocks/portfolio-skills").then(m => m.PortfolioSkills));
const PortfolioAbout = dynamic(() => import("./blocks/portfolio-about").then(m => m.PortfolioAbout));

export function PortfolioView() {
	return (
		<div className="portfolio-theme min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
			<PortfolioHeader />
			<main id="main-content">
				<PortfolioHero />
				<PortfolioProjects />
				<PortfolioSkills />
				<PortfolioAbout />
			</main>
			<PortfolioFooter />
			<SparkleTrail count={2} size={2} life={500} speed={0.6} />
		</div>
	);
}
