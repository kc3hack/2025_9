import StoryGallary from "@/components/mypage/StoryGallery";
import { Avatar, AvatarGroup, Box, Stack, Tabs, Text } from "@chakra-ui/react";

export default function MyPage() {
	// TODO：storyが実装されたらここからフェッチする
	// const STORY_ENDPOINT = "";
	// const story = fetch(Story_ENDPOINT);
	// const avatarIconURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
	const variant = "hoge";
	const name = "hoge";
	return (
		<div>
			<Box width="full" display="flex" justifyContent="center" marginY="16">
				<div>
					<AvatarGroup>
						<Avatar.Root shape="full" size="2xl" variant="subtle">
							<Avatar.Fallback name={variant} />
							{/* アイコン画像 */}
							{/* <Avatar.Image src={AvatarIconURL} /> */}
						</Avatar.Root>
					</AvatarGroup>
					<Stack alignItems="center">
						<Text>{name}</Text>
					</Stack>
				</div>
			</Box>
			<Stack width="full">
				<Tabs.Root defaultValue={"tab1"} variant="line" colorPalette="purple">
					<Tabs.List
						display="grid"
						gridTemplateColumns="repeat(3, 1fr)"
						width="100%"
					>
						<Tabs.Trigger
							value="tab1"
							color="#49454F"
							display="flex"
							justifyContent="center"
						>
							進行中
						</Tabs.Trigger>
						<Tabs.Trigger
							value="tab2"
							color="#49454F"
							display="flex"
							justifyContent="center"
						>
							解読済み
						</Tabs.Trigger>
						<Tabs.Trigger
							value="tab3"
							color="#49454F"
							display="flex"
							justifyContent="center"
						>
							オリジナル
						</Tabs.Trigger>
						{/* <Tabs.Indicator rounded={6} /> */}
					</Tabs.List>
					<Tabs.ContentGroup>
						<StoryGallary tabValue="tab1" content="進行中の問題" />
						<Tabs.Content value="tab2">解読済みの問題</Tabs.Content>
						<Tabs.Content value="tab3">オリジナル問題</Tabs.Content>
					</Tabs.ContentGroup>
				</Tabs.Root>
			</Stack>
		</div>
	);
}
