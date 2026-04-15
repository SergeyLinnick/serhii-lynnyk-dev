"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "../constants/header";

export function useActiveSection() {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		let observer: IntersectionObserver | null = null;

		const setup = () => {
			const sectionIds = NAV_LINKS.map(link => link.href.replace("#", ""));
			const visibleSections = new Map<string, IntersectionObserverEntry>();

			observer = new IntersectionObserver(
				entries => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							visibleSections.set(entry.target.id, entry);
						} else {
							visibleSections.delete(entry.target.id);
						}
					}

					if (visibleSections.size === 0) {
						const firstId = sectionIds[0];
						const firstSection = firstId ? document.getElementById(firstId) : null;
						if (firstSection && firstSection.getBoundingClientRect().top > window.innerHeight * 0.5) {
							setActiveId(null);
						}
						return;
					}

					const topmost = sectionIds.find(id => visibleSections.has(id));
					if (topmost) {
						setActiveId(topmost);
					}
				},
				{ rootMargin: "-64px 0px -50% 0px", threshold: 0 },
			);

			const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
			elements.forEach(el => observer!.observe(el));
		};

		const scheduleIdle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1));
		const idleId = scheduleIdle(setup);

		return () => {
			(window.cancelIdleCallback ?? clearTimeout)(idleId);
			observer?.disconnect();
		};
	}, []);

	return activeId;
}
