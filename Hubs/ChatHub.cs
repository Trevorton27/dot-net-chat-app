using DotNetChatReactApp.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Hubs
{
    public class ChatHub : Hub
    {
        // private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            //  _botUser = "My Chat Bot";
            _connections = connections;
        }

        // public override Task OnDisconnectedAsync(Exception exception)
        // {
        //     if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        //     {
        //         _connections.Remove(Context.ConnectionId);
        //         Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");
        //         SendConnectedUsers(userConnection.Room);
        //     }

        //     return base.OnDisconnectedAsync(exception);
        // }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        // public async Task JoinRoom(UserConnection userconnection)
        // {
        //     await Groups.AddToGroupAsync(Context.ConnectionId, userconnection.Room);
        //     _connections[Context.ConnectionId] = userconnection;
        //     await Clients.Group(userconnection.Room).SendAsync("ReceiveMessage", _botUser, $"{ userconnection.User} has joined {userconnection.Room}");


        //     await SendConnectedUsers(userconnection.Room);
        // }

        // public Task SendConnectedUsers(string room)
        // {
        //     var users = _connections.Values
        //         .Where(c => c.Room == room)
        //         .Select(c => c.User);

        //     return Clients.Group(room).SendAsync("UsersInRoom", users);
        // }

    }
}
