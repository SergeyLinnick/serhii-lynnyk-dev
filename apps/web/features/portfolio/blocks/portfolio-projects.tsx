import { projects, PROJECTS_SECTION } from "../constants";
import { Container } from "./container";
import { ProjectCard } from "./project-card";
import { SectionHeader } from "./section-header";

export function PortfolioProjects() {
	return (
		<Container
			id="projects"
			component="section"
			wrapperClassName="py-24 border-t border-border"
			className="mx-auto max-w-7xl flex-1"
		>
			<SectionHeader
				heading={PROJECTS_SECTION.heading}
				description={PROJECTS_SECTION.description}
				className="justify-between items-end mb-16"
				headingClassName="md:text-6xl tracking-tighter"
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{projects.map((project, index) => (
					<ProjectCard key={project.title} project={project} index={index} />
				))}
			</div>
		</Container>
	);
}
