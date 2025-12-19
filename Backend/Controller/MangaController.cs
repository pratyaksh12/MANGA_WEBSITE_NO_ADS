using Backend.Services.Mangadex;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MangaController : ControllerBase
    {
        private readonly MangadexService _mangadexService;
        public MangaController(MangadexService mangadexService)
        {
            _mangadexService = mangadexService;
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularMangas([FromQuery] int limit = 10, [FromQuery] int offset = 10)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var json = await _mangadexService.GetPopularMangaAsync(limit, offset);
                return Content(json, "application/json");
            }
            catch(HttpRequestException ex)
            {
                return StatusCode(503, "Mangadex API unavailable" + ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMangaDetails(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var json = await _mangadexService.GetMangaDetailAsync(id);
                return Content(json, "application/json");

            }
            catch(HttpRequestException ex)
            {
                return NotFound(ex.Message);                
            }
        }

        [HttpGet("{id}/chapters")]
        public async Task<IActionResult> GetChapters(string id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var json = await _mangadexService.GetMangaChapteAsync(id);
                return Content(json, "application/json");
                
            }
            catch (HttpRequestException ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpGet("chapter/{chapterId}")]
        public async Task<IActionResult> GetChapterPages(string chapterId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var json = await _mangadexService.GetChapterPagesAsync(chapterId);
                return Content(json, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("search/{query}")]
        public async Task<IActionResult> SearchManga(string query)
        {
            try
            {
                var json = await _mangadexService.SearchMangaAsync(query);
                return Content(json, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, "Error searching manga: " + ex.Message);
            }
        }
    }
}
