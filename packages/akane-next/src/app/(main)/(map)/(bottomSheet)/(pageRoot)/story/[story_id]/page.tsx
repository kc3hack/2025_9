import { Text } from "@chakra-ui/react";
import { stories } from "../../story_mock";
import Link from "next/link";
import StoryDetailClientPage from "./page_client";

export default async function StoryDetail({
    params
}: {
    params: Promise<{
        story_id: string;
    }>;
}) {
    const { story_id } = await params;
    const story = stories.find((story) => story.id === BigInt(story_id));
    if (!story) {
        return (
            <div>
                <Link href="/">
                    ←トップページに戻る
                </Link>
                <Text textStyle="2xl">謎解きが見つかりません</Text>
                <Text textStyle="2xl">404 Not Found</Text>
            </div>
        );
    }
    return (
        <StoryDetailClientPage story={story} />
    )
}