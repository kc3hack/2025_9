"use client";

import { getDistanceByTwoPoints } from "@/helper/location";
import { useBottomSheet } from "@/hooks/BottomSheetHook";
import { useLocation } from "@/hooks/LocationHook";
import { useMap } from "@/hooks/MapHook";
import { Button, DataList, Flex, HStack, Icon, Image, Link, Text, VStack } from "@chakra-ui/react";
import { Story } from "@prisma/client";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";
import { IoMdFlag, IoMdPin } from "react-icons/io";
import * as turf from '@turf/turf';

export default function StoryDetailClientPage({
    story
}: {
    story: Story;
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
    useEffect(() => {
        setSnap(snapPoints[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!map || !isMapLoaded) {
            return;
        }
        const marker = new mapboxgl.Marker({ color: story.type === "normal"? "var(--chakra-colors-green-500)" : "var(--chakra-colors-yellow-400)" })
            .setLngLat([story.longitude, story.latitude])
            .addTo(map)
            .setPopup(new mapboxgl.Popup().setHTML('<h1>Hello, world!</h1>'));
        // story.radius(メートル単位)を使って、円を描画する turfで
        const circle = turf.circle(
            [
                story.longitude,
                story.latitude
            ],
            story.radius,
            {
                steps: 100,
                units: 'meters'
            }
        );
        map.addSource('circle', {
            type: 'geojson',
            data: circle,
        });
        map.addLayer({
            id: 'circle',
            type: 'fill',
            source: 'circle',
            layout: {},
            paint: {
                'fill-color': "#4169e1",
                'fill-opacity': 0.5,
            },
        });
        return () => {
            marker.remove();
            map.removeLayer('circle');
            map.removeSource('circle');
        }
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
            story.longitude
        )
    };

    return (
        <div>
            <Link href="/">
                ←トップページに戻る
            </Link>
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
                <HStack
                    justifyContent="space-between"
                    w="100%"
                >
                    <HStack
                        gap={2}
                        alignItems="flex-start"
                    >
                        <Icon
                            boxSize={6}
                            fontSize={20}
                            color={storyWithDistance.type === "normal" ? "var(--chakra-colors-green-500)" : "var(--chakra-colors-yellow-400)"}
                        >
                            <IoMdPin />
                        </Icon>
                        <Text textStyle="2xl">{storyWithDistance.title}</Text>
                    </HStack>
                    <Text>
                        {storyWithDistance.distance}m
                    </Text>
                </HStack>
                <DataList.Root
                    w="100%"
                    orientation="horizontal"
                >
                    <DataList.Item>
                        <DataList.ItemLabel>難易度</DataList.ItemLabel>
                        <DataList.ItemValue>{storyWithDistance.difficulty}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>エリア</DataList.ItemLabel>
                        <DataList.ItemValue>{storyWithDistance.area}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>所要時間</DataList.ItemLabel>
                        <DataList.ItemValue>{storyWithDistance.estimated_time}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>あらすじ(概要)</DataList.ItemLabel>
                        <DataList.ItemValue>
                            <VStack alignItems="flex-start">
                                {storyWithDistance.content.split("\n").map((line, i) => (
                                    <Text key={i}>
                                        {line}
                                    </Text>
                                ))}
                            </VStack>
                        </DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>
                <Flex
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Link href={`/story/${storyWithDistance.id}/challenge/0`}>
                        <Button
                            colorPalette="blue"
                            size="lg"
                            borderRadius="lg"
                            p={4}
                        >
                            <IoMdFlag />
                            この謎解きに挑戦する
                        </Button>
                    </Link>
                </Flex>
            </VStack>
        </div>
    );
}