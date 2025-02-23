import type { Meta, StoryObj } from "@storybook/react";
import { AdminNavbar } from "./navbar";

const meta: Meta<typeof AdminNavbar> = {
	title: "components/admin/AdminNavbar",
	component: AdminNavbar,
};

export default meta;
type Story = StoryObj<typeof AdminNavbar>;

export const Primary: Story = {
	args: {},
	parameters: {
		layout: "centered",
	},
};
