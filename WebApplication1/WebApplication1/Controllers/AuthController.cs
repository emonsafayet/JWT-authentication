using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using WebApplication1.Data;
using WebApplication1.Dtos;
using WebApplication1.Helpers;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository,JwtService jwtService)
        {
            _repository = repository;
            this._jwtService = jwtService;
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

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
             var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new {message="Invalid Credentials"});

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password)) 
            {
                return BadRequest(new { message ="Invalid Credentials"});
            }
            var jwt = _jwtService.Generate(user.Id);
            Response.Cookies.Append("jwt",jwt,new CookieOptions
            {
                HttpOnly = true,
            });

            return Ok(new
            {
                message = "success!"
            });             

        }
        
        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                if (jwt == null) return null ;
                
                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user);
            }
            catch (Exception _)
            {

                return Unauthorized();
            }
        }
    
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { 
                message = "successfully logout"
            });
        }
    }
}
