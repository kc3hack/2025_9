import { BottomSheetProvider } from "@/context/BottomSheetContext";
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
                <BottomSheetProvider>
                    <Box
                        pos="relative"
                        h="100vh"
                        w="100vw"
                        overflow="hidden"
                    >
                        {children}
                    </Box>
                </BottomSheetProvider>
            </LocationProvider>
        </MapProvider>
    );
}