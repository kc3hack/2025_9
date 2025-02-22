import { AdminPageLayout } from "@/components/admin/layout";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AdminPageLayout> = {
	title: "components/admin/AdminPageLayout",
	component: AdminPageLayout,
};

export default meta;
type Story = StoryObj<typeof AdminPageLayout>;

export const Primary: Story = {
	args: {},
	parameters: {
		layout: "fullscreen",
	},
};
