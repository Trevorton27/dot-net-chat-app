using DotNetChatReactApp.Models;
using Microsoft.AspNetCore.Mvc;
using DotNetChatReactApp.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetChatReactApp.Data;
using DotNetChatReactApp.Dtos;

namespace DotNetChatReactApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMessageService _messageService;

        private readonly DataContext _context;
        public MessageController(IUserService userService, IMessageService messageService, DataContext context)
        {

            _context = context;
            _userService = userService;
            _messageService = messageService;

        }


        //[HttpGet("getmessages")]
        //public List<Message> GetMessages()
        //{

        //}

        [HttpPost("message")]
        public async Task<IActionResult> PostMessage([FromBody] NewMessageDto messageDto)
        {

            var sessionToken = HttpContext.Request.Cookies["jwt"];
            if (sessionToken == null) return BadRequest(new { message = "You are unauthorized" });
            try
            {

                var user = _userService.FindUserBySessionToken(sessionToken);

                var message = new Message
                {
                    Text = messageDto.Text,
                    Username = messageDto.Username,

                };
                _context.Messages.Add(message);
                await  _context.SaveChangesAsync();

                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"{ex.Message}" });
            }

        }





    }
}


