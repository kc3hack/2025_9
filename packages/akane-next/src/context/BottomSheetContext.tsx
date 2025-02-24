"use client";
import React, { createContext, ReactNode, useState } from "react";

interface BottomSheetContextProps {
	snap: number | string | null;
	setSnap: React.Dispatch<React.SetStateAction<number | string | null>>;
	snapPoints: Array<number | string>;
}

export const BottomSheetContext = createContext<
	BottomSheetContextProps | undefined
>(undefined);

export const BottomSheetProvider = ({
	children,
}: Readonly<{
	children: ReactNode;
}>) => {
	const snapPoints = [0.4, 0.7, 0.9];
	const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

	return (
		<BottomSheetContext.Provider value={{ snap, setSnap, snapPoints }}>
			{children}
		</BottomSheetContext.Provider>
	);
};
