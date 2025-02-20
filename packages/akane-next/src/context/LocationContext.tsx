"use client";
import { useMap } from '@/hooks/MapHook';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextProps {
    position: GeolocationPosition | null;
    setPosition: React.Dispatch<React.SetStateAction<GeolocationPosition | null>>;
}

export const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const map = useMap();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            // useMap hook called at the top level
            if (map.map && map.isMapLoaded && position) {
                map.map.flyTo({
                    center: [position.coords.longitude, position.coords.latitude],
                    zoom: 20,
                });
            }
        });

        const watchId = navigator.geolocation.watchPosition(
            setPosition,
            (error) => {
                switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert('位置情報の取得が許可されていません');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('位置情報が利用できません');
                    break;
                case error.TIMEOUT:
                    alert('位置情報の取得にタイムアウトしました');
                    break;
                default:
                    alert('位置情報の取得中にエラーが発生しました');
                    break;
                }
                setPosition(null);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LocationContext.Provider value={{ position, setPosition }}>
            {children}
        </LocationContext.Provider>
    );
};