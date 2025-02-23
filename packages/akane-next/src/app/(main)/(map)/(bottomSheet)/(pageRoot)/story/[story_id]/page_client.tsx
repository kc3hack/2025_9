"use client";

import { useMap } from "@/hooks/MapHook";
import { Link, Text } from "@chakra-ui/react";
import { Story } from "@prisma/client";
import mapboxgl from "mapbox-gl";
import { useEffect } from "react";

export default function StoryDetailClientPage({
    story
}: {
    story: Story;
}) {
    const { map } = useMap();


    if (map) {
        map.flyTo({
            center: [story.longitude, story.latitude],
            zoom: 20,
            duration: 2000,
        });
    }

    useEffect(() => {
        if (!map) {
            return;
        }
        const marker = new mapboxgl.Marker({ color: story.type === "normal"? "var(--chakra-colors-green-500)" : "var(--chakra-colors-yellow-400)" })
            .setLngLat([story.longitude, story.latitude])
            .addTo(map)
            .setPopup(new mapboxgl.Popup().setHTML('<h1>Hello, world!</h1>'));
        return () => {
            marker.remove();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    return (
        <div>
            <Link href="/">
                ←トップページに戻る
            </Link>
            <Text textStyle="2xl">{story.title}</Text>
            <Text>{story.content}</Text>
            <Text>{story.image_url}</Text>
            <Text>{story.type}</Text>
            <Text>{story.status}</Text>
            <Text>{story.difficulty}</Text>
            <Text>{story.estimated_time}</Text>
            <Text>{story.area}</Text>
            <Text>{story.radius}</Text>
            <Text>{story.longitude}</Text>
            <Text>{story.latitude}</Text>
            <Text>{story.pin_class}</Text>
            <Text textStyle="2xl">謎解き詳細</Text>
            <Text>{story.id}</Text>
        </div>
    );
}