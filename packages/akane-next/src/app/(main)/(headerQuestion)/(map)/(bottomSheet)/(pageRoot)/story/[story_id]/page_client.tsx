"use client";

import { getDistanceByTwoPoints } from "@/helper/location";
import { useBottomSheet } from "@/hooks/BottomSheetHook";
import { useLocation } from "@/hooks/LocationHook";
import { useMap } from "@/hooks/MapHook";
import {
	Button,
	ButtonGroup,
	DataList,
	Flex,
	HStack,
	Icon,
	Image,
	Link,
	RatingGroup,
	Text,
	VStack,
} from "@chakra-ui/react";
import type { Story } from "@prisma/client";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { IoMdFlag, IoMdPin } from "react-icons/io";

export default function StoryDetailClientPage({
	story,
	firstQuestionId,
}: {
	story: Story;
	firstQuestionId: bigint | null;
}) {
	const { map, isMapLoaded } = useMap();
	const { position } = useLocation();
	const { setSnap, snapPoints } = useBottomSheet();

	if (map) {
		map.flyTo({
			center: [story.longitude, story.latitude - 0.002],
			zoom: 16,
			duration: 2000,
		});
	}
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setSnap(snapPoints[1]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!map || !isMapLoaded) {
			return;
		}
		const marker = new mapboxgl.Marker({
			color:
				story.type === "normal"
					? "var(--chakra-colors-green-500)"
					: "var(--chakra-colors-yellow-400)",
		})
			.setLngLat([story.longitude, story.latitude])
			.addTo(map)
			.setPopup(new mapboxgl.Popup().setHTML("<h1>Hello, world!</h1>"));
		// story.radius(メートル単位)を使って、円を描画する turfで
		const circle = turf.circle(
			[story.longitude, story.latitude],
			story.radius,
			{
				steps: 100,
				units: "meters",
			},
		);
		map.addSource("circle", {
			type: "geojson",
			data: circle,
		});
		map.addLayer({
			id: "circle",
			type: "fill",
			source: "circle",
			layout: {},
			paint: {
				"fill-color": "#4169e1",
				"fill-opacity": 0.5,
			},
		});
		return () => {
			marker.remove();
			map.removeLayer("circle");
			map.removeSource("circle");
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [map, isMapLoaded]);

	if (!position) {
		return <div>位置情報を取得中です...</div>;
	}

	const storyWithDistance = {
		...story,
		distance: getDistanceByTwoPoints(
			position.coords.latitude,
			position.coords.longitude,
			story.latitude,
			story.longitude,
		),
	};

	return (
		<div>
			<VStack alignItems="flex-start" w="100%" p={4} gap={4}>
				{storyWithDistance.image_url && (
					<Image
						width="640px"
						src={storyWithDistance.image_url ?? ""}
						alt={storyWithDistance.title}
					/>
				)}
				<HStack justifyContent="space-between" w="100%">
					<HStack gap={2} alignItems="flex-start">
						<Icon
							boxSize={6}
							fontSize={20}
							color={
								storyWithDistance.type === "normal"
									? "var(--chakra-colors-green-500)"
									: "var(--chakra-colors-yellow-400)"
							}
						>
							<IoMdPin />
						</Icon>
						<Text
							textStyle="2xl"
							style={{ textWrap: "balance" }}
							fontWeight={"bold"}
						>
							{storyWithDistance.title}
						</Text>
					</HStack>
					<Text>{Math.floor(storyWithDistance.distance)}m</Text>
				</HStack>
				<DataList.Root w="100%" orientation="horizontal">
					<DataList.Item>
						<DataList.ItemLabel>難易度</DataList.ItemLabel>
						<DataList.ItemValue>
							<RatingGroup.Root
								readOnly
								count={5}
								defaultValue={storyWithDistance.difficulty}
								size="sm"
								colorPalette={"yellow"}
							>
								<RatingGroup.HiddenInput />
								<RatingGroup.Control>
									{Array.from({ length: 5 }).map((_, index) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
										<RatingGroup.Item key={index} index={index + 1}>
											<RatingGroup.ItemIndicator />
										</RatingGroup.Item>
									))}
								</RatingGroup.Control>
							</RatingGroup.Root>
						</DataList.ItemValue>
					</DataList.Item>
					<DataList.Item>
						<DataList.ItemLabel>エリア</DataList.ItemLabel>
						<DataList.ItemValue>{storyWithDistance.area}</DataList.ItemValue>
					</DataList.Item>
					<DataList.Item>
						<DataList.ItemLabel>所要時間</DataList.ItemLabel>
						<DataList.ItemValue>
							{storyWithDistance.estimated_time}
						</DataList.ItemValue>
					</DataList.Item>
					<DataList.Item>
						<DataList.ItemLabel>あらすじ(概要)</DataList.ItemLabel>
						<DataList.ItemValue>
							<VStack alignItems="flex-start">
								{storyWithDistance.content.split("\n").map((line) => (
									<Text key={line}>{line}</Text>
								))}
							</VStack>
						</DataList.ItemValue>
					</DataList.Item>
				</DataList.Root>
				<Flex w="100%" justifyContent="center" alignItems="center">
					<ButtonGroup size="sm">
						<Link href={`/story/${storyWithDistance.id}/challenge/${firstQuestionId?.toString()}`}>
							<Button colorPalette="blue" p={1} size={"sm"}>
								<IoMdFlag />
								<Text fontWeight={"bold"} textStyle={"sm"}>
									この謎解きに挑戦する
								</Text>
							</Button>
						</Link>
						<Link href="/">
							<Button
								colorPalette={"red"}
								variant={"outline"}
								borderColor={"red.500"}
								p={1}
								size={"sm"}
							>
								<Text fontWeight={"bold"} textStyle={"sm"}>
									←トップページに戻る
								</Text>
							</Button>
						</Link>
					</ButtonGroup>
				</Flex>
			</VStack>
		</div>
	);
}
