using DotNetChatReactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Services
{
    public interface IChannelService
    {
        Task<List<Channel>> GetAllChannels();
    }
}
