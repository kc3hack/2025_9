"use client";
import { useBottomSheet } from "@/hooks/BottomSheetHook";
import { ReactNode } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Box } from "@chakra-ui/react";

import "react-spring-bottom-sheet/dist/style.css";

export default function BottomSheetLayout({ children }: { children: ReactNode }) {
    const bottomSheetRef = useBottomSheet().bottomSheetRef;
    return (
        <Box
            zIndex={1000}
        >
            <BottomSheet
                open
                blocking={false}
                ref={bottomSheetRef}
            >
                <Box
                    bg="white"
                    borderTopRadius="20px"
                    p="4"
                    minH={{ base: "40vh", md: "100vh" }}
                >
                    {children}
                </Box>
            </BottomSheet>
        </Box>
    );
}