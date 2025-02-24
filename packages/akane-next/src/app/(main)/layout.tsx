import { BottomSheetProvider } from "@/context/BottomSheetContext";
import { HeaderQuestionProvider } from "@/context/HeaderQuestionContext";
import { LocationProvider } from "@/context/LocationContext";
import { MapProvider } from "@/context/MapContext";

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
                        {children}
                    </BottomSheetProvider>
                </HeaderQuestionProvider>
            </LocationProvider>
        </MapProvider>
    );
}