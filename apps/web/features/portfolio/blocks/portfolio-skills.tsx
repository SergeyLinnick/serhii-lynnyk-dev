import { SKILL_ICON_BOXES, skills, SKILLS_SECTION } from "../constants";
import { Container } from "./container";
import { IconBox } from "./icon-box";
import { SkillGroupCard } from "./skill-group-card";

export function PortfolioSkills() {
	return (
		<Container
			id="skills"
			component="section"
			wrapperClassName="py-24 bg-secondary/20 border-t border-border"
			className="mx-auto max-w-7xl flex-1"
		>
			<div className="grid md:grid-cols-12 gap-12">
				<div className="md:col-span-4">
					<h2 className="text-4xl font-display tracking-tighter mb-6">{SKILLS_SECTION.heading}</h2>
					<p className="text-muted-foreground mb-8">{SKILLS_SECTION.description}</p>
					<div className="grid grid-cols-2 gap-4">
						{SKILL_ICON_BOXES.map(box => (
							<IconBox key={box.label} icon={box.icon} label={box.label} />
						))}
					</div>
				</div>

				<div className="md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{skills.map(group => (
						<SkillGroupCard key={group.category} category={group.category} items={group.items} />
					))}
				</div>
			</div>
		</Container>
	);
}
