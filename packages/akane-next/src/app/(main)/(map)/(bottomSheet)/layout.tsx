"use client";
import { useBottomSheet } from "@/hooks/BottomSheetHook";
import { Box } from "@chakra-ui/react";

import { Drawer } from "vaul";

export default function BottomSheetLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    // https://vaul.emilkowal.ski/
    const { snap, setSnap, snapPoints } = useBottomSheet();
    return (
        <Box
            zIndex={1000}
        >
            <Drawer.Root
                snapPoints={snapPoints}
                activeSnapPoint={snap}
                setActiveSnapPoint={setSnap}
                modal={false}
                dismissible={true}
                open={true}
            >

                <Drawer.Portal>
                    <Drawer.Overlay style={{ position: "fixed", inset: 0, backgroundColor: "#2d2d2d" }}/>
                    <Drawer.Content
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "#fff",
                            boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
                            borderRadius: "2rem 2rem 0 0",
                        }}>
                        <Drawer.Title></Drawer.Title>
                        <Drawer.Handle style={{ width: "10rem", height: ".5rem", margin: "1rem auto", backgroundColor: "#e0e0e0" }}/>
                        <Box padding={4}>
                            {children}
                        </Box>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </Box>
    );
}