import { ThemeProvider } from "next-themes";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
	display: "swap",
});

export default function PortfolioLayout({ children }: { children: ReactNode }) {
	return (
		<div className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} font-body`}>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				storageKey="portfolio-theme"
				value={{ light: "light-mode", dark: "dark-mode" }}
			>
				{children}
			</ThemeProvider>
		</div>
	);
}
