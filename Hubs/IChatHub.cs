using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Hubs
{
    public interface IChatHub
    {

        Task ReceiveMessage(Message message);
       // Task ReceiveMessage(Dictionary<int, GetMessagesDto> messages);
    }
}
