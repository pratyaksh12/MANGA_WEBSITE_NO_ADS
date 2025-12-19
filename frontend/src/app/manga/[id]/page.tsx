import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/custom-button";
import BackButton from "@/components/ui/back-button";


export default async function MangaPage({params}: {params: Promise<{id: string}>}){
    const { id } = await params;
    console.log(`[MangaPage] Fetching details for ID: ${id}`);
    
    let manga, chapters;
    try {
        manga = await api.getManga(id);
        chapters = await api.getChapters(id);
    } catch (error) {
        console.error(`[MangaPage] Error fetching data for ${id}:`, error);
        return (
            <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
                <div className="text-center p-8 bg-neutral-900 rounded-xl border border-neutral-800">
                    <h1 className="text-2xl font-bold mb-4 text-red-500">Error Loading Manga</h1>
                    <p className="text-neutral-400 mb-6">Could not fetch details for this manga.</p>
                    <p className="text-xs text-neutral-600 font-mono mb-6">ID: {id}</p>
                    <Button message="Go Home" href="/" />
                </div>
            </div>
        );
    }

    const title = api.getTitle(manga);
    const cover = api.getCoverImage(manga);
    
    // Helper to clean description
    const cleanDescription = (desc: string) => {
        if (!desc) return "No Description available.";        
        let cleaned = desc.split('---')[0].split('**Links:**')[0];        
        cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        return cleaned.trim();
    };

    const description = cleanDescription(manga.attributes.description.en);
    const authorRel = manga.relationships.find((rel) => rel.type === 'author');
    const authorName = authorRel?.attributes?.name || "Unknown Author";

    return(
        <>
            <div className="min-h-screen bg-neutral-950 text-white selection:bg-red-500/30 pb-20">
                {/* Floating Back Button */}
                <div className="absolute top-6 left-6 z-50">
                    <BackButton message="Back" href="/" />
                </div>

                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent z-20" />
                    <Image
                        src={cover}
                        alt={title}
                        fill
                        className="object-cover opacity-40 blur-xl"
                    />
                </div>

                    <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
                        <div className="flex flex-col md:flex-row gap-8">

                            <div className="flex-shrink-0">
                                <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-2xl border border-neutral-800 mx-auto md:mx-0">
                                    <Image
                                        src={cover}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                                {/* details */}
                            <div className="flex-1 flex flex-col justify-end pb-4 pt-4 md:pt-0 text-center md:text-left">
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">{title}</h1>
                                <p className="text-lg text-neutral-400 mb-6 font-medium">{authorName}</p>

                                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                                    {manga.attributes.tags.slice(0, 5).map(tag=>(
                                        <span key={tag.id} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-neutral-300">
                                            {tag.attributes.name.en}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-neutral-400 leading-relaxed max-w-3xl line-clamp-4 hover:line-clamp-none transition-all cursor-pointer">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* chapters */}
                        <div className="mt-16 sticky top-0 h-screen flex flex-col bg-neutral-950 pt-4 z-30">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 flex-shrink-0 px-1">
                                Chapters <span className="text-sm font-normal text-neutral-500">({chapters.length})</span>
                            </h2>
                            <div className="grid gap-2 overflow-y-auto flex-1 pb-20 pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                                {chapters.map((chapter) =>(
                                    <Link 
                                        key={chapter.id}
                                        href={`/read/${chapter.id}`}
                                        className="group flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 rounded-lg transition-all flex-shrink-0"
                                    >
                                        <div>
                                            <span className="font-medium text-white group-hover:text-red-500 transition-colors">
                                                {chapter.attributes.volume ? `Vol. ${chapter.attributes.volume}` : ''}
                                                Ch. {chapter.attributes.chapter}
                                            </span>
                                            <span className="ml-4 text-sm text-neutral-500">
                                                {chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`}
                                            </span>
                                        </div>
                                        <span className="text-xs text-neutral-600">
                                            {new Date(chapter.attributes.publishAt).toLocaleDateString()}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}