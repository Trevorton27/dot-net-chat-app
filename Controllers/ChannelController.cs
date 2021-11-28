using DotNetChatReactApp.Data;
using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Hubs;
using DotNetChatReactApp.Models;
using DotNetChatReactApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace DotNetChatReactApp.Controllers
{
    [ApiController]
    [Route("api")]
    public class ChannelController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMessageService _messageService;
        private readonly IChannelService _channelService;


        private readonly DataContext _context;


        public ChannelController(IUserService userService, IMessageService messageService, DataContext context, IChannelService channelService)
        {

            _context = context;
            _channelService = channelService;
            _userService = userService;
            _messageService = messageService;

        }

        [HttpPost("newchannel")]
        public async Task<IActionResult> CreateNewChannel([FromQuery] NewChannelDto channelDto)
        {
            var sessionToken = HttpContext.Request.Cookies["token"];

            if (sessionToken == null) return BadRequest(new { message = "You are unauthorized" });
            try
            {

                var newChannel = new Channel
                {
                    Id = channelDto.Id,
                    ChannelName = channelDto.ChannelName,

                };

                _context.Channels.Add(newChannel);
                await _context.SaveChangesAsync();



                return Ok(newChannel);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"{ex.Message}" });
            }
        }

        [HttpGet("channels")]
        public async Task<IActionResult> GetChannels()
        {
            var sessionToken = HttpContext.Request.Cookies["token"];

            if (sessionToken == null) return BadRequest(new { message = "You are unauthorized" });
            //try
            //{

            var channels = await _channelService.GetAllChannels();

            Console.WriteLine(channels);
            return Ok(channels);


            //}
            //catch (Exception ex)
            //{
            //    return BadRequest(new { message = $"{ex.Message}" });
            //}
        }

    }
}
