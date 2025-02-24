"use client";
import { useContext } from 'react';
import { SplashScreenContext } from '@/context/SplashScreenContext';

export const useSplashScreen = () => {
    const context = useContext(SplashScreenContext);
    if (!context) {
        throw new Error('useSplashScreen must be used within a SplashScreenProvider');
    }
    return context;
};