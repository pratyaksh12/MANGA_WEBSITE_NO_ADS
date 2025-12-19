import { api } from "@/lib/api";
import { FocusCards } from "@/components/ui/focus-cards";
import Button from "@/components/ui/custom-button";

export default async function Home() {
  const popularMangas = await api.getPopularManga(12, 0);

  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-red-500/30">
        
      {/* Hero Section */}
      <section className="relative w-full py-12 lg:py-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950 z-0" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 z-0 pointer-events-none" />
        
        <div className="relative z-10 px-4 md:px-6 mx-auto max-w-7xl flex flex-col items-center text-center">
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4 max-w-3xl">
                BAD AT NAMING THINGS
            </h1>
            
            <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Your personal, pristine manga library. Reading without distractions.
            </p>
        </div>
      </section>

      {/* Popular Section */}
      <div id="popular" className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8 pb-12">
        <div className="flex flex-col space-y-8">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        Popular Now
                        <span className="text-xl">🔥</span>
                    </h2>
                    <p className="text-neutral-500 text-sm">Most read manga this week</p>
                </div>
                <div className="hidden md:block">
                     <Button message="View All" href="/popular"/>
                </div>
            </div>

            <div className="w-full">
                <FocusCards cards={popularMangas.map(manga => ({
                title: api.getTitle(manga),
                src: api.getCoverImage(manga),
                href: `/manga/${manga.id}`
                }))} />
            </div>
            
            <div className="md:hidden flex justify-center pt-8">
                 <Button message="View All" href="/popular"/>
            </div>
        </div>
      </div>
      
    </main>
  );
}