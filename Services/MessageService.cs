using DotNetChatReactApp.Data;
using DotNetChatReactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Services
{
    public class MessageService : IMessageService
    {
        private readonly DataContext _context;

        public MessageService(DataContext context)
        {
            _context = context;
        }
        public Message Create(Message message)
        {
            _context.Messages.Add(message);
            return message;

        }
    }
}
