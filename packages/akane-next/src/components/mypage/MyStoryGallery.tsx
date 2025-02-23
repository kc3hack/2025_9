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
	// next/imageのImageにlocalの画像を入れるために型をStaticImageDataにしている
	// TODO:S3の画像を撮ってくるようにするときに型から消す？
	// デフォルト画像をlocalで設定するなら、このまま使う
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
};

type StoryGalleryProps = {
	tabValue: string;
	stories: Story[];
};

export default function MyStoryGallery({
	tabValue,
	stories,
}: StoryGalleryProps) {
	const treasure = "/treasure_map.png";
	return (
		<Tabs.Content
			value={tabValue}
			display="flex"
			justifyContent="center"
			marginTop="14"
		>
			<SimpleGrid columns={2} gap="8">
				{stories.map((story) => (
					<div key={story.id.toString()}>
						<StoryCard
							title={story.title}
							background="#f4f4f5"
							cardBorderWidth="thick"
							cardRadius="2rem"
							//↓image_urlがなかったらtreasureを表示
							imageURL={story.image_url ?? treasure}
							imageAlt={`Image for ${story.title}`}
							imageSize={50}
							link="mypage/mock"
							size="150px"
							status={story.status}
						/>
					</div>
				))}
			</SimpleGrid>
		</Tabs.Content>
	);
}
