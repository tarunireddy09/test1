using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TelevisionchannelMangement.Models;

namespace TelevisionchannelMangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertiesController : ControllerBase
    {
        private readonly ChannelManagementDbContext _context;
        public AdvertiesController(ChannelManagementDbContext context)
        {
            _context = context;
        }


        [HttpGet("{AdvertisementId}")]
        public async Task<IActionResult> GetAdvertisetment(int AdvertisementId)
        {
            var advertiement = await _context.Advertisements.FindAsync(AdvertisementId);
            if (advertiement == null)
            {
                return NotFound(new { Message = $"Show with ID {AdvertisementId} not found." });
            }

            return Ok(advertiement);
        }


        // GET: api/User
        [HttpGet("getadvertiser")]
        public async Task<IActionResult> GetAdvertiesmentdata()
        {
            var Advertisements = await _context.Advertisements.ToListAsync();
            return Ok(Advertisements);
        }
        [HttpGet("getAdvById/{id}")]
        public async Task<IActionResult> GetAdvById(int id)
        {
            
            var advs = await _context.Advertisements
                .Where(advs => advs.UserId == id)
                .ToListAsync();

            return Ok(advs);
        }


        [HttpPost("postAdvertiesment")]
        public async Task<IActionResult> PostAdvertiestment([FromBody] Advertiesment advertiesment)
        {
            _context.Advertisements.Add(advertiesment);
            await _context.SaveChangesAsync();
            return Ok(advertiesment);
        }

        



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdvertisement(int id, [FromBody] Advertiesment advertisement)
        {
            if (id != advertisement.AdvertisementId)
                return BadRequest("Advertisement ID mismatch.");

            var existingAdv = await _context.Advertisements.FindAsync(id);
            if (existingAdv == null)
                return NotFound("Advertisement not found.");

            // Update properties
            existingAdv.Title = advertisement.Title;
            existingAdv.ClientName = advertisement.ClientName;
            existingAdv.ScheduledDate = advertisement.ScheduledDate;
            existingAdv.Duration = advertisement.Duration;
            existingAdv.Rate = advertisement.Rate;
            existingAdv.AssignedSubcategory = advertisement.AssignedSubcategory;
            existingAdv.Status = advertisement.Status;
            existingAdv.CreatedAt = advertisement.CreatedAt;
            existingAdv.UpdatedAt = advertisement.UpdatedAt;

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(existingAdv);
        }


        [HttpDelete("DeleteAdvertiser/{id}")]
        public async Task<IActionResult> Deleteadvertisement(int id)
        {
            var advertiesment = await _context.Advertisements.FindAsync(id);
            if (advertiesment == null) return NotFound();
            _context.Advertisements.Remove(advertiesment);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
