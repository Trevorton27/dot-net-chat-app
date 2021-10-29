using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Guid ChannelId { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Channel Channel { get; set; }
    }
}
