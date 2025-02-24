import MyStoryGallary from "@/components/mypage/MyStoryGallery";
import ProgressionStoryGallary from "@/components/mypage/ProgressionStoryGallary";
import TabTrigger from "@/components/mypage/TabTrigger";
import { StoryStatus } from "@/constants/status";
import { Avatar, AvatarGroup, Box, Stack, Tabs, Text } from "@chakra-ui/react";
import type { Story, StoryProgression } from "@prisma/client";

type StoryWithProgression = Story & { progression?: StoryProgression };

export default async function MyPage() {
	// TODO：storyのAPIが実装されたらここからフェッチする
	// const STORY_ENDPOINT = "";
	// const story = fetch(Story_ENDPOINT);
	// const avatarIconURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"

	// next/imageの仕様上、外部URLを使用する場合以下のリンクの手順が必要らしい
	// https://zenn.dev/axoloto210/articles/9dc94b3cdfeae8
	// const stories: Story[] = await StoryService.findStories();
	// npm run dev用の仮データ
	// storyprogression.where(storyprogression.user_account_id === own_id)
	// storyProgressionsがnull, undefinedだったときの処理を追加する（fetchしたらnullの可能性がある)
	const storyProgressions: StoryProgression[] = [
		{
			id: BigInt("101255954679102464"),
			user_account_id: BigInt("101255084679102464"),
			story_id: BigInt("101255084679102464"),
			status: StoryStatus.cleared,
			current_question_id: BigInt("101255084679102464"),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255954679102464"),
			user_account_id: BigInt("101255084679102464"),
			story_id: BigInt("101255084679102465"),
			status: StoryStatus.cleared,
			current_question_id: BigInt("101255084679102464"),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255954679102464"),
			user_account_id: BigInt("101255084679102464"),
			story_id: BigInt("101255084679102466"),
			status: StoryStatus.in_progress,
			current_question_id: BigInt("101255084679102464"),
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255954679102464"),
			user_account_id: BigInt("101255084679102464"),
			story_id: BigInt("101255084679102467"),
			status: StoryStatus.in_progress,
			current_question_id: BigInt("101255084679102464"),
			created_at: new Date(),
			updated_at: new Date(),
		},
	];
	// fetch(findStories(progressionStoryIDs))
	const progressingStories: Story[] = [
		{
			id: BigInt("101255084679102464"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: null,
			type: "long",
			status: "public",
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255084679102465"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: null,
			type: "long",
			status: "public",
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255084679102466"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: null,
			type: "long",
			status: "public",
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255084679102467"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: null,
			type: "long",
			status: "in_progress",
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	const storyIncludeProgression: StoryWithProgression[] =
		progressingStories.map((story) => {
			const progression = storyProgressions.find(
				(prog) => prog.story_id === story.id,
			);

			return {
				...story,
				progression: progression
					? {
							...progression,
							current_question_id: progression.current_question_id ?? null,
						}
					: undefined,
			};
		});

	// findStories.which(story.user_acocunt_id === own_id)
	const ownStories: Story[] = [
		{
			id: BigInt("101255084679102464"),
			user_account_id: BigInt("101255084679102464"),
			title: "1",
			content: "fads",
			image_url: null,
			type: "long",
			status: StoryStatus.private,
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255084679102465"),
			user_account_id: BigInt("101255084679102464"),
			title: "2",
			content: "fads",
			image_url: null,
			type: "long",
			status: StoryStatus.public,
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255084679102466"),
			user_account_id: BigInt("101255084679102464"),
			title: "3",
			content: "fads",
			image_url: null,
			type: "long",
			status: StoryStatus.public,
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: BigInt("101255084679102467"),
			user_account_id: BigInt("101255084679102464"),
			title: "4",
			content: "fads",
			image_url: null,
			type: "long",
			status: StoryStatus.private,
			difficulty: 1,
			estimated_time: "1",
			area: "fa",
			radius: 3,
			latitude: 39,
			longitude: 423,
			pin_class: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];
	const name = "小鳥遊";
	return (
		<div>
			<Box
				width="full"
				display="flex"
				justifyContent="center"
				marginTop="20"
				marginBottom="5"
			>
				<div>
					<Box width="full" display="flex" justifyContent="center">
						<AvatarGroup>
							<Avatar.Root
								shape="full"
								size="full"
								variant="outline"
								border="none"
								bgColor="#EADDFF"
							>
								{/* <Box margin="5">
									<Avatar.Fallback fontSize="6xl" name={name} color="#6750A4" />
								</Box> */}
								{/* アイコン画像 */}
								<Avatar.Image
									src={
										"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0GPEdZjqR4WiboG9zP_YzmedSFqzfAaW_9X8psW00QqTjofeWGmlhiMucISVbPaUJYfIUpuSBKhU91nypKfIIfH6dAJo1I497Pak3lfduCn7KQcO1eTTvGt3s6_Dd1A1QwJx4xyA2HUoH/s1600/nigaoe_carolus_fridericus_gauss.png"
									}
									boxSize="32"
								/>
							</Avatar.Root>
						</AvatarGroup>
					</Box>
					<Stack alignItems="center" marginTop="5">
						<Text fontSize="3xl">{name}</Text>
					</Stack>
				</div>
			</Box>
			<Stack width="full" maxWidth="600px" marginX="auto">
				<Tabs.Root defaultValue={"tab1"} variant="line" colorPalette="purple">
					<Tabs.List
						display="grid"
						gridTemplateColumns="repeat(3, 1fr)"
						width="100%"
					>
						<TabTrigger value="tab1" content="進行中" />
						<TabTrigger value="tab2" content="解読済み" />
						<TabTrigger value="tab3" content="オリジナル" />
						{/* <Tabs.Indicator rounded={6} /> */}
					</Tabs.List>
					<Tabs.ContentGroup>
						<ProgressionStoryGallary
							tabValue="tab1"
							stories={storyIncludeProgression}
							page="in_progress"
						/>
						<ProgressionStoryGallary
							tabValue="tab2"
							stories={storyIncludeProgression}
							page="cleared"
						/>
						<MyStoryGallary tabValue="tab3" stories={ownStories} />
					</Tabs.ContentGroup>
				</Tabs.Root>
			</Stack>
		</div>
	);
}
