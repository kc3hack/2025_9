"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextProps {
    position: GeolocationPosition | null;
    setPosition: React.Dispatch<React.SetStateAction<GeolocationPosition | null>>;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [position, setPosition] = useState<GeolocationPosition | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition(position);
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
    }, []);

    return (
        <LocationContext.Provider value={{ position, setPosition }}>
            {children}
        </LocationContext.Provider>
    );
};