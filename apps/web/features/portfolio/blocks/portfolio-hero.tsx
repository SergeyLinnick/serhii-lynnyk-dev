import { buttonVariants } from "@workspace/ui";
import { cn } from "@workspace/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HERO_CONTENT, SOCIAL_LINKS, STATUS_PANEL_HIGHLIGHT, STATUS_PANEL_METRICS, STATUS_PANEL_TOP } from "../constants";
import { Container } from "./container";
import { LazyVideo } from "./lazy-video";
import { StatusPanelMetrics } from "./status-panel-metrics";

export function PortfolioHero() {
	return (
		<Container
			wrapperClassName="relative min-h-screen flex items-center pt-16 overflow-hidden"
			className="mx-auto max-w-7xl flex-1"
		>
			{/* Background Image with Overlay */}
			<div className="absolute inset-0 z-0">
				<div className="relative w-[100vw] h-[100vh] bg-background overflow-hidden">
					<Image
						src="/portfolio/hero-bg.jpg"
						alt=""
						fill
						sizes="100vw"
						priority
						className="object-cover object-center"
					/>
					<div className="absolute inset-0 bg-primary mix-blend-color-dodge dark:mix-blend-color" />
				</div>
				<div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
			</div>

			<div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono">
						<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
							<span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
						</span>
						{HERO_CONTENT.statusBadge}
					</div>
					<h1 className="text-6xl md:text-8xl font-display tracking-tighter leading-[0.9] drop-shadow-md">
						{HERO_CONTENT.headingLines.map(line => (
							<span key={line}>
								{line}
								<br />
							</span>
						))}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground">
							{HERO_CONTENT.headingAccent}{" "}
						</span>
					</h1>
					<p className="md:text-xl text-muted-foreground max-w-md leading-relaxed drop-shadow-sm">
						{HERO_CONTENT.description}
					</p>
					<div className="flex gap-6 pt-4 items-center">
						<Link href={HERO_CONTENT.ctaHref} className={cn("uppercase", buttonVariants({ size: "lg" }))}>
							{HERO_CONTENT.ctaLabel} <ArrowRight className="size-4" />
						</Link>
						<div className="h-8 w-px bg-border" />
						<div className="flex gap-2">
							{SOCIAL_LINKS.map(link => (
								<Link
									key={link.label}
									href={link.href}
									aria-label={link.label}
									{...(!link.href.startsWith("mailto:") && {
										target: "_blank",
										rel: "noopener noreferrer",
									})}
									className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
								>
									<link.icon className="h-5 w-5" />
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* System Status Panel */}
				<div className="hidden md:block relative h-[500px] w-full overflow-hidden border border-border/30 p-8 opacity-75 hover:opacity-100 transition-opacity duration-300">
					<LazyVideo
						src="/portfolio/video.mp4"
						poster="/portfolio/video-poster.jpg"
						className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
					/>
					<Image
						src="/portfolio/video-poster.jpg"
						alt=""
						fill
						sizes="(min-width: 768px) 50vw, 0px"
						className="hidden object-cover object-center motion-reduce:block"
					/>
					<div className="absolute inset-0 bg-black/60" aria-hidden="true" />

					<div className="absolute z-10 top-0 left-0 size-4 border-t-2 border-l-2 border-primary" />
					<div className="absolute z-10 top-0 right-0 size-4 border-t-2 border-r-2 border-primary" />
					<div className="absolute z-10 bottom-0 left-0 size-4 border-b-2 border-l-2 border-primary" />
					<div className="absolute z-10 bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary" />

					<div className="relative z-10 h-full w-full flex flex-col justify-between font-mono text-xs text-muted-foreground">
						<div className="flex justify-between">
							{STATUS_PANEL_TOP.map(stat => (
								<span key={stat.label}>
									{stat.label}: {stat.value}
								</span>
							))}
						</div>
						<StatusPanelMetrics metrics={STATUS_PANEL_METRICS} />
						<div className="text-right">
							<span className="block text-4xl font-bold text-foreground">
								{STATUS_PANEL_HIGHLIGHT.value}
							</span>
							<span>{STATUS_PANEL_HIGHLIGHT.label}</span>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
