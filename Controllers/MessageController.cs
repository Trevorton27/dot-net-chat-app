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
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using DotNetChatReactApp.Hubs;
using static DotNetChatReactApp.Hubs.ChatHub;

namespace DotNetChatReactApp.Controllers
{
    [ApiController]
    [Route("api")]
    public class MessageController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMessageService _messageService;

        private readonly DataContext _context;


        private readonly IHubContext<ChatHub, IChatHub> _hubContext;

        public MessageController(IUserService userService, IMessageService messageService, DataContext context, IHubContext<ChatHub, IChatHub> hubContext)
        {
            _hubContext = hubContext;
            _context = context;
            _userService = userService;
            _messageService = messageService;

        }


        [HttpPost("message")]
        public async Task<IActionResult> PostMessage([FromBody] NewMessageDto messageDto)
        {

            var sessionToken = HttpContext.Request.Cookies["token"];

            if (sessionToken == null) return BadRequest(new { message = "You are unauthorized" });
            try
            {

                var user = _userService.GetById(messageDto.UserId);

                var message = new Message
                {
                    Id = messageDto.Id,
                    Text = messageDto.Text,
                    UserId = user.Id,
                    Username = messageDto.Username,
                    ChannelId = messageDto.ChannelId,
                    ChannelName = messageDto.ChannelName
            



                };

                _context.Messages.Add(message);
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.ReceiveMessage(message);

                return Ok(message);





            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"{ex.Message}" });
            }

        }

        [HttpGet("getallmessages")]
        public async Task<IActionResult> GetMessages()
        {
            var sessionToken = HttpContext.Request.Cookies["token"];
            if (sessionToken == null) return BadRequest(new { message = "You are unauthorized" });

            var messages = await _messageService.GetAllMessages();
            Console.WriteLine(messages);

            return Ok(messages);
        }






    }
}


