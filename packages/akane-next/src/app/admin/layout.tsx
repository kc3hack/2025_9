import { AdminPageLayout } from "@/components/admin/layout";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Akane 管理画面",
	description: "Akane 管理画面です。操作には注意してください。",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1.0,
	maximumScale: 1.0,
};

export const scrollableStyle = {
	overflow: "scroll",
	height: "100%",
};

export default function AdminRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning>
			<body style={scrollableStyle} suppressHydrationWarning>
				<AdminPageLayout>{children}</AdminPageLayout>
			</body>

			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
				crossOrigin="anonymous"
				strategy="afterInteractive"
			/>
		</html>
	);
}
