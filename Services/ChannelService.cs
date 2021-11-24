using DotNetChatReactApp.Data;
using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Services
{
    public class ChannelService : IChannelService
    {
        private readonly DataContext _context;

        public ChannelService(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Channel>> GetAllChannels()

        {
            var channels = await _context.Channels.ToListAsync();

            return channels;
        }

        public Channel CreateNewChannel(NewChannelDto channelDto)
        {
            var newChannel = new Channel
            {
                Name = channelDto.Name,
                ChannelId = channelDto.ChannelId
            };

            _context.Channels.Add(newChannel);
   

            return newChannel;
        }


    }
}
