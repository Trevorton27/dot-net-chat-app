using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Models
{
    public class Message
    {
        public int Id {  get; set; }

        public string Username { get; set; }
        public int UserId {  get; set; }
        public string Text { get; set; }
        public Channel Channel {  get; set; }
        public int ChannelId {  get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
