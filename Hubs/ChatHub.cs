using DotNetChatReactApp.Data;
using DotNetChatReactApp.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace DotNetChatReactApp.Hubs
{
    public class ChatHub : Hub<IChatHub>
    {

        //public async Task SendMessage(Message message)
        //{
        //     await Clients.All.SendAsync("ReceiveMessage",  message);
            
        //}
    }
}

//namespace DotNetChatReactApp.Hubs
//{
//    public class ChatHub : Hub
//    {
//        private readonly DataContext _context;

//        public ChatHub(DataContext context)
//        {
//            _context = context;
//        }

//        public Task Send(Message message)
//        {
//            if (!_context.GroupExists(newsItem.NewsGroup))
//            {
//                throw new System.Exception("cannot send a news item to a group which does not exist.");
//            }

//            _context.CreateNewItem(newsItem);
//            return Clients.Group(newsItem.NewsGroup).SendAsync("Send", newsItem);
//        }

//        public async Task JoinGroup(string groupName)
//        {
//            if (!_context.GroupExists(groupName))
//            {
//                throw new System.Exception("cannot join a group which does not exist.");
//            }

//            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
//            await Clients.Group(groupName).SendAsync("JoinGroup", groupName);

//            var history = _context.GetAllNewsItems(groupName);
//            await Clients.Client(Context.ConnectionId).SendAsync("History", history);
//        }

//        public async Task LeaveGroup(string groupName)
//        {
//            if (!_context.GroupExists(groupName))
//            {
//                throw new System.Exception("cannot leave a group which does not exist.");
//            }

//            await Clients.Group(groupName).SendAsync("LeaveGroup", groupName);
//            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
//        }
//        // public async Task SendMessage(Message message)
//        // {

//        //     await Clients.All.SendAsync("ReceiveMessage", message);
//        // }
//    }
//}
