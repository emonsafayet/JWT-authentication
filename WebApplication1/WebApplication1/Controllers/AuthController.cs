using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;

        public AuthController(IUserRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password =BCrypt.Net.BCrypt.HashPassword( dto.Password)
            }; 

            return Created("SUCCESS",_repository.Create(user));
        }
        //[HttpGet]
        //public IActionResult Hello()
        //{
        //    return Ok("SUCCESS!");
        //}
    }
}
