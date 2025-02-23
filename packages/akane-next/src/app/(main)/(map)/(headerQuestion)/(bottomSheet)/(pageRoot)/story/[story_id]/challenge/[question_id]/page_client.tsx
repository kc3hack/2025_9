"use client";

import { useBottomSheet } from "@/hooks/BottomSheetHook";
import { useHeaderQuestion } from "@/hooks/HeaderQuestionHook";
import { Question, StoryProgression } from "@prisma/client";
import { useEffect } from "react";

export default function QuestionChallengeClientPage({
    question,
}: {
    question: Question;
    nextQuestionId: bigint | null;
    story_progression: StoryProgression;
}) {
    const { setSnap, snapPoints} = useBottomSheet();
    const { setTitle, setContent, setIsDisplay } = useHeaderQuestion();
    useEffect(() => {
        setSnap(snapPoints[0]);
        setIsDisplay(true);
        setTitle(question.title);
        setContent(question.content);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            a
        </>
    );
}