using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TelevisionchannelMangement.Models;

[ApiController]
[Route("api/[controller]")]
public class ShowController : ControllerBase
{
    private readonly ChannelManagementDbContext _context;

    public ShowController(ChannelManagementDbContext context)
    {
        _context = context;
    }


    [HttpGet("{ShowId}")]
    public async Task<IActionResult> GetShow(int ShowId)
    {
        var show = await _context.Shows.FindAsync(ShowId);
        if (show == null)
        {
            return NotFound(new { Message = $"Show with ID {ShowId} not found." });
        }

        return Ok(show);
    }


    // GET: api/User
    [HttpGet("Show")]
    public async Task<IActionResult> GetShow()
    {
        var shows = await _context.Shows.ToListAsync();
        return Ok(shows);
    }


    [HttpGet("getShowsByRole/{id}")]
    public async Task<IActionResult> GetShowsById(int id)
    {
        

        var shows = await _context.Shows.Where(show => show.UserId == id).ToListAsync();
        return Ok(shows);
    }


    [HttpPost("insertShow")]
    public IActionResult InsertShow([FromBody] Show newShow, int userId)
    {
        var user = _context.Users.FirstOrDefault(u => u.UserId == userId);

        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        newShow.ProducerId = userId;

        _context.Shows.Add(newShow);
        _context.SaveChanges();

        return Ok("Show inserted successfully.");
    }

    [HttpPost("PostShows")]
    public async Task<IActionResult> CreateShow([FromBody] Show show)
    {
        _context.Shows.Add(show);
        await _context.SaveChangesAsync();
        
        return Ok(show);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateShow(int id, [FromBody] Show show)
    {
        if (id != show.ShowId) return BadRequest();
        _context.Entry(show).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("deleteShow/{id}")]
    public async Task<IActionResult> DeleteShow(int id)
    {
        var show = await _context.Shows.FindAsync(id);
        if (show == null) return NotFound();
        _context.Shows.Remove(show);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
