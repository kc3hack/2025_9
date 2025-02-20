"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useLocation } from '@/hooks/LocationHook';
import { useMap } from '@/hooks/MapHook';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    const { position } = useLocation(); // useLocationフックを使用して位置情報を取得
    const [mapCenter, setMapCenter] = useState<[number, number]>(position ? [position.coords.longitude, position.coords.latitude] : [135.739078, 34.995022]);
    const { map, mapContainerRef, isMapLoaded } = useMap();

    useEffect(() => {
        if (map) {
            new mapboxgl.Marker({ color: "#d259ee" })
                .setLngLat([135.739078, 34.995022])
                .addTo(map)
                .setPopup(new mapboxgl.Popup().setHTML('<h1>Hello, world!</h1>'));

            map.on('move', () => {
                const mapCenter = map.getCenter();
                setMapCenter([mapCenter.lng, mapCenter.lat]);
            });
        }
    }, [map]);

    useEffect(() => {
        if (map && position && isMapLoaded) {
            // 白くて青のアウトラインが入った円を描画
            map.addSource('position', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [position.coords.longitude, position.coords.latitude],
                    },
                    properties: {},
                },
            });
            map.addLayer({
                id: 'position',
                type: 'circle',
                source: 'position',
                paint: {
                    'circle-radius': 10,
                    'circle-color': 'white',
                    'circle-stroke-color': 'blue',
                    'circle-stroke-width': 2,
                },
            });
            /*
            map.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 20,
                duration: 500,
            });
            */
        }

        return () => {
            if (map) {
                if (map.getLayer('position')) map.removeLayer('position');
                if (map.getSource('position')) map.removeSource('position');
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, isMapLoaded]);

    return (
        <>
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                {mapCenter[0].toFixed(6)}, {mapCenter[1].toFixed(6)}
                {position && (
                    <>
                        <br />
                        {position.coords.longitude.toFixed(6)}, {position.coords.latitude.toFixed(6)}
                    </>
                )}
            </div>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
            {children}
        </>
    );
}