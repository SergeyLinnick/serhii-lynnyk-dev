"use client";

import { Badge } from "@workspace/ui/components/base/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/base/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/base/collapsible";
import { cn } from "@workspace/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Project } from "../types";
import { SkillListItem } from "./skill-list-item";

const VISIBLE_TAGS = 5;
const VISIBLE_RESPONSIBILITIES = 3;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
	const [open, setOpen] = useState(false);
	const [tagsOpen, setTagsOpen] = useState(false);

	const hasMoreTags = project.tags.length > VISIBLE_TAGS;
	const visibleTags = tagsOpen ? project.tags : project.tags.slice(0, VISIBLE_TAGS);
	const hiddenTagsCount = project.tags.length - VISIBLE_TAGS;

	const hasMore = project.responsibilities.length > VISIBLE_RESPONSIBILITIES;
	const visibleItems = project.responsibilities.slice(0, VISIBLE_RESPONSIBILITIES);
	const hiddenItems = project.responsibilities.slice(VISIBLE_RESPONSIBILITIES);

	return (
		<Card
			className={cn(
				"group transition-all duration-300 rounded-lg overflow-hidden",
				project.featured
					? "bg-primary/5 border-primary/30 hover:border-primary/50"
					: "bg-card border-border hover:border-primary/50",
			)}
		>
			<div className="grid gap-4">
				<CardHeader className="relative grid gap-4">
					<span
						className="absolute top-4 right-6 text-4xl font-bold text-muted-foreground/30 font-mono leading-none"
						aria-hidden="true"
					>
						{String(index + 1).padStart(2, "0")}
					</span>
					<div className="space-y-1">
						<div className="font-mono text-xs text-primary">
							{project.role} | {project.company}
						</div>
						<CardTitle className="text-2xl font-display group-hover:text-primary transition-colors">
							{project.title}
						</CardTitle>
						<div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
							<span>{project.period}</span>
							{project.featured && (
								<Badge
									variant="outline"
									className="font-mono text-[10px] text-primary border-primary/30 px-1.5 py-0"
								>
									CURRENT
								</Badge>
							)}
						</div>
					</div>
					<div className="flex flex-wrap gap-2">
						{visibleTags.map(tag => (
							<Badge key={tag} variant="secondary" className="font-mono text-xs">
								{tag}
							</Badge>
						))}
						{hasMoreTags && (
							<button
								type="button"
								className="inline-flex"
								aria-expanded={tagsOpen}
								aria-label={tagsOpen ? "Show fewer tags" : `Show ${hiddenTagsCount} more tags`}
								onClick={() => setTagsOpen(!tagsOpen)}
							>
								<Badge
									variant="outline"
									className="font-mono text-xs cursor-pointer hover:bg-secondary transition-colors"
								>
									{tagsOpen ? "Show less" : `+${hiddenTagsCount} more`}
								</Badge>
							</button>
						)}
					</div>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<h3 className="font-mono text-xs tracking-wider text-primary"> Project Overview:</h3>
						<CardDescription className="text-base">{project.projectOverview}</CardDescription>
					</div>
					{project.responsibilities.length > 0 && (
						<div className="grid gap-2">
							<h3 className="font-mono text-xs tracking-wider text-primary">My Responsibilities:</h3>
							<Collapsible open={open} onOpenChange={setOpen}>
								<ul className="space-y-2">
									{visibleItems.map(item => (
										<SkillListItem key={item} text={item} variant="compact" />
									))}
								</ul>
								{hasMore && (
									<>
										<CollapsibleContent>
											<ul className="space-y-2 mt-2">
												{hiddenItems.map(item => (
													<SkillListItem key={item} text={item} variant="compact" />
												))}
											</ul>
										</CollapsibleContent>
										<CollapsibleTrigger className="flex items-center gap-1 mt-3 font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
											<ChevronDown
												className={cn("size-3 transition-transform", open && "rotate-180")}
											/>
											{open ? "Show less" : `Show ${hiddenItems.length} more`}
										</CollapsibleTrigger>
									</>
								)}
							</Collapsible>
						</div>
					)}
				</CardContent>
			</div>
		</Card>
	);
}
