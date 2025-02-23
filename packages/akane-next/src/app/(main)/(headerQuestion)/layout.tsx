"use client";
import { useHeaderQuestion } from "@/hooks/HeaderQuestionHook";
import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function HeaderQuestionLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    const {
        title,
        content,
        isDisplay,
        isCheckAnswerShow,
        isCorrect,
    } = useHeaderQuestion();

    return (
        <>
            {isDisplay && (
                <HStack
                    pos="fixed"
                    alignItems="space-between"
                    top={0}
                    left={0}
                    right={0}
                    m={4}
                    p={4}
                    zIndex={1000}
                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="#e0e0e0"
                    backgroundColor="#fff"
                    transition={"all 0.3s"}
                >
                    {isCheckAnswerShow? (
                        <VStack
                            w="100%"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                textStyle="2xl"
                                fontWeight="bold"
                            >
                                {isCorrect ? "正解" : "不正解"}
                            </Text>
                            <Image
                                w="50%"
                                src={isCorrect ? "/correct.png" : "/incorrect.png"}
                                alt={isCorrect ? "正解" : "不正解"}
                            />
                        </VStack>
                    ) : <>
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontSize={24}
                                color="#000"
                            >
                                ?
                            </Text>
                        </Flex>
                        <VStack
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Text
                                textStyle="xl"
                            >
                                {title}
                            </Text>
                            <Box>
                                {content}
                            </Box>
                            </VStack>
                        </>
                    }
                </HStack>
            )}
            <Box
                pos="relative"
                h="100dvh"
                w="100vw"
                overflow="hidden"
            >
                {children}
            </Box>
        </>
    );
}