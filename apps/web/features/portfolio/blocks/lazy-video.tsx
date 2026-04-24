"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
	src: string;
	poster?: string;
	className?: string;
	eager?: boolean;
}

export function LazyVideo({ src, poster, className, eager = false }: LazyVideoProps) {
	const ref = useRef<HTMLVideoElement>(null);
	const [isVisible, setIsVisible] = useState(eager);

	useEffect(() => {
		if (eager) return;
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [eager]);

	useEffect(() => {
		if (isVisible && ref.current) {
			ref.current.load();
			ref.current.play().catch(() => {});
		}
	}, [isVisible]);

	return (
		<video ref={ref} loop muted playsInline preload={eager ? "auto" : "none"} poster={poster} aria-hidden="true" className={className} fetchPriority={eager ? "high" : undefined}>
			{isVisible && <source src={src} type="video/mp4" />}
		</video>
	);
}
