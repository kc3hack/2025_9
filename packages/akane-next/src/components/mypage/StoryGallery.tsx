import { Tabs } from "@chakra-ui/react";

export default function StoryGallary({
	tabValue,
	content,
}: { tabValue: string; content: string }) {
	return <Tabs.Content value={tabValue}>{content}</Tabs.Content>;
}
