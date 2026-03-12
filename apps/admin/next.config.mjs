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
};
export default nextConfig;
