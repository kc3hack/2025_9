import type { Meta, StoryObj } from "@storybook/react";
import { StoryCard } from "./StoryCard";

const meta: Meta<typeof StoryCard> = {
  title: "story/StoryCard",
  component: StoryCard,
  tags: ["story", "StoryCard"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    background: "#f4f4f5",
    cardBorderWidth: "thick",
    cardBorderColor: "#2563eb",
    cardRadius: "2rem",
    imageURL:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    imageAlt: "this is image for the question.",
    imageSize: 50,
    link: "/",
    title: "タイトル",
    size: "150px",
    separatorColor: "#49454F",
    status: "現在途中",
  },
};
