import { Tabs } from "@chakra-ui/react";

export default function TabTrigger({
	content,
	value,
}: { content: string; value: string }) {
	return (
		<Tabs.Trigger
			value={value}
			color="#49454F"
			display="flex"
			justifyContent="center"
		>
			{content}
		</Tabs.Trigger>
	);
}
