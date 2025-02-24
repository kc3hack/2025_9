import { BottomSheetProvider } from "@/context/BottomSheetContext";
import { HeaderQuestionProvider } from "@/context/HeaderQuestionContext";
import { LocationProvider } from "@/context/LocationContext";
import { MapProvider } from "@/context/MapContext";
import { SplashScreenProvider } from "@/context/SplashScreenContext";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MapProvider>
            <LocationProvider>
                <HeaderQuestionProvider>
                    <SplashScreenProvider>
                        <BottomSheetProvider>
                            {children}
                        </BottomSheetProvider>
                    </SplashScreenProvider>
                </HeaderQuestionProvider>
            </LocationProvider>
        </MapProvider>
    );
}