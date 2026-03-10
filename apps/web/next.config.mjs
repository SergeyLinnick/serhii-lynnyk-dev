/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@workspace/ui"],
	output: "standalone",
	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
	},
};
export default nextConfig;
