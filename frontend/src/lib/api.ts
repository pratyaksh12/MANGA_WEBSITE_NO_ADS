import { Chapter, ChapterListResponse, Manga, MangaListResponse } from "./types";
import axios from "axios";

const client = axios.create({
    baseURL : "http://localhost:5085/api"
});

export const api = {
    async getPopularManga(limit: number = 10, offset: number = 10): Promise<Manga[]>{
        const response = await client.get<MangaListResponse>('/manga/popular', {
            params: {limit, offset}
        });
        return response.data.data;
    },
    getCoverImage(manga: Manga): string{
        const coverRel = manga.relationships.find((r) => r.type === "cover_art");
        const fileName = coverRel?.attributes?.fileName;

        if(!fileName) return '/placeholder.jpg';

        return `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;
    },
    getTitle(manga: Manga): string{
        return manga.attributes.title.en || Object.values(manga.attributes.title)[0] || 'untitled';
    },
    async getManga(mangaId: string): Promise<Manga>{
        const response = await client.get<{data: Manga}>(`/manga/${mangaId}`);
        return response.data.data;
    },
    async getChapters(mangaId: string, limit:number = 100, offset:number = 0): Promise<Chapter[]>{
        const response = await client.get<ChapterListResponse>(`/manga/${mangaId}/feed`, {
            params: {
                limit, offset, 'translatedLanguage[]': 'en', order: {chapter: 'desc'}
            }
        });
        return response.data.data;
    }
};