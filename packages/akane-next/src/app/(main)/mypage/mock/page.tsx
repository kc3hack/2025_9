"use client";

import { getDistanceByTwoPoints } from "@/helper/location";
import { useBottomSheet } from "@/hooks/BottomSheetHook";
import { useLocation } from "@/hooks/LocationHook";
import { useMap } from "@/hooks/MapHook";
import { RatingGroup } from "@chakra-ui/react";
import {
	Button,
	DataList,
	Flex,
	HStack,
	Icon,
	Image,
	Link,
	Text,
	VStack,
} from "@chakra-ui/react";

import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { IoMdFlag, IoMdPin } from "react-icons/io";
import * as turf from "@turf/turf";

export default function StoryDetailClientPage() {
	const story = {
		id: BigInt("101255084679102467"),
		user_account_id: BigInt("101255084679102467"),
		title: "安土城の謎を解き明かせ",
		content: "安土城に隠された謎を君の手で解き明かせ！",
		image_url: "/castle.png",
		type: "long",
		status: "public",
		difficulty: 4,
		estimated_time: "1~2時間",
		area: "安土城周辺",
		radius: 5,
		latitude: 135,
		longitude: 35,
		pin_class: null,
		created_at: new Date(),
		updated_at: new Date(),
	};

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
	useEffect(() => {
		setSnap(snapPoints[1]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	const storyWithDistance = {
		...story,
		distance: getDistanceByTwoPoints(
			position?.coords.latitude ?? 135,
			position?.coords.longitude ?? 35,
			story.latitude,
			story.longitude,
		),
	};

	return (
		<div>
			<Link href="/">←トップページに戻る</Link>
			<VStack
				alignItems="flex-start"
				w="100%"
				borderRadius="lg"
				borderColor="gray.200"
				borderWidth={1}
				p={4}
				bg="white"
				gap={4}
			>
				<Image
					width="640px"
					src={storyWithDistance.image_url ?? ""}
					alt={storyWithDistance.title}
				/>
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
						<Text textStyle="2xl">{storyWithDistance.title}</Text>
					</HStack>
				</HStack>
				<Text marginLeft="7">243m</Text>
				<DataList.Root w="100%" orientation="horizontal">
					<DataList.Item>
						<DataList.ItemLabel>難易度</DataList.ItemLabel>
						<DataList.ItemValue>
							<RatingGroup.Root
								count={5}
								value={storyWithDistance.difficulty}
								colorPalette="yellow"
							>
								<RatingGroup.HiddenInput />
								<RatingGroup.Control>
									{Array.from({ length: 5 }).map((_, index) => (
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
								{storyWithDistance.content.split("\n").map((line, i) => (
									<Text key={i}>{line}</Text>
								))}
							</VStack>
						</DataList.ItemValue>
					</DataList.Item>
				</DataList.Root>
				<Flex w="100%" justifyContent="center" alignItems="center">
					<Link href={`/story/${storyWithDistance.id}/challenge/0`}>
						<Button colorPalette="blue" size="lg" borderRadius="lg" p={4}>
							<IoMdFlag />
							この謎解きに挑戦する
						</Button>
					</Link>
				</Flex>
			</VStack>
		</div>
	);
}
