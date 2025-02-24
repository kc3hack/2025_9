"use client";
import { useSplashScreen } from "@/hooks/SplashScreenHook";
import { Text, VStack } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

export default function SplashScreenLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {
    const {
        isShown,
        setIsShown,
        animationTime,
        text
    } = useSplashScreen();
    const [isDisplay, setIsDisplay] = useState<boolean[]>(text.split("\n").map(() => false)); //絶対に個数はtext.split("\n").lengthにする
    const [isShownDisplay, setIsShownDisplay] = useState<boolean>(false);

    useEffect(() => {
        if (isShown) {
            setIsShownDisplay(true);
            text.split("\n").forEach((_, i) => {
                setTimeout(() => {
                    // isDisplay = [false, false ...]を isDisplay[i] = true;にどんどん変更していく
                    setIsDisplay(
                        text.split("\n").map((_, j) => j <= i)
                    )
                    console.log(isDisplay, text.split("\n").length);
                }, i * animationTime * 1000);
            });
            setTimeout(() => {
                setIsShown(false);
                setTimeout(() => setIsShownDisplay(false), 500);
            }, text.split("\n").length * animationTime * 1000);
        } else {
            setIsDisplay(text.split("\n").map(() => false));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShown])

    return (
        <>
            <VStack
                pos="fixed"
                display={isShownDisplay ? "flex" : "none"}
                justifyContent="center"
                alignItems="center"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={1000}
                backgroundColor="rgba(255,255,255, 0.5)"
                backdropFilter="auto"
                backdropBlur="lg"
                transition={`opacity 0.5s`}
                opacity={isShown ? 1 : 0}
            >
                {text.split('\n').map((t, i) => ( 
                    <Text
                        key={i}
                        textAlign="center"
                        textStyle="xl"
                        fontWeight="bold"
                        mt={4}
                        opacity={isDisplay[i] ? 1 : 0}
                        transform={`translateY(${isDisplay[i] ? 0 : 20}px)`}
                        transition={`all 0.5s`}
                    >
                        {t}
                    </Text>
                ))}
            </VStack>
            {children}
        </>
    );
}