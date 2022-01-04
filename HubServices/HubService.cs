// using DotNetChatReactApp.Data;
// using DotNetChatReactApp.Models;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;

// namespace DotNetChatReactApp.HubServices
// {
//     public class HubService
//     {
//         private readonly DataContext _context;
//         public HubService(DataContext context)
//         {
//             _context = context;
//         }


//         public void AddGroup(string group)
//         {
//             _context.Channels.Add(new Channel
//             {
//                 ChannelName = group
//             });
//             _context.SaveChanges();
//         }

//         public bool GroupExists(string group)
//         {
//             var item = _context.Channels.FirstOrDefault(t => t.ChannelName == group);
//             if (item == null)
//             {
//                 return false;
//             }

//             return true;
//         }

//         public void CreateNewMessage(Message message)
//         {
//             if (GroupExists(item.NewsGroup))
//             {
//                 _context.Messages.Add(new Message
//                 {
//                     // Header = item.Header,
//                     // Author = item.Author,
//                     // NewsGroup = item.NewsGroup,
//                     // NewsText = item.NewsText
//                 });
//                 _context.SaveChanges();
//             }
//             else
//             {
//                 throw new System.Exception("group does not exist");
//             }
//         }

//         public IEnumerable<Message> GetAllMessages(string group)
//         {
//             return _context.Messages.Where(item => item.NewsGroup == group).Select(z =>
//                 new Message
//                 {
//                     Author = z.Author,
//                     Header = z.Header,
//                     NewsGroup = z.NewsGroup,
//                     NewsText = z.NewsText
//                 });
//         }

//         public List<string> GetAllGroups()
//         {
//             return _context.Channels.Select(t => t.ChannelName).ToList();
//         }
//     }
// }
