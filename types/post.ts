export interface Comment {
    id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    timestamp: string;
  }
  
  export interface Post {
    id: string;
    user: {
      id: string;
      username: string;
      avatar: string;
    };
    images: string[];
    caption: string;
    likes: number;
    liked: boolean;
    comments: Comment[];
    commentCount: number;
    timestamp: string;
    location?: string;
    saved: boolean;
  }