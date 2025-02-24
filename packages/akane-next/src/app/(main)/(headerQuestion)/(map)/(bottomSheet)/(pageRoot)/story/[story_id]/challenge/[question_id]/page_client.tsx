"use client";

import { useBottomSheet } from "@/hooks/BottomSheetHook";
import { useHeaderQuestion } from "@/hooks/HeaderQuestionHook";
import { Button, Flex, HStack, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { Hint, Question, QuestionHint } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdLock, IoMdUnlock } from "react-icons/io";

export default function QuestionChallengeClientPage({
    question,
    questionHints,
    nextQuestionId,
}: {
    question: Question;
    questionHints: (QuestionHint & Hint)[];
    nextQuestionId: bigint | null;
    //story_progression: StoryProgression;
}) {
    const { setSnap, snapPoints} = useBottomSheet();
    const {
        setTitle,
        setContent,
        setStoryId,
        setNextQuestionId,
        setIsDisplay,
        isCheckAnswerShow,
        setIsCheckAnswerShow,
        isCorrect,
        setIsCorrect,
    } = useHeaderQuestion();
    useEffect(() => {
        setSnap(snapPoints[0]);
        setIsDisplay(true);
        setTitle(question.title);
        setContent(question.content);
        setStoryId(question.story_id);
        setNextQuestionId(nextQuestionId ?? 0n);
        return () => {
            setIsDisplay(false);
            setIsCheckAnswerShow(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [questionHintsUnlocked, setQuestionHintsUnlocked] = useState<boolean[]>(questionHints.map(() => false));
    const [answer, setAnswer] = useState<string>("");
    const handleCheckAnswer = () => {
        if (answer === question.answer) {
            setIsCorrect(true);
            setStoryId(question.story_id);
            if (nextQuestionId) {
                setNextQuestionId(BigInt(nextQuestionId));
            }
            setIsCheckAnswerShow(true);
        } else {
            setIsCorrect(false);
            setIsCheckAnswerShow(true);
            setTimeout(() => {
                setIsCheckAnswerShow(false);
            }, 1000 * 5);
        }
    };

    if (isCheckAnswerShow && isCorrect) {
        return (
            <VStack
                w="100%"
                h="100%"
                gap={4}
            >
                <Link href={`/story/${question.story_id}/challenge/${nextQuestionId}`}>
                    <Button
                        p={4}
                        colorPalette="blue"
                    >
                        次の問題に進む
                    </Button>
                </Link>
                <Link href={`/story/${question.story_id}`}>
                    <Button
                        p={4}
                        colorPalette="blue"
                        variant="outline"
                    >
                        ストーリーに戻る
                    </Button>
                </Link>
            </VStack>
        );
    }

    return (<>
        
        <VStack
            w="100%"
            h="100%"
            gap={4}
        >
            <form
                style={{ width: "100%" }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCheckAnswer();
                }}
            >
                <HStack
                    w="100%"
                    justifyContent="space-between"
                    gap={4}
                >
                    <Input
                        placeholder="回答入力欄"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={isCheckAnswerShow}
                    />
                    <Button
                        p={4}
                        colorPalette="blue"
                        type="submit"
                        disabled={answer === "" || isCheckAnswerShow}
                    >
                        回答！
                    </Button>
                </HStack>
            </form>
            {questionHints.map((hint, index) => (
                <HStack
                    key={hint.id}
                    w="100%"
                    gap={4}
                    p={4}
                    borderColor="gray.200"
                    borderWidth="1px"
                    borderRadius="lg"
                >
                    <Icon
                        fontSize={36}
                        boxSize={12}
                        color="black"
                        bgColor="gray.100"
                        p={2}
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="gray.200"
                    >
                        {questionHintsUnlocked[index] ? (
                            <IoMdUnlock />
                        ) : (
                            <IoMdLock />
                        )}
                    </Icon>
                    <VStack
                        pos="relative"
                        alignItems="flex-start"
                        gap={2}
                        w="100%"
                    >
                        {questionHintsUnlocked[index] ? (
                            <>
                                <Text>
                                    {hint.title}
                                </Text>
                                <Text>
                                    {hint.content}
                                </Text>
                            </>
                        ) : (
                                <>
                                    <VStack
                                        w="100%"
                                        alignItems="flex-start"
                                        filter="auto"
                                        blur="sm"
                                        color="black"
                                        zIndex={100}
                                        gap={2}
                                    >
                                        <Text>
                                            {hint.title}
                                        </Text>
                                        <Text>
                                            {hint.content}
                                        </Text>
                                    </VStack>
                                    <Flex
                                        pos="absolute"
                                        justifyContent="center"
                                        alignItems="center"
                                        w="100%"
                                        h="100%"
                                        top={0}
                                        left={0}
                                        right={0}
                                        bottom={0}
                                        backgroundColor="rgba(255, 255, 255, 0.2)"
                                        zIndex={1000}
                                    >
                                        <Button
                                            colorPalette="teal"
                                            p={4}
                                            onClick={() => {
                                                const newQuestionHintsUnlocked = [...questionHintsUnlocked];
                                                newQuestionHintsUnlocked[index] = true;
                                                setQuestionHintsUnlocked(newQuestionHintsUnlocked);
                                            }}
                                        >
                                            ヒント{index}を見る
                                        </Button>
                                    </Flex>
                                </>
                        )}
                    </VStack>
                </HStack>
            ))}
        </VStack>
    </>
    );
}