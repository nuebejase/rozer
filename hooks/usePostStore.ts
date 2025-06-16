import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { posts as initialPosts } from '../mocks/posts';
import { Post, Comment } from '../types/post';
import { useAuthStore } from './useAuthStore';

interface PostState {
  posts: Post[];
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'liked' | 'comments' | 'commentCount' | 'saved' | 'user'>) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: initialPosts,
      
      toggleLike: (postId: string) => 
        set((state) => ({
          posts: state.posts.map((post) => 
            post.id === postId 
              ? { 
                  ...post, 
                  liked: !post.liked, 
                  likes: post.liked ? post.likes - 1 : post.likes + 1 
                }
              : post
          ),
        })),
        
      toggleSave: (postId: string) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  saved: !post.saved
                }
              : post
          ),
        })),
        
      addComment: (postId: string, text: string) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        set((state) => {
          const newComment: Comment = {
            id: `c${Date.now()}`,
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            text,
            timestamp: 'Just now'
          };
          
          return {
            posts: state.posts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    comments: [newComment, ...post.comments],
                    commentCount: post.commentCount + 1
                  }
                : post
            ),
          };
        });
      },
      
      createPost: (postData) => {
        const user = useAuthStore.getState().user;
        if (!user) return;
        
        const newPost: Post = {
          id: `post${Date.now()}`,
          user: {
            id: user.id,
            username: user.username,
            avatar: user.avatar
          },
          ...postData,
          likes: 0,
          liked: false,
          comments: [],
          commentCount: 0,
          timestamp: 'Just now',
          saved: false
        };
        
        set((state) => ({
          posts: [newPost, ...state.posts]
        }));
      },
      
      updatePost: (postId: string, updates: Partial<Post>) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, ...updates }
              : post
          ),
        }));
      },
      
      deletePost: (postId: string) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        }));
      },
    }),
    {
      name: 'post-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);