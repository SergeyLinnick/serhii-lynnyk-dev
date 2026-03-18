"use client";

interface SocialLinkItemProps {
	href: string;
	label: string;
	deepLinkScheme?: string;
	className?: string;
	children: React.ReactNode;
}

export function SocialLinkItem({ href, label, deepLinkScheme, className, children }: SocialLinkItemProps) {
	const isMailto = href.startsWith("mailto:");

	function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
		if (!deepLinkScheme || navigator.maxTouchPoints === 0) return;

		e.preventDefault();

		const fallback = setTimeout(() => {
			window.location.href = href;
		}, 1000);

		window.location.href = deepLinkScheme;

		const handleVisibilityChange = () => {
			if (document.hidden) {
				clearTimeout(fallback);
				document.removeEventListener("visibilitychange", handleVisibilityChange);
			}
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
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
