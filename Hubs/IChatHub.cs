using DotNetChatReactApp.Models;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Hubs
{
    public interface IChatHub
    {

        Task ReceiveMessage(Message message);

    }
}
