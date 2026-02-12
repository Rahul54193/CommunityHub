import { create } from 'zustand';
import { tokenService } from '../../services';

interface User {
  id: number;
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,

  checkAuthStatus: async () => {
    try {
      const hasToken = await tokenService.hasUserDetails();
      const userDetails = hasToken ? await tokenService.getUserDetails() : null;
      console.log(
        'Auth status checked. User details:',
        JSON.parse(userDetails),
      );
      set({
        isAuthenticated: hasToken,
        user: JSON.parse(userDetails).user,
        token: JSON.parse(userDetails).token || null,
        isLoading: false,
      });
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      if (email === 'user@example.com' && password === 'password123') {
        const fakeToken = `token_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        const numericId = Math.floor(Math.random() * 1000) + 1;
        let userDetails = {
          isAuthenticated: true,
          token: fakeToken,
          user: {
            id: numericId,
            email,
          },
        };
        await tokenService.saveUserDetails(userDetails);
        set({
          isAuthenticated: true,
          token: fakeToken,
          user: {
            id: numericId,
            email,
          },
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      set({ isAuthenticated: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await tokenService.clearToken();
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      throw error;
    }
  },
}));
