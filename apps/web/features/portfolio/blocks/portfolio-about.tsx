import { Activity, GraduationCap, Languages } from "lucide-react";
import Image from "next/image";
import { ABOUT_SECTION, activities, EDUCATION, languages, softSkills } from "../constants";
import { Container } from "./container";
import { SkillGroupCard } from "./skill-group-card";

export function PortfolioAbout() {
	return (
		<Container
			id="about"
			wrapperClassName="relative py-24 border-t border-border overflow-hidden"
			className="mx-auto max-w-7xl"
		>
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 overflow-hidden">
					<Image
						src="/portfolio/bg-with-me.png"
						alt=""
						fill
						sizes="100vw"
						className="object-cover object-center"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/70 to-background/50" />
			</div>

			<div className="relative z-10">
				<h2 className="text-4xl font-display mb-12 uppercase">{ABOUT_SECTION.heading}</h2>

				<div className="grid md:grid-cols-[3fr_2fr] gap-8">
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
						<div className="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-4">
							<div className="flex items-center gap-3">
								<GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
								<h3 className="text-xl font-display">Education</h3>
							</div>
							<div className="space-y-1">
								<p className="font-mono text-sm text-foreground">{EDUCATION.degree}</p>
								<p className="font-mono text-xs text-muted-foreground">{EDUCATION.school}</p>
							</div>
						</div>

						<div className="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-4">
							<div className="flex items-center gap-3">
								<Languages className="h-5 w-5 text-primary" aria-hidden="true" />
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

						<div className="p-6 border border-white/5 bg-white/[0.02] backdrop-blur-sm space-y-4">
							<div className="flex items-center gap-3">
								<Activity className="h-5 w-5 text-primary" aria-hidden="true" />
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
			</div>
		</Container>
	);
}
