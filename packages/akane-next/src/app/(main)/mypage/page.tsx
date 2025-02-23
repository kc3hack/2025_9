import StoryGallary from "@/components/mypage/StoryGallery";
import TabTrigger from "@/components/mypage/TabTrigger";
import { Avatar, AvatarGroup, Box, Stack, Tabs, Text } from "@chakra-ui/react";
import type { Story } from "@prisma/client";

export default async function MyPage() {
	// TODO：storyのAPIが実装されたらここからフェッチする
	// const STORY_ENDPOINT = "";
	// const story = fetch(Story_ENDPOINT);
	// const avatarIconURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"

	// const stories: Story[] = await StoryService.findStories();
	// npm run dev用の仮データ
	const stories: Story[] = [
		{
			id: BigInt("101255084679102464"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: "treasure",
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
		{
			id: BigInt("101255084679102464"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: "treasure",
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
		{
			id: BigInt("101255084679102464"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: "treasure",
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
		{
			id: BigInt("101255084679102464"),
			user_account_id: BigInt("101255084679102464"),
			title: "fdwas",
			content: "fads",
			image_url: "treasure",
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
	const name = "名前";
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
								<Box margin="5">
									<Avatar.Fallback fontSize="6xl" name={name} color="#6750A4" />
								</Box>
								{/* アイコン画像 */}
								{/* <Avatar.Image src={AvatarIconURL} /> */}
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
						<StoryGallary tabValue="tab1" stories={stories} />
						<StoryGallary tabValue="tab2" stories={stories} />
						<StoryGallary tabValue="tab3" stories={stories} />
					</Tabs.ContentGroup>
				</Tabs.Root>
			</Stack>
		</div>
	);
}
