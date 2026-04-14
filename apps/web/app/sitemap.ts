import type { MetadataRoute } from "next";

const BASE_URL =
	process.env.NEXT_PUBLIC_APP_URL || "https://serhii-lynnyk-dev.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${BASE_URL}/portfolio`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];
}
