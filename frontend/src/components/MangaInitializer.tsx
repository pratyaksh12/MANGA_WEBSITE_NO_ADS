"use client"
import { useEffect } from 'react';
import { useManga } from '@/context/MangaContext';
import { Manga, Chapter } from '@/lib/types';

interface Props {
    manga: Manga;
    chapters: Chapter[];
}

export default function MangaInitializer({ manga, chapters }: Props) {
    const { setCurrentManga, setChapterList } = useManga();

    useEffect(() => {
        if (manga && chapters) {
            console.log('[MangaInitializer] Setting context for:', manga.id);
            setCurrentManga(manga);
            setChapterList(chapters);
        }
    }, [manga, chapters, setCurrentManga, setChapterList]);

    return null; // This component renders nothing, just updates state
}
