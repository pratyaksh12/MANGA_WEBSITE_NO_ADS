"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chapter, Manga } from '@/lib/types';

interface MangaContextType {
    currentManga: Manga | null;
    chapterList: Chapter[];
    setCurrentManga: (manga: Manga) => void;
    setChapterList: (chapters: Chapter[]) => void;
}

const MangaContext = createContext<MangaContextType | undefined>(undefined);

export function MangaProvider({ children }: { children: ReactNode }) {
    const [currentManga, setCurrentManga] = useState<Manga | null>(null);
    const [chapterList, setChapterList] = useState<Chapter[]>([]);

    return (
        <MangaContext.Provider value={{ currentManga, chapterList, setCurrentManga, setChapterList }}>
            {children}
        </MangaContext.Provider>
    );
}

export function useManga() {
    const context = useContext(MangaContext);
    if (context === undefined) {
        throw new Error('useManga must be used within a MangaProvider');
    }
    return context;
}
