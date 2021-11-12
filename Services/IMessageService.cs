using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Services
{
    public interface IMessageService
    {
        Message Create(Message message);
        Task<List<Message>> GetAllMessages();
    }
}
