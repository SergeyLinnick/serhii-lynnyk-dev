import { ThemeProvider } from "next-themes";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import "./portfolio.css";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "700"],
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	display: "swap",
	weight: ["400"],
});

export default async function PortfolioLayout({ children }: { children: ReactNode }) {
	const nonce = (await headers()).get("x-nonce") ?? undefined;

	return (
		<div className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} font-body`}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				storageKey="portfolio-theme"
				value={{ light: "light-mode", dark: "dark-mode" }}
				nonce={nonce}
			>
				{children}
			</ThemeProvider>
		</div>
	);
}
