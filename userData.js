const usersData = [
    {
      avatar: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-942065100-copy.jpg?resize=1200:*",
      name: "John Mayers",
      time: "3 min ago",
      status: "Online",
      lastMessage: "I need help with my internet package",
      unread: 2
    },
    {
      avatar: "https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg",
      name: "Tony Stark",
      time: "10 min ago",
      status: "Online",
      lastMessage: "My suit's OS needs an update",
      unread: 0
    },
    {
      avatar: "https://c4.wallpaperflare.com/wallpaper/739/10/526/scarlett-johansson-face-pink-lipstick-actress-wallpaper-preview.jpg",
      name: "Natasha Romanoff",
      time: "3 hours ago",
      status: "Away",
      lastMessage: "Mission debrief at 5pm",
      unread: 0
    },
    {
      avatar: "https://www.gannett-cdn.com/presto/2023/02/15/USAT/d22ad1a7-00ec-425f-b1c9-a643fcfcda9f-AFP_AFP_336E7FA.jpg",
      name: "Clint Barton",
      time: "4 hours ago",
      status: "Offline",
      lastMessage: "Arrows need refill",
      unread: 3
    },
    {
      avatar: "https://flxt.tmsimg.com/assets/308495_v9_bb.jpg",
      name: "Sam Wilson",
      time: "8 hours ago",
      status: "Online",
      lastMessage: "Wings maintenance scheduled",
      unread: 0
    }
  ];
  
  let chatData = {
    "John Mayers": [
      {
        type: "received",
        message: "Hi, how can I help you today?",
        time: "10:00 AM"
      },
      {
        type: "sent",
        message: "I'm having issues with my internet package. The speed is much slower than advertised.",
        time: "10:02 AM"
      }
    ],
    "Tony Stark": [
      {
        type: "received",
        message: "Hello Mr. Stark, what can I do for you today?",
        time: "9:30 AM"
      }
    ]
  };
  