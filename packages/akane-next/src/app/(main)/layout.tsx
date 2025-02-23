import { BottomSheetProvider } from "@/context/BottomSheetContext";
import { HeaderQuestionProvider } from "@/context/HeaderQuestionContext";
import { LocationProvider } from "@/context/LocationContext";
import { MapProvider } from "@/context/MapContext";
import { Box } from "@chakra-ui/react";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MapProvider>
            <LocationProvider>
                <HeaderQuestionProvider>
                    <BottomSheetProvider>
                        <Box
                            pos="relative"
                            h="100dvh"
                            w="100vw"
                            overflow="hidden"
                        >
                            {children}
                        </Box>
                    </BottomSheetProvider>
                </HeaderQuestionProvider>
            </LocationProvider>
        </MapProvider>
    );
}