import treasure from "@/../public/treasure_map.png";
import { Tabs } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import type { StaticImageData } from "next/image";
import { StoryCard } from "../story/StoryCard";

// TODO:Storyのmodelができたらそれに差し替える
type Story = {
	id: bigint;
	user_account_id: bigint;
	title: string;
	content: string;
	image_url: string | null | StaticImageData;
	type: string;
	status: string;
	difficulty: number;
	estimated_time: string | null;
	area: string;
	radius: number;
	latitude: number;
	longitude: number;
	pin_class: string | null;
	created_at: Date;
	updated_at: Date;
	progression?:
		| {
				id: bigint;
				user_account_id: bigint;
				story_id: bigint;
				status: string;
				current_question_id: bigint | null | undefined;
				created_at: Date;
				updated_at: Date;
		  }
		| undefined;
};

type StoryGalleryProps = {
	tabValue: string;
	stories: Story[];
	page: string;
};

export default function ProgressionStoryGallery({
	tabValue,
	stories,
	page,
}: StoryGalleryProps) {
	console.log(stories);
	return (
		<Tabs.Content
			value={tabValue}
			display="flex"
			justifyContent="center"
			marginTop="14"
		>
			<SimpleGrid columns={2} gap="8">
				{stories
					?.filter((story) => story.progression?.status === page)
					.map((story) => (
						<div key={story.id.toString()}>
							<StoryCard
								title={story.title}
								background="#f4f4f5"
								cardBorderWidth="thick"
								cardRadius="2rem"
								imageURL={treasure} // 一旦デフォルト画像を使用
								imageAlt={`Image for ${story.title}`}
								imageSize={50}
								link={`/story/${story.id}`}
								size="150px"
								status={
									story.progression ? story.progression.status : "unknown"
								}
							/>
						</div>
					))}
			</SimpleGrid>
		</Tabs.Content>
	);
}
