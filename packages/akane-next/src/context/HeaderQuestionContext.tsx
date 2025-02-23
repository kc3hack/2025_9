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
    isDialogOpen: boolean;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dialogType: "correct" | "incorrect";
    setDialogType: React.Dispatch<React.SetStateAction<"correct" | "incorrect">>;
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
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [dialogType, setDialogType] = useState<"correct" | "incorrect">("correct");

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
                isDialogOpen,
                setIsDialogOpen,
                dialogType,
                setDialogType
            }}>
            {children}
        </HeaderQuestionContext.Provider>
    );
};