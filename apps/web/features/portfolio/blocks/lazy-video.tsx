"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
	src: string;
	poster?: string;
	className?: string;
}

export function LazyVideo({ src, poster, className }: LazyVideoProps) {
	const ref = useRef<HTMLVideoElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
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
	}, []);

	useEffect(() => {
		if (isVisible && ref.current) {
			ref.current.load();
			ref.current.play().catch(() => {});
		}
	}, [isVisible]);

	return (
		<video
			ref={ref}
			loop
			muted
			playsInline
			preload="none"
			poster={poster}
			aria-hidden="true"
			className={className}
		>
			{isVisible && <source src={src} type="video/mp4" />}
		</video>
	);
}
