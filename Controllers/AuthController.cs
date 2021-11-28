using DotNetChatReactApp.Auth;
using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Models;
using DotNetChatReactApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtService _jwtService;
        public AuthController(IUserService userService, JwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }
        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),

            };


            return Created("Success bananas!", _userService.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            var user = _userService.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "User doesn't exist" });
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(error: new { message = "Wrong password" });
            }

            var jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("token", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(jwt);
        }

        [HttpGet("user")]
        public new IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["token"];
                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);
                var user = _userService.GetById(userId);


                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }




        [HttpPost("logout")]
        public IActionResult Logout()
        {


            Response.Cookies.Delete("token");
            return Ok(new
            {
                message = "Successfully logged out."
            });
        }
    }
}
