"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

interface SocialLinkItemProps {
	href: string;
	label: string;
	deepLinkScheme?: string;
	className?: string;
	children: ReactNode;
}

export function SocialLinkItem({ href, label, deepLinkScheme, className, children }: SocialLinkItemProps) {
	const isMailto = href.startsWith("mailto:");

	const cleanupRef = useRef<(() => void) | null>(null);

	useEffect(() => {
		return () => cleanupRef.current?.();
	}, []);

	function handleClick(e: MouseEvent<HTMLAnchorElement>) {
		if (!deepLinkScheme || navigator.maxTouchPoints === 0) return;

		e.preventDefault();
		cleanupRef.current?.();

		const fallback = setTimeout(() => {
			cleanup();
			window.location.href = href;
		}, 1000);

		window.location.href = deepLinkScheme;

		const handleVisibilityChange = () => {
			if (document.hidden) {
				cleanup();
			}
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);

		function cleanup() {
			clearTimeout(fallback);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			cleanupRef.current = null;
		}

		cleanupRef.current = cleanup;
	}

	return (
		<a
			href={href}
			aria-label={label}
			className={className}
			onClick={handleClick}
			{...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
		>
			{children}
		</a>
	);
}
