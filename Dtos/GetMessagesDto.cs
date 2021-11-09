using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Dtos
{
    public class GetMessagesDto
    {
        public int Id {  get; set; }
        public string Username { get; set; }
        public string Text {  get; set; }
        public int UserId { get; set; }
    }
}
