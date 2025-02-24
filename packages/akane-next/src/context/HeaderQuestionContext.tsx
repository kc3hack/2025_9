"use client";
import React, { createContext, ReactNode, useState } from 'react';

interface BottomSheetContextProps {
    isDisplay: boolean;
    setIsDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    storyId: bigint;
    setStoryId: React.Dispatch<React.SetStateAction<bigint>>;
    nextQuestionId: bigint;
    setNextQuestionId: React.Dispatch<React.SetStateAction<bigint>>;
    isCheckAnswerShow: boolean;
    setIsCheckAnswerShow: React.Dispatch<React.SetStateAction<boolean>>;
    isCorrect: boolean;
    setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [storyId, setStoryId] = useState<bigint>(0n);
    const [nextQuestionId, setNextQuestionId] = useState<bigint>(0n);
    const [isCheckAnswerShow, setIsCheckAnswerShow] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    return (
        <HeaderQuestionContext.Provider
            value={{
                isDisplay,
                setIsDisplay,
                title,
                setTitle,
                content,
                setContent,
                storyId,
                setStoryId,
                nextQuestionId,
                setNextQuestionId,
                isCheckAnswerShow,
                setIsCheckAnswerShow,
                isCorrect,
                setIsCorrect
            }}>
            {children}
        </HeaderQuestionContext.Provider>
    );
};