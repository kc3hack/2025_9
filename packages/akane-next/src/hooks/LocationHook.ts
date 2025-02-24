import { LocationContext } from "@/context/LocationContext";
import { useContext } from "react";

export const useLocation = () => {
	const context = useContext(LocationContext);
	if (!context) {
		throw new Error("useLocation must be used within a LocationProvider");
	}
	return context;
};
