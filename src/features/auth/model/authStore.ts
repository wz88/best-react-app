import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { Privilege, type User, UserRole } from '@/entities/user/types';

// Auth store - manages authentication and authorization
// Location: features/auth/model (feature for session, login, privilege, OIDC)
export const useAuthStore = create(
  combine(
    // Initial state
    {
      currentUser: null as User | null,
      isAuthenticated: false,
      isLoading: true,
    },
    // Action creators
    (set) => ({
      // Login user
      login: (user: User) => {
        set({
          currentUser: user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      // Logout user
      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      // Update user profile
      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updates }
            : null,
        }));
      },

      // Set loading state
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      // Initialize auth (simulate API call)
      initializeAuth: () => {
        set({ isLoading: true });
        // Simulate async auth check
        setTimeout(() => {
          // Mock user for demo
          const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: UserRole.USER,
            privileges: [Privilege.CREATE_FORM, Privilege.VIEW_DRAFTS],
          };
          set({
            currentUser: mockUser,
            isAuthenticated: true,
            isLoading: false,
          });
        }, 500);
      },

      // Check if user has specific privilege
      hasPrivilege: (privilege: Privilege) => {
        const state = useAuthStore.getState();
        return state.currentUser?.privileges.includes(privilege) ?? false;
      },

      // Check if user has specific role
      hasRole: (role: UserRole) => {
        const state = useAuthStore.getState();
        return state.currentUser?.role === role;
      },
    })
  )
);
