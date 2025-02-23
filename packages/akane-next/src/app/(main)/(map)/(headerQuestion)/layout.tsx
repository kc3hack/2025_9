"use client";
import { useHeaderQuestion } from "@/hooks/HeaderQuestionHook";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function HeaderQuestionLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    const { title, content, isDisplay } = useHeaderQuestion();
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
                >
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
                </HStack>
            )}
            {children}
        </>
    );
}