"use client";
import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

interface MapContextProps {
    map: mapboxgl.Map | null;
    mapContainerRef: React.RefObject<HTMLDivElement | null>;
    isMapLoaded: boolean;
}

export const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (mapContainerRef.current) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
            const mapInstance = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: process.env.NEXT_PUBLIC_MAPBOX_MAP_STYLE ?? 'mapbox://styles/mapbox/streets-v11',
                center: [135.739078, 34.995022],
                zoom: 20,
            }).addControl(
                new MapboxLanguage({ defaultLanguage: 'ja' })
            ).on('load', () => {
                setIsMapLoaded(true);
                navigator.geolocation.getCurrentPosition((position) => {
                    mapInstance.flyTo({
                        center: [position.coords.longitude, position.coords.latitude],
                        zoom: 20,
                        duration: 0,
                    });
                });
            });

            setMap(mapInstance);

            return () => {
                mapInstance.remove();
            };
        }
    }, []);

    return (
        <MapContext.Provider value={{ map, mapContainerRef, isMapLoaded }}>
            {children}
        </MapContext.Provider>
    );
};