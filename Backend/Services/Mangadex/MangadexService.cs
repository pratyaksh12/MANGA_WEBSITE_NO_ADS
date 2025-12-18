using System;
using System.CodeDom;

namespace Backend.Services.Mangadex;

public class MangadexService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://api.mangadex.org";

    public MangadexService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(BaseUrl);

        //User-Agent is required by mangadexapi
        _httpClient.DefaultRequestHeaders.Add("User-Agent", "WorkingOnPersonalProjectPB4365");
    }

    public async Task<string> GetPopularMangaAsync(int limit = 10, int offset = 10)
    {
        var query = $"?limit={limit}&offset={offset}&order[followedCount]=desc&includes[]=cover_art";
        var response = await _httpClient.GetAsync($"/manga/{query}");

        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetMangaDetailAsync(string id)
    {
        var response = await _httpClient.GetAsync($"/manga/{id}?includes[]=cover_art&includes[]=author");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetMangaChapteAsync(string id)
    {
        var response = await _httpClient.GetAsync($"/manga/{id}/feed?translatedLanguage[]=en&order[chapter]=asc&limit=500");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}
