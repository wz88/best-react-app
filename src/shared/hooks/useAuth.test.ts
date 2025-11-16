import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Privilege, UserRole } from '../../entities/user/types';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  it('loads user successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.currentUser).toBeDefined();
  });

  it('loads mock user after initialization', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.currentUser).toBeDefined();
    expect(result.current.currentUser?.name).toBe('John Doe');
    expect(result.current.currentUser?.email).toBe('john@example.com');
    expect(result.current.currentUser?.role).toBe(UserRole.USER);
  });

  it('user has correct privileges', async () => {
    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.currentUser?.privileges).toContain(
      Privilege.CREATE_FORM
    );
    expect(result.current.currentUser?.privileges).toContain(
      Privilege.VIEW_DRAFTS
    );
  });
});
