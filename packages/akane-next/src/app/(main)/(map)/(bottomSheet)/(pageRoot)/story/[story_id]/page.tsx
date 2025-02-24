import { AsBigInt } from "@/helper/bigint";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { getStories } from "../../story_mock";
import StoryDetailClientPage from "./page_client";

export default async function StoryDetail({
	params,
}: {
	params: Promise<{
		story_id: string;
	}>;
}) {
	const { story_id } = await params;
	const story = getStories().find((story) => story.id === AsBigInt(story_id));
	console.log(story_id);
	getStories().map((story) => console.log(story.id));

	if (!story) {
		return (
			<div>
				<Link href="/">←トップページに戻る</Link>
				<Text textStyle="2xl">謎解きが見つかりません</Text>
				<Text textStyle="2xl">404 Not Found</Text>
			</div>
		);
	}
	return <StoryDetailClientPage story={story} />;
}
