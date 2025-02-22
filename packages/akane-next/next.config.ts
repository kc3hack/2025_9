import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
		serverActions: {
			allowedOrigins: [
				// 本番環境
				"akane.yaken.org",
				"admin-akane.yaken.org",
				// ステージング環境
				"st-akane.yaken.org",
				"admin-st-akane.yaken.org",
				// ローカル環境
				"local.akane.yaken.org",
				"admin.local.akane.yaken.org",
			],
		},
	},
};

export default nextConfig;
