"use client";

import { useEffect, useRef, useState } from "react";
import { useScramble } from "../hooks/use-scramble";

interface ScrambleHeadingProps {
	headingLines: string[];
	headingAccent: string;
}

const HEADING_CLASS_NAME =
	"text-6xl md:text-8xl font-display tracking-tighter leading-[0.9] drop-shadow-md min-h-[6.75rem] md:min-h-[10.8rem]";

function ScrambleWord({
	word,
	trigger,
	baseDelay,
	className,
}: {
	word: string;
	trigger: boolean;
	baseDelay: number;
	className?: string;
}) {
	const [localTrigger, setLocalTrigger] = useState(false);
	const display = useScramble(word, localTrigger);

	useEffect(() => {
		if (!trigger) return;
		const t = setTimeout(() => setLocalTrigger(true), baseDelay);
		return () => clearTimeout(t);
	}, [trigger, baseDelay]);

	return <span className={className}>{display}</span>;
}

export function ScrambleHeading({ headingLines, headingAccent }: ScrambleHeadingProps) {
	const [triggered, setTriggered] = useState(false);
	const ref = useRef<HTMLHeadingElement>(null);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);
	}, []);

	useEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion) return;

		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setTriggered(true);
					obs.disconnect();
				}
			},
			{ threshold: 0.3 },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [prefersReducedMotion]);

	const ariaLabel = [...headingLines, headingAccent].join(" ");

	if (prefersReducedMotion) {
		return (
			<h1 className={HEADING_CLASS_NAME} aria-label={ariaLabel}>
				{headingLines.map((line, i) => (
					<span key={line}>
						{line}
						{i < headingLines.length - 1 && <br />}
					</span>
				))}
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground">
					{headingAccent}{" "}
				</span>
			</h1>
		);
	}

	let wordIndex = 0;

	return (
		<h1 ref={ref} className={HEADING_CLASS_NAME} aria-label={ariaLabel}>
			{headingLines.map((line, i) => {
				const delay = wordIndex * 120;
				wordIndex++;
				return (
					<span key={line}>
						<ScrambleWord word={line} trigger={triggered} baseDelay={delay} />
						{i < headingLines.length - 1 && <br />}
					</span>
				);
			})}
			<ScrambleWord
				word={headingAccent}
				trigger={triggered}
				baseDelay={wordIndex * 120}
				className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground"
			/>
			<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-foreground"> </span>
		</h1>
	);
}
