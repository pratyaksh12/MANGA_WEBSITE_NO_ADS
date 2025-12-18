import { api } from "@/lib/api";
import { FocusCards } from "@/components/ui/focus-cards";

export default async function Home(){
  const popularMangas = await api.getPopularManga(12, 0);

  return(
    <main className="min-h-screen bg-neutral-950 pb-20">
      <div className="bg-neutral-900 shadow-sm border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome to BAD AT NAMING THINGS
          </h1>
          <p className="mt-2 text-neutral-400">
            Manga Library, personally for me but feel free to use it's AD-FREE
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Popular 🔥</h2>
            <button className="text-sm font-medium text-red-500 hover:text-red-400">
              View all &rarr;
            </button>
          </div>

          <div className="w-full">
            <FocusCards cards={popularMangas.map(manga => ({
              title: api.getTitle(manga),
              src: api.getCoverImage(manga),
              href: `/manga/${manga.id}`
            }))} />
          </div>
        </section>
      </div>
    </main>
  )
}