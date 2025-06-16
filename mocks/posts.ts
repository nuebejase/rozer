import { Post } from '../types/post';


export const posts: Post[] = [
  {
    id: "1",
    user: {
      id: "user1",
      username: "Frincis Jane",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    },
    images: [
      "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000",
      "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1000",
    ],
    caption: "Enjoying the sunset🌅oiiai #sunset",
    likes: 999,
    liked: false,
    comments: [
      {
        id: "c1",
        userId: "user2",
        username: "Jase Karl",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
        text: "Looks amazing! Where is this?",
        timestamp: "1h ago"
      },
      {
        id: "c2",
        userId: "user3",
        username: "Jenny Rose",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
        text: "Perfect sunset vibes! 😍",
        timestamp: "2h ago"
      }
    ],
    commentCount: 42,
    timestamp: "2h ago",
    location: "Compostela,Davao de Oro",
    saved: false
  },
  {
    id: "2",
    user: {
      id: "user2",
      username: "Jase Karl",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    },
    images: [
      "https://images.unsplash.com/photo-1682687220067-dced9a881b56?q=80&w=1000",
    ],
    caption: "Nice oiiai #cityscape ",
    likes: 512,
    liked: true,
    comments: [
      {
        id: "c3",
        userId: "user1",
        username: "Frincis Jane",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
        text: "This view is incredible!",
        timestamp: "3h ago"
      }
    ],
    commentCount: 78,
    timestamp: "5h ago",
    saved: true
  },
  {
    id: "3",
    user: {
      id: "user3",
      username: "Jenny Rose ",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    },
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1000",
    ],
    caption: "Homemade pasta with fresh ingredients from the farmers market 🍝oiiai  #homemade  #cooking #foodie",
    likes: 876,
    liked: false,
    comments: [
      {
        id: "c4",
        userId: "user5",
        username: "Krhisha Marie",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
        text: "This looks delicious! Recipe please?heheh oiiai",
        timestamp: "12h ago"
      }
    ],
    commentCount: 124,
    timestamp: "1d ago",
    location: "Compostela,Davao de Oro",
    saved: false
  },
  {
    id: "4",
    user: {
      id: "user4",
      username: "Cleentson Dewey",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    },
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000",
    ],
    caption: "Morning workout complete! 💪 Starting the day with energy and focus wweeww oiiai#fitness #workout #motivation #morningroutine",
    likes: 345,
    liked: false,
    comments: [],
    commentCount: 28,
    timestamp: "2d ago",
    saved: false
  },
  {
    id: "5",
    user: {
      id: "user5",
      username: "Jenny Rose",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    },
    images: [
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1000",
      "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1000",
    ],
    caption:"Every leaf adds a little more calm to my chaos. 🌱shheesshh oiiai #HouseplantHaven",
    likes: 621,
    liked: true,
    comments: [],
    commentCount: 93,
    timestamp: "3d ago",
    saved: false
  },
];