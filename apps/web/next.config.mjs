import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: [
		"@workspace/api",
		"@workspace/auth",
		"@workspace/db",
		"@workspace/models",
		"@workspace/ui",
		"@workspace/utils",
	],
	output: "standalone",
	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
	},
};

export default withSentryConfig(nextConfig, {
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
	silent: !process.env.CI,
	tunnelRoute: "/monitoring",
	authToken: process.env.SENTRY_AUTH_TOKEN,
	widenClientFileUpload: true,
	telemetry: false,
});
