"use client";
import React, { createContext, ReactNode, useState } from 'react';

interface SplashScreenContextProps {
    isShown: boolean;
    setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
    animationTime: number;
    setAnimationTime: React.Dispatch<React.SetStateAction<number>>;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export const SplashScreenContext = createContext<SplashScreenContextProps | undefined>(undefined);

export const SplashScreenProvider = ({
    children
}: Readonly<{
    children: ReactNode;
}>) => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [animationTime, setAnimationTime] = useState<number>(0);
    const [text, setText] = useState<string>('');

    return (
        <SplashScreenContext.Provider value={{
            isShown,
            setIsShown,
            animationTime,
            setAnimationTime,
            text,
            setText
        }}>
            {children}
        </SplashScreenContext.Provider>
    );
};