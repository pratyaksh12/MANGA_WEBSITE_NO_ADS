"use client"
import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Manga } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import BackButton from '@/components/ui/back-button';
import { useSearchParams, useRouter } from 'next/navigation';
import OrbitLoader from '@/components/ui/orbit-loader';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';
    
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState<Manga[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    // Debounce/Delay for typing?
    // For now, search on button click or Enter

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setHasSearched(true);
        // Update URL without reloading
        router.replace(`/search?q=${encodeURIComponent(query)}`);

        try {
            const data = await api.searchManga(query);
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-search if q param exists on mount
    useEffect(() => {
        if (initialQuery) {
            handleSearch();
        }
    }, []);

    return (
        <div className="min-h-screen bg-neutral-950 text-white p-6">
            <div className="fixed top-6 left-6 z-50">
                <BackButton message="Back" href="/" />
            </div>

            <div className="max-w-7xl mx-auto pt-20">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Find Your Story
                </h1>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search manga, authors, or tags..."
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-6 py-4 text-lg focus:outline-none focus:border-red-500/50 transition-colors shadow-lg shadow-black/50"
                        autoFocus
                    />
                    <button 
                        type="submit"
                        className="absolute right-2 top-1.5 bottom-1.5 px-6 bg-red-600 hover:bg-red-700 rounded-full font-medium transition-colors"
                    >
                        Search
                    </button>
                    {/* Decorative glow */}
                    <div className="absolute inset-0 -z-10 bg-red-600/20 blur-xl rounded-full opacity-0 focus-within:opacity-100 transition-opacity" />
                </form>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                         <OrbitLoader />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {results.length > 0 ? (
                            results.map((manga) => {
                                const title = api.getTitle(manga);
                                const cover = api.getCoverImage(manga);
                                return (
                                    <Link 
                                        href={`/manga/${manga.id}`} 
                                        key={manga.id}
                                        className="group relative aspect-[2/3] bg-neutral-900 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
                                    >
                                        <Image
                                            src={cover}
                                            alt={title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end opacity-100 transition-opacity">
                                            <h3 className="font-semibold text-white line-clamp-2 leading-tight">
                                                {title}
                                            </h3>
                                        </div>
                                    </Link>
                                );
                            })
                        ) : hasSearched && !loading ? (
                             <div className="col-span-full text-center text-neutral-500 py-20">
                                No results found for "{query}"
                             </div>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
