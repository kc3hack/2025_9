"use client";
import React, { createContext, useRef, ReactNode } from 'react';
import { BottomSheetRef } from 'react-spring-bottom-sheet';

interface BottomSheetContextProps {
    bottomSheetRef: React.RefObject<BottomSheetRef | null>;
}

export const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

export const BottomSheetProvider = ({
    children
}: Readonly<{
    children: ReactNode;
}>) => {
    const bottomSheetRef = useRef<BottomSheetRef | null>(null);

    return (
        <BottomSheetContext.Provider value={{ bottomSheetRef }}>
            {children}
        </BottomSheetContext.Provider>
    );
};