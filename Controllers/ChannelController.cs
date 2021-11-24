using DotNetChatReactApp.Data;
using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Hubs;
using DotNetChatReactApp.Models;
using DotNetChatReactApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
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

        private readonly IHubContext<ChatHub, IChatHub> _hubContext;
        private readonly IChannelService   _channelService

        public ChannelController(IUserService userService, IMessageService messageService, DataContext context, IHubContext<ChatHub, IChatHub> hubContext, IChannelService channnelService)
        {
            _hubContext = hubContext;
         _channnelService = channnelService;
            _context = context;
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
                
                _channelService.CreateNewChannel(channelDto);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = $"{ex.Message}" });
            }
        }

        [HttpGet("getallchannels")]
        public async Task<IActionResult>　GetChannels([])
        {
            var sessionToken = HttpContext.Request.Cookies["token"];

            if (sessionToken == null) return BadRequest(new { message = "You are unauthorized" });
        }

    }
}
