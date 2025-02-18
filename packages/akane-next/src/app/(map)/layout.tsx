"use client";

import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

export default function MapLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
    const mapContainer = useRef(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);

    useEffect(() => {
        const initializeMap = (
            {
                setMap,
                mapContainer
            }: {
                setMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>,
                mapContainer: React.RefObject<HTMLDivElement | null>
            }
        ) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current as HTMLDivElement,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [135.739078, 34.995022],
                zoom: 20,
            }).addControl(
                new MapboxLanguage({ defaultLanguage: 'ja' })
            ).on('load', () => {
                setMap(map);
                map.resize();
            });
            
            new mapboxgl.Marker({ color: "#d259ee" })
                .setLngLat([135.739078, 34.995022])
                .addTo(map)
                .setPopup(new mapboxgl.Popup().setHTML('<h1>Hello, world!</h1>'));
            
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);

    return (
        <>
            <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
            {children}
        </>
    )
}