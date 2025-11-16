import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Privilege, UserRole } from '@/entities/user/types';
import { useAuthStore } from './authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  describe('login', () => {
    it('should set user and authenticated state', () => {
      const { login } = useAuthStore.getState();

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.USER,
        privileges: [Privilege.CREATE_FORM],
      };

      login(mockUser);

      const state = useAuthStore.getState();
      expect(state.currentUser).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear user and set authenticated to false', () => {
      const { login, logout } = useAuthStore.getState();

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.USER,
        privileges: [Privilege.CREATE_FORM],
      };

      login(mockUser);
      logout();

      const state = useAuthStore.getState();
      expect(state.currentUser).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('updateUser', () => {
    it('should update user properties', () => {
      const { login, updateUser } = useAuthStore.getState();

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.USER,
        privileges: [Privilege.CREATE_FORM],
      };

      login(mockUser);
      updateUser({ name: 'Jane Doe', email: 'jane@example.com' });

      const state = useAuthStore.getState();
      expect(state.currentUser?.name).toBe('Jane Doe');
      expect(state.currentUser?.email).toBe('jane@example.com');
      expect(state.currentUser?.id).toBe('1'); // Unchanged
    });

    it('should not update if no user is logged in', () => {
      const { updateUser } = useAuthStore.getState();

      updateUser({ name: 'Jane Doe' });

      const state = useAuthStore.getState();
      expect(state.currentUser).toBeNull();
    });
  });

  describe('setLoading', () => {
    it('should update loading state', () => {
      const { setLoading } = useAuthStore.getState();

      setLoading(true);
      expect(useAuthStore.getState().isLoading).toBe(true);

      setLoading(false);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });
  });

  describe('initializeAuth', () => {
    it('should set loading and eventually authenticate user', async () => {
      vi.useFakeTimers();
      const { initializeAuth } = useAuthStore.getState();

      initializeAuth();

      // Should be loading initially
      expect(useAuthStore.getState().isLoading).toBe(true);

      // Fast-forward time
      vi.advanceTimersByTime(500);

      // Should be authenticated after timeout
      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.currentUser).not.toBeNull();

      vi.useRealTimers();
    });
  });

  describe('hasPrivilege', () => {
    it('should return true if user has privilege', () => {
      const { login, hasPrivilege } = useAuthStore.getState();

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.USER,
        privileges: [Privilege.CREATE_FORM, Privilege.VIEW_DRAFTS],
      };

      login(mockUser);

      expect(hasPrivilege(Privilege.CREATE_FORM)).toBe(true);
      expect(hasPrivilege(Privilege.DELETE_FORM)).toBe(false);
    });

    it('should return false if no user is logged in', () => {
      const { hasPrivilege } = useAuthStore.getState();

      expect(hasPrivilege(Privilege.CREATE_FORM)).toBe(false);
    });
  });

  describe('hasRole', () => {
    it('should return true if user has role', () => {
      const { login, hasRole } = useAuthStore.getState();

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.ADMIN,
        privileges: [Privilege.CREATE_FORM],
      };

      login(mockUser);

      expect(hasRole(UserRole.ADMIN)).toBe(true);
      expect(hasRole(UserRole.USER)).toBe(false);
    });

    it('should return false if no user is logged in', () => {
      const { hasRole } = useAuthStore.getState();

      expect(hasRole(UserRole.ADMIN)).toBe(false);
    });
  });
});
