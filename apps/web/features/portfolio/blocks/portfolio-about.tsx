import { Activity, GraduationCap, Languages } from "lucide-react";
import { ABOUT_SECTION, activities, EDUCATION, languages, softSkills } from "../constants";
import { Container } from "./container";
import { SkillGroupCard } from "./skill-group-card";

export function PortfolioAbout() {
	return (
		<Container id="about" className="py-24 border-t border-border max-w-7xl mx-auto">
			<h2 className="text-4xl font-display mb-12 uppercase">{ABOUT_SECTION.heading}</h2>

			<div className="grid md:grid-cols-2 gap-12">
				<div className="grid gap-8">
					{softSkills.map(group => (
						<SkillGroupCard
							key={group.category}
							category={group.category}
							items={group.items}
							variant="descriptive"
						/>
					))}
				</div>

				<div className="space-y-8">
					<div className="p-6 border border-border bg-card space-y-4">
						<div className="flex items-center gap-3">
							<GraduationCap className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-display">Education</h3>
						</div>
						<div className="space-y-1">
							<p className="font-mono text-sm text-foreground">{EDUCATION.degree}</p>
							<p className="font-mono text-xs text-muted-foreground">{EDUCATION.school}</p>
						</div>
					</div>

					<div className="p-6 border border-border bg-card space-y-4">
						<div className="flex items-center gap-3">
							<Languages className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-display">Languages</h3>
						</div>
						<div className="flex flex-wrap gap-3">
							{languages.map(lang => (
								<span
									key={lang}
									className="px-3 py-1 border border-primary/30 bg-primary/5 text-sm font-mono text-foreground"
								>
									{lang}
								</span>
							))}
						</div>
					</div>

					<div className="p-6 border border-border bg-card space-y-4">
						<div className="flex items-center gap-3">
							<Activity className="h-5 w-5 text-primary" />
							<h3 className="text-xl font-display">Activities</h3>
						</div>
						<div className="flex flex-wrap gap-3">
							{activities.map(item => (
								<span
									key={item}
									className="px-3 py-1 border border-primary/30 bg-primary/5 text-sm font-mono text-foreground"
								>
									{item}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
