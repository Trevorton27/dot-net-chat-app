using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetChatReactApp.Dtos
{
    public class NewChannelDto
    {

        public int Id { get; set; }
        public string ChannelName { get; set; }


    }

    public class GetChannelsDto
    {
        public int Id { get; set; }
        public string ChannelName { get; set; }

    }
}
