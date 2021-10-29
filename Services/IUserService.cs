using DotNetChatReactApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Services
{
    public interface IUserService
    {
        User  Create(User user);

        User GetByEmail(string email);


        User GetById(int id);
    }
}
