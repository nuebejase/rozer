export interface User {
    id: string;
    username: string;
    email: string;
    fullName: string;
    bio?: string;
    avatar: string;
    followers: number;
    following: number;
    posts: number;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }