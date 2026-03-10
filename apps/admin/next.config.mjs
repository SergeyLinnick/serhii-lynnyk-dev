/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@workspace/ui"],
	output: "standalone",
	poweredByHeader: false,
};
export default nextConfig;
