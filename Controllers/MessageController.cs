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
     

       [HttpGet("getmessagesbychannel/{id}")]
        public Message GetMessagesByChannel(int channelId)

        {
            return _context.Messages.First(e  => e.ChannelId == channelId);
            //var sessionToken = HttpContext.Request.Cookies["token"];
            //if (sessionToken == null) return BadRequest(new { message = "You are unauthorized" });

            //try
            //{



            //    var user = _userService.GetById(getMessagesDto.UserId);
            //    var messages = _context.Messages
            //        .Include(m => m.User)
            //        .ToDictionary(
            //        m => m.Id,
            //        m =>
            //        {
            //            return new GetMessagesDto
            //            {
            //                Id = m.Id,
            //                ChannelId = m.ChannelId,
            //                Username = m.Username,
            //                Text = m.Text,
            //                UserId = m.UserId
            //            };
            //        }
            //        );
            //    Console.WriteLine(messages);

            //    return Ok(messages);

            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(new { message = $"{ex.Message}" });
            //}
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


