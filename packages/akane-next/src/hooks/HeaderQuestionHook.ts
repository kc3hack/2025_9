"use client";
import { HeaderQuestionContext } from '@/context/HeaderQuestionContext';
import { useContext } from 'react';


export const useHeaderQuestion = () => {
    const context = useContext(HeaderQuestionContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider');
    }
    return context;
};