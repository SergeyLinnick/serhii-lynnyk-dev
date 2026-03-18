import { PortfolioAbout } from "./blocks/portfolio-about";
import { PortfolioFooter } from "./blocks/portfolio-footer";
import { PortfolioHeader } from "./blocks/portfolio-header";
import { PortfolioHero } from "./blocks/portfolio-hero";
import { PortfolioProjects } from "./blocks/portfolio-projects";
import { PortfolioSkills } from "./blocks/portfolio-skills";

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
		</div>
	);
}
