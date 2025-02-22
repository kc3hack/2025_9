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
                snapPoints={({ maxHeight }) => [maxHeight * 0.5, maxHeight * 0.7]}
                defaultSnap={({ lastSnap, snapPoints }) =>
                    lastSnap ?? Math.max(...snapPoints)
                }
                ref={bottomSheetRef}
            >
                <Box
                    p="4"
                >
                    {children}
                </Box>
            </BottomSheet>
        </Box>
    );
}