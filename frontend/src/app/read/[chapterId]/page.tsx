import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/ui/back-button";

export default async function ReadPage({params}: {params: Promise<{chapterId: string}>}){
    const { chapterId } = await params;
    
    let pages: string[] = [];
    try {
        pages = await api.getChapterPages(chapterId);
    } catch (error) {
        console.error(`[Reader] Error fetching pages for ${chapterId}:`, error);
        return (
             <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
                <div className="text-center p-8 bg-neutral-900 rounded-xl border border-neutral-800">
                    <h1 className="text-2xl font-bold mb-4 text-red-500">Error Loading Chapter</h1>
                    <p className="text-neutral-400 mb-6">Could not fetch pages for this chapter.</p>
                     <Button message="Go Home" href="/" />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white pb-20">
             {/* Header */}
            <div className="fixed top-0 left-0 w-full z-50 p-4 bg-gradient-to-b from-neutral-900/80 to-transparent pointer-events-none">
                 <div className="pointer-events-auto inline-block">
                    <BackButton message="Back" href="/" />
                 </div>
            </div>

            {/* Reader Container */}
            <div className="max-w-4xl mx-auto pt-20 px-0 md:px-4">
                <div className="flex flex-col gap-0">
                    {pages.map((pageUrl, index) => (
                        <div key={index} className="relative w-full aspect-[2/3] md:aspect-auto">
                            {/* We use standard img tag for reader for simpler handling of variable height images if needed, 
                                but Next/Image is better for performance. Since dimensions vary, we'll try width-full.
                            */}
                            <img 
                                src={pageUrl} 
                                alt={`Page ${index + 1}`}
                                loading="lazy"
                                className="w-full h-auto block"
                            />
                        </div>
                    ))}
                </div>
            </div>
             
             {/* Footer Navigation (Optional future improvement: Next/Prev Chapter) */}
             <div className="max-w-4xl mx-auto py-12 text-center text-neutral-500">
                 <p>End of Chapter</p>
             </div>
        </div>
    );
}

// Simple fallback button component for error state if custom button isn't importable here for some reason 
// (But we imported BackButton above, so we should import custom button or just use a link)
function Button({message, href}: {message: string, href: string}) {
    return (
        <Link href={href} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition">
            {message}
        </Link>
    )
}
