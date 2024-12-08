using ChannelManagementSystem.Helpers;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TelevisionchannelMangement.Models;

namespace ChannelManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ChannelManagementDbContext _context;
        private readonly JwtService _jwtService;

        public UserController(ChannelManagementDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        // POST: api/User/Register
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }



   
        // POST: api/User/Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials");
            }

            //  var token = _jwtService.GenerateToken(user.Username, user.RoleId);
            var token = _jwtService.GenerateToken(user.UserId, user.RoleId);

            return Ok(new { token });
        }


        // GET: api/User
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // PUT: api/User/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null) return NotFound();

            user.Username = updatedUser.Username;
            user.RoleId = updatedUser.RoleId;
            user.Email = updatedUser.Email;
           // user.IsActive = updatedUser.IsActive;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // DELETE: api/User/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }


    public class LoginRequest
    {

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
