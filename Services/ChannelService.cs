using DotNetChatReactApp.Data;
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

        public ChannelService(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<List<Channel>> GetAllChannels()

        {
            var channels = await _context.Channels.ToListAsync();

            return channels;
        }

    }
}
