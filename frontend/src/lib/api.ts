import { Chapter, ChapterListResponse, Manga, MangaListResponse, ChapterPagesResponse } from "./types";
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:5085/api"
});

export const api = {
    async getPopularManga(limit: number = 10, offset: number = 10): Promise<Manga[]> {
        const response = await client.get<MangaListResponse>('/manga/popular', {
            params: { limit, offset }
        });
        return response.data.data;
    },
    getCoverImage(manga: Manga): string {
        const coverRel = manga.relationships.find((r) => r.type === "cover_art");
        const fileName = coverRel?.attributes?.fileName;

        if (!fileName) return '/placeholder.jpg';

        return `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
    },
    getTitle(manga: Manga): string {
        if (manga.attributes.title.en) return manga.attributes.title.en;

        const altTitleEn = manga.attributes.altTitles.find((t) => t.en);
        if (altTitleEn) return altTitleEn.en;

        return Object.values(manga.attributes.title)[0] || 'Untitled';
    },
    async getManga(mangaId: string): Promise<Manga> {
        const response = await client.get<{ data: Manga }>(`/manga/${mangaId}`);
        return response.data.data;
    },
    async getChapters(mangaId: string): Promise<Chapter[]> {
        const response = await client.get<ChapterListResponse>(`/manga/${mangaId}/chapters`);
        return response.data.data;
    },
    async getChapterPages(chapterId: string): Promise<string[]> {
        const response = await client.get<ChapterPagesResponse>(`/manga/chapter/${chapterId}`);
        const { baseUrl, chapter: { hash, data } } = response.data;
        return data.map((fileName) => `${baseUrl}/data/${hash}/${fileName}`);
    },
    async searchManga(query: string): Promise<Manga[]> {
        if (!query) return [];
        const response = await client.get<MangaListResponse>(`/manga/search/${encodeURIComponent(query)}`);
        return response.data.data;
    }
};