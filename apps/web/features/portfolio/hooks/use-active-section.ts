"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "../constants";

export function useActiveSection() {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		const sectionIds = NAV_LINKS.map(link => link.href.replace("#", ""));

		const observer = new IntersectionObserver(
			entries => {
				const visible = entries
					.filter(entry => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				const first = visible[0];
				if (first) {
					setActiveId(first.target.id);
					return;
				}

				const firstId = sectionIds[0];
				const firstSection = firstId ? document.getElementById(firstId) : null;
				if (firstSection && firstSection.getBoundingClientRect().top > window.innerHeight * 0.5) {
					setActiveId(null);
				}
			},
			{ rootMargin: "-64px 0px -50% 0px", threshold: 0 },
		);

		const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
		elements.forEach(el => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	return activeId;
}
