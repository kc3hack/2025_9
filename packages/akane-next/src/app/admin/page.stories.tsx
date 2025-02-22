import { AdminPageLayoutDecorator } from "@/components/admin/layout";
import type { Meta, StoryObj } from "@storybook/react";
import AdminIndexPage from "./page";

const meta: Meta<typeof AdminIndexPage> = {
	title: "AdminIndexPage",
	component: AdminIndexPage,
};

export default meta;
type Story = StoryObj<typeof AdminIndexPage>;

export const Primary: Story = {
	args: {},
	parameters: {
		layout: "fullscreen",
	},
	decorators: [AdminPageLayoutDecorator],
};
