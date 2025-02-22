import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
		serverActions: {
			allowedOrigins: ["local.akane.yaken.org", "admin.local.akane.yaken.org"],
		},
	},
};

export default nextConfig;
