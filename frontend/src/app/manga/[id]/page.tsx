import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/custom-button";
import { div, main, span } from "framer-motion/client";

export default async function MangaPage({params}: {params: {id: string}}){
    const {id} = params;
    const manga = await api.getManga(id);
    const chapters = await api.getChapters(id);

    const title = api.getTitle(manga);
    const cover = api.getCoverImage(manga);
    const description = manga.attributes.description.en || "No Description in english available.";
    const authorRel = manga.relationships.find((rel) => rel.type === 'author');
    const authorName = authorRel?.attributes?.name || "Unknown Author";

    return(
        <>
            <div className="min-h-screen bg-neutral-950 text-white selection:bg-red-500/30 pb-20">
                <div className="relative h-[40vh] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-10">
                        <Image
                            src={cover}
                            alt={title}
                            fill
                            className="object-cover opacity-30 blur-xl"
                        />
                    </div>

                    <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-32">
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
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                Chapters <span className="text-sm font-normal text-neutral-500">({chapters.length})</span>
                            </h2>
                            <div className="grid gap-2">
                                {chapters.map((chapter) =>(
                                    <Link 
                                        key={chapter.id}
                                        href={`/read/${chapter.id}`}
                                        className="group flex items-center justify-between p-4 bg-neutral-900/50 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-900 rounded-lg transition-all"
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
            </div>
        </>
    );
}