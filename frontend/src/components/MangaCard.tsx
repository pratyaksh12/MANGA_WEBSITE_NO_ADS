import { api } from "@/lib/api";
import { Manga } from "@/lib/types";
import Link from "next/link";
import React from "react";

interface Props {
  manga: Manga;
}

export default function MangaCard({ manga }: Props) {
  const coverUrl = api.getCoverImage(manga);
  const title = api.getTitle(manga);

  return (
    <>
      <Link
        href={`/manga/${manga.id}`}
        className="group relative block overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl aspect-[2/3]"
      >

        <img src={coverUrl} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy"/>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-16">
            <h3 className="line-clamp-2 text-sm font-semibold text-white drop-shadow-md">
                {title}
            </h3>
        </div>
      </Link>
    </>
  );
}
