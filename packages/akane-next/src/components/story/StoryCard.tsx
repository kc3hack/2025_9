import SquareImage from "@/components/story/squareImage";
import { getCardBorderColor, getStatusMessage } from "@/helper/statusHandler";
import { Card, Separator, Text } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./StoryCard.module.css";

/*
background: カードの背景色：string(Chakra-ui)
cardBorderWidth: カードのborderの太さ:string(Chakra-ui)
imageURL: カードに表示するimageのURL:string
imageAlt: カードのalt要素の文字列:string
link: カードをクリック後に遷移するURL:string
title: カードのタイトル：string
size: カードのwidthとheight:string(Chakra-ui)
separatorColor: タイトルと状態を分つホライズンラインの色:string(Chakraui)
status: カード(story）の進行状態の文字列: string
  in_progress: "進行中"
  started: "開始済み"
  cleared: "完了"
  public: "投稿済み"
  url_only: "URLのみ"
  private: "編集途中"
*/
export function StoryCard({
	background = "#f4f4f5",
	cardBorderWidth = "thick",
	cardRadius = "2rem",
	imageURL = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
	imageAlt = "this is image for the question.",
	imageSize = 50,
	link = "/",
	title = "タイトル",
	size = "150px",
	separatorColor = "#49454F",
	status = "in_progress",
}: {
	background: string;
	cardBorderWidth: string;
	cardRadius: string;
	imageURL: string;
	imageAlt: string;
	imageSize: number;
	link: string;
	title: string;
	size: string;
	separatorColor: string;
	status: string;
}) {
	const cardBorderColor = getCardBorderColor(status);
	const statusMessage = getStatusMessage(status);

	return (
		<Link href={link}>
			<Card.Root
				background={background}
				borderWidth={cardBorderWidth}
				borderColor={cardBorderColor}
				borderRadius={cardRadius}
				width={size}
				height={size}
				overflow="hidden"
				padding="5px"
			>
				<div className={styles.imageContainer}>
					<SquareImage
						src={imageURL}
						alt={imageAlt}
						size={imageSize}
						radius={"2xl"}
					/>
				</div>
				<Card.Title marginTop="1.5" textAlign={"center"}>
					{title}
				</Card.Title>
				<Separator size="md" color={separatorColor} />
				<Text marginTop={"1.5"} textAlign={"center"}>
					{statusMessage}
				</Text>
			</Card.Root>
		</Link>
	);
}
