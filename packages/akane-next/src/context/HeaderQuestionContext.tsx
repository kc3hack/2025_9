"use client";
import React, { createContext, ReactNode, useState } from 'react';

interface BottomSheetContextProps {
    isDisplay: boolean;
    setIsDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const HeaderQuestionContext = createContext<BottomSheetContextProps | undefined>(undefined);

export const HeaderQuestionProvider = ({
    children
}: Readonly<{
    children: ReactNode;
}>) => {
    const [isDisplay, setIsDisplay] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    return (
        <HeaderQuestionContext.Provider
            value={{
                isDisplay,
                setIsDisplay,
                title,
                setTitle,
                content,
                setContent
            }}>
            {children}
        </HeaderQuestionContext.Provider>
    );
};