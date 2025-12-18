export interface LocalizedString{
    [key:string] : string;
}

export interface TagAttributes{
    name: LocalizedString;
    group: string;
    version: number;
}

export interface Tag{
    id: string;
    type: 'tag';
    attributes: TagAttributes;
}

export interface MangaAttributes{
    title: LocalizedString;
    altTitles: LocalizedString[];
    description: LocalizedString;
    isLocked: boolean;
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string | null;
    status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
    year: number | null;
    contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
    tags: Tag[];
    state: string;
    createdAt: string;
    updatedAt: string;
    availableTranslatedLanguages: string[];
    latestUploadedChapter:string;
}

export interface Relationship{
    id: string;
    type: 'author' | 'artist' | 'cover_art' | 'manga' | 'scanlation_group' | 'user';
    related?: string;
    attributes?: {
        fileName?: string;
        [key: string]:any;
    };
}

export interface Manga{
    id: string;
    type: 'manga';
    attributes: MangaAttributes;
    relationships: Relationship[];
}

export interface MangaListResponse{
    result: string;
    response: string;
    data: Manga[];
    limit: number;
    offset: number;
    total: number;
}