
using DotNetChatReactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Dtos
{
    public class NewMessageDto
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int UserId { get; set; }
        public int ChannelId { get; set; }
        public string Username { get; set; }

        public string ChannelName {  get; set; }
    
    }

    public class MessageDTOResponse
    {
        public int Id {  get; set; }
        public string Text { get; set; }
        public string Username { get; set; }
        public int ChannelId{ get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
