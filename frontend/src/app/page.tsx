import { api } from "@/lib/api";
import MangaCard from "@/components/MangaCard";

export default async function Home(){
  const popularMangas = await api.getPopularManga(12, 0);

  return(
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to BAD AT NAMING THINGS
          </h1>
          <p className="mt-2 text-gray-600">
            Manga Library, personally for me but feel free to use it's AD-FREE
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular 🔥</h2>
            <button className="text-sm font-medium text-red-900 hover:text-red-500">
              View all &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {popularMangas.map((manga) =>(
              <MangaCard key={manga.id} manga={manga}/>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}