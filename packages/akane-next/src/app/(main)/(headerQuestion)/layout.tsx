"use client";
import { useHeaderQuestion } from "@/hooks/HeaderQuestionHook";
import { Box, Button, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle } from "@/components/ui/dialog";

export default function HeaderQuestionLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    const {
        title,
        content,
        storyId,
        isDisplay,
        isDialogOpen,
        dialogType,
        setIsDialogOpen,
        nextQuestionId,
    } = useHeaderQuestion();
    return (
        <>
            
            <DialogRoot
                placement="center"
                size="lg"
                open={isDialogOpen}
                onOpenChange={e => setIsDialogOpen(e.open)}
            >
                <DialogContent
                    pos={"fixed"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={100000}
                    bgColor="white"
                    justifyContent="center"
                    alignItems="center"
                >
                    <DialogHeader>
                        <DialogTitle>
                            <Text textStyle="4xl">
                                {dialogType === "correct" ? "正解！" : "不正解！"}
                            </Text>
                        </DialogTitle>
                    </DialogHeader>
                    <DialogBody
                        w="100%"
                        h="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {dialogType === "correct" ? (
                            <>
                                <Text textStyle="2xl">
                                    おめでとうございます！正解です！
                                </Text>
                                <Image
                                    src="/correct.png"
                                    alt="正解"
                                />
                            </>
                        ) : (
                                <>
                                    <Text textStyle="2xl">
                                        残念！不正解です！
                                    </Text>
                                    <Image
                                        src="/incorrect.png"
                                        alt="不正解"
                                    />
                                </>
                        )}
                    </DialogBody>
                    <DialogFooter>
                        {dialogType === "correct" ? (
                            <VStack
                                w="100%"
                                gap={4}
                            >
                                <Link href={`/story/${storyId}/challenge/${nextQuestionId}`}>
                                    <Button
                                        p={4}
                                        colorPalette="blue"
                                    >
                                        次の問題へ進む
                                    </Button>
                                </Link>
                                <Link href={`/story/${storyId}`}>
                                    <Button
                                        p={4}
                                        variant="outline"
                                        colorPalette="blue"
                                        color="black"
                                    >
                                        ストーリーに戻る
                                    </Button>
                                </Link>
                            </VStack>
                        ) : (
                            <Text>
                                5秒後に自動的に閉じます
                            </Text>
                        )}
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
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