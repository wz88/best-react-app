import { useEffect, useState } from 'react';
import {
  Privilege,
  type User,
  UserRole,
  type UserState,
} from '../../entities/user/types';

export function useAuth(): UserState {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = () => {
      try {
        // In real app, this would be an API call
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: UserRole.USER,
          privileges: [Privilege.CREATE_FORM, Privilege.VIEW_DRAFTS],
        };
        setCurrentUser(mockUser);
        setIsAuthenticated(true);
      } catch (_error) {
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    currentUser,
    isAuthenticated,
    isLoading,
  };
}
