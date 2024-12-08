using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TelevisionchannelMangement.Models;

namespace TelevisionchannelMangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly ChannelManagementDbContext _context;


        public ContentController(ChannelManagementDbContext context)
        {
            _context = context;
        }


        [HttpGet("{ContnetId}")]
        public async Task<IActionResult> GetContent(int ContnetId)
        {
            var show = await _context.Shows.FindAsync(ContnetId);
            if (show == null)
            {
                return NotFound(new { Message = $"Show with ID {ContnetId} not found." });
            }

            return Ok(show);
        }


        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetContnetdata()
        {
            var contents = await _context.Contents.ToListAsync();
            return Ok(contents);
        }

        [HttpPost]
        public async Task<IActionResult> PostContnetshow([FromBody] Content content)
        {
            _context.Contents.Add(content);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetContent), new { id = content.ContentId }, content);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContent(int id, [FromBody] Content content)
        {
           // if (id != content.ContentId) return BadRequest();
            _context.Entry(content).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletecontent(int id)
        {
            var content = await _context.Contents.FindAsync(id);
            if (content == null) return NotFound();
            _context.Contents.Remove(content);
            await _context.SaveChangesAsync();
            return NoContent();
        }


    }
}
