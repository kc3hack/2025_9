import "./bootstrap.css";
import type React from "react";
import { AdminNavbar } from "./navbar";

export const AdminPageLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<div>
			<AdminNavbar />
			<main className="container">{children}</main>
		</div>
	);
};

export const AdminPageLayoutDecorator = (Story: React.FC) => (
	<AdminPageLayout>
		<Story />
	</AdminPageLayout>
);
