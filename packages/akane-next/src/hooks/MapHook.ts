import { useContext } from 'react';
import { MapContext } from '@/context/MapContext';

export const useMap = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMap must be used within a MapProvider');
    }
    return context;
};