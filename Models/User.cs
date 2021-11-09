using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

 
    
        public DateTime CreatedDate { get; set; }

        public DateTime LastActiveAt { get; set; }






    }
}
