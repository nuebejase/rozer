import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { users } from '../mocks/users';
import { User, AuthState } from '../types/user';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, username: string, fullName: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (user) {
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      
      signup: async (email: string, username: string, fullName: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if email or username already exists
        const userExists = users.some(
          u => u.email.toLowerCase() === email.toLowerCase() || 
               u.username.toLowerCase() === username.toLowerCase()
        );
        
        if (userExists) {
          set({ isLoading: false });
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: `user${users.length + 1}`,
          email,
          username,
          fullName,
          avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
          followers: 0,
          following: 0,
          posts: 0
        };
        
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateProfile: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);