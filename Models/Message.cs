using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Models
{
    public class Message
    {
        public string Id {  get; set; }

        public int UserId { get; set; }
        public string Username { get; set; }
        
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
