using DotNetChatReactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Dtos
{
    public class NewMessageDto
    {   public string Username {  get; set; }
        public string Text { get; set; }

        public User User {  get; set; }
    }
}
