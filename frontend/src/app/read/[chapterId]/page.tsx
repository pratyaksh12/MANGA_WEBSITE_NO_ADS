"use client"
import React, { useEffect, useState } from 'react';
import { api } from "@/lib/api";
import BackButton from "@/components/ui/back-button";
import { useManga } from '@/context/MangaContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OrbitLoader from '@/components/ui/orbit-loader';

export default function ReadPage({ params }: { params: Promise<{ chapterId: string }> }) {
    
    return <ReaderContent params={params} />
}

function ReaderContent({ params }: { params: Promise<{ chapterId: string }> }) {
    const [chapterId, setChapterId] = useState<string | null>(null);
    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const { currentManga, chapterList } = useManga();
    const router = useRouter();

    useEffect(() => {
        params.then(p => setChapterId(p.chapterId));
    }, [params]);

    useEffect(() => {
        if (!chapterId) return;

        const loadPages = async () => {
            try {
                setLoading(true);
                const p = await api.getChapterPages(chapterId);
                setPages(p);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(true);
                setLoading(false);
            }
        };
        loadPages();
    }, [chapterId]);

    // Navigation Logic
    const currentIndex = chapterList.findIndex(c => c.id === chapterId);
    
    const nextChapter = currentIndex >= 0 && currentIndex < chapterList.length - 1 ? chapterList[currentIndex + 1] : null;
    const prevChapter = currentIndex > 0 ? chapterList[currentIndex - 1] : null;

    if (loading) {
        return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white"><OrbitLoader /></div>
    }

    if (error) {
         return (
             <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl text-red-500">Error loading pages</h1>
                    <Link href="/" className="text-blue-500 underline mt-4 block">Go Home</Link>
                </div>
            </div>
        )
    }

    const backLink = currentManga ? `/manga/${currentManga.id}` : '/';

    return (
        <div className="min-h-screen bg-neutral-950 text-white pb-20">
             {/* Header */}
            <div className="fixed top-0 left-0 w-full z-50 p-4 bg-gradient-to-b from-neutral-900/80 to-transparent pointer-events-none transition-opacity hover:opacity-100 opacity-0 md:opacity-100">
                 <div className="pointer-events-auto inline-block">
                    <BackButton message={"Back"} href={backLink} />
                 </div>
                 {currentManga && (
                     <div className="absolute top-4 right-4 pointer-events-auto bg-black/50 px-4 py-2 rounded text-sm backdrop-blur-md">
                        <span className="text-neutral-400">{currentManga.attributes.title.en}</span>
                        <span className="mx-2">|</span>
                        <span>Ch. {chapterList[currentIndex]?.attributes.chapter || '?'}</span>
                     </div>
                 )}
            </div>

            {/* Reader Container */}
            <div className="max-w-4xl mx-auto pt-0 md:pt-20 px-0 md:px-4" onClick={() => {/* Toggle header visibility logic could go here */}}>
                <div className="flex flex-col gap-0">
                    {pages.map((pageUrl, index) => (
                         <img 
                            key={index}
                            src={pageUrl} 
                            alt={`Page ${index + 1}`}
                            loading="lazy"
                            className="w-full h-auto block"
                        />
                    ))}
                </div>
            </div>
             
             {/* Footer Navigation */}
             <div className="max-w-4xl mx-auto py-12 px-4 flex justify-between items-center text-neutral-500">
                 {prevChapter ? (
                     <button 
                        onClick={() => router.push(`/read/${prevChapter.id}`)}
                        className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-white transition"
                     >
                         ← Previous Chapter
                     </button>
                 ) : <div></div>}
                 
                 {nextChapter ? (
                     <button 
                        onClick={() => router.push(`/read/${nextChapter.id}`)}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
                     >
                         Next Chapter →
                     </button>
                 ) : (
                     <p>End of Series</p>
                 )}
             </div>
        </div>
    );
}
