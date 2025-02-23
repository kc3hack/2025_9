"use client";
import { HeaderQuestionContext } from '@/context/HeaderQuestionContext';
import { useContext } from 'react';


export const useHeaderQuestion = () => {
    const context = useContext(HeaderQuestionContext);
    if (!context) {
        throw new Error('useHeaderQuestion must be used within a HeaderQuestionProvider');
    }
    return context;
};