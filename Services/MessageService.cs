using AutoMapper;
using DotNetChatReactApp.Data;
using DotNetChatReactApp.Dtos;
using DotNetChatReactApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Services
{
    public class MessageService : IMessageService
    {
        private readonly DataContext _context;
        private readonly User _user;


        public MessageService(DataContext context, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _context = context;
            _user = _context.Users
                .First(u => u.Username == httpContextAccessor.HttpContext.User.Identity.Name);
        }
        public Message Create(Message message)
        {
            _context.Messages.Add(message);
            return message;

        }

        

      

  


        public async Task<List<Message>> GetAllMessagesByUserId(int userId)

        {
            var messages = await _context.Messages.Where(c => c.UserId == userId).ToListAsync();
        
            return messages;
        }


        public async Task<List<Message>> GetAllMessages()

        {
            var messages = await _context.Messages.ToListAsync();
    
            return messages;
        }

        public Task<List<Message>> GetAllMessages(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
