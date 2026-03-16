"use client";

import { Progress } from "@workspace/ui";
import { useEffect, useState } from "react";
import type { StatusPanelItem } from "../types";

const FILL_DURATION = 350;

interface StatusPanelMetricsProps {
	metrics: StatusPanelItem[];
}

export function StatusPanelMetrics({ metrics }: StatusPanelMetricsProps) {
	const [animatedValues, setAnimatedValues] = useState<number[]>(() => metrics.map(() => 0));

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			setAnimatedValues(metrics.map(m => m.progress ?? 100));
			return;
		}

		const timeouts = metrics.map((metric, i) =>
			setTimeout(() => {
				setAnimatedValues(prev => {
					const next = [...prev];
					next[i] = metric.progress ?? 100;
					return next;
				});
			}, i * FILL_DURATION),
		);

		return () => timeouts.forEach(clearTimeout);
	}, [metrics]);

	return (
		<div className="space-y-8">
			{metrics.map((metric, i) => (
				<div key={metric.label}>
					<Progress
						value={animatedValues[i]}
						className="h-1 rounded-none"
						indicatorClassName="duration-700 ease-out"
					/>
					<div className="flex justify-between text-base">
						<span>{metric.label}</span>
						<span>{metric.value}</span>
					</div>
				</div>
			))}
		</div>
	);
}
