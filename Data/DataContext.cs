using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetChatReactApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetChatReactApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages {  get; set; }

      //  public DbSet<Channel> Channels {  get; set; }
    }
}
