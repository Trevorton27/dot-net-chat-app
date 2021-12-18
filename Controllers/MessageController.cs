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
using Microsoft.EntityFrameworkCore;

namespace DotNetChatReactApp.Controllers
{
    [ApiController]
    [Route("api")]
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
                    ChannelId = messageDto.ChannelId,
                    Username = messageDto.Username,
                };


                _context.Messages.Add(message);
                await _context.SaveChangesAsync();


                return Ok(message);





            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"{ex.Message}" });
            }

        }


        [HttpGet("getmessagebyid/{id}")]
        public Message GetMessagesByChannel(int id)

        {
            return _context.Messages.FirstOrDefault(e => e.Id == id);

        }

        [HttpGet("getmessagesbychannel/{id}")]
        public async Task<ActionResult<List<Message>>> GetMessagesByChannelList(int id)

        {

            return await _context.Messages.Where(e => e.ChannelId == id).ToListAsync();

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


