import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useThemeStore } from './themeStore';

// Mock document and window
const mockClassList = {
  add: vi.fn(),
  remove: vi.fn(),
};

const mockMediaQuery = {
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};

beforeEach(() => {
  // Reset mocks
  mockClassList.add.mockClear();
  mockClassList.remove.mockClear();
  mockMediaQuery.addEventListener.mockClear();
  mockMediaQuery.removeEventListener.mockClear();

  // Mock document.documentElement.classList
  Object.defineProperty(document, 'documentElement', {
    value: { classList: mockClassList },
    writable: true,
  });

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn(() => mockMediaQuery),
    writable: true,
  });
});

describe('useThemeStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useThemeStore.setState({ theme: 'system' });
  });

  describe('setTheme', () => {
    it('should set theme and apply to DOM', () => {
      const { setTheme } = useThemeStore.getState();

      setTheme('dark');

      expect(useThemeStore.getState().theme).toBe('dark');
      expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(mockClassList.add).toHaveBeenCalledWith('dark');
    });

    it('should handle system theme', () => {
      mockMediaQuery.matches = true; // System prefers dark
      const { setTheme } = useThemeStore.getState();

      setTheme('system');

      expect(useThemeStore.getState().theme).toBe('system');
      expect(mockClassList.add).toHaveBeenCalledWith('dark');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      const { setTheme, toggleTheme } = useThemeStore.getState();

      setTheme('light');
      mockClassList.add.mockClear();
      mockClassList.remove.mockClear();

      toggleTheme();

      expect(useThemeStore.getState().theme).toBe('dark');
      expect(mockClassList.add).toHaveBeenCalledWith('dark');
    });

    it('should toggle from dark to light', () => {
      const { setTheme, toggleTheme } = useThemeStore.getState();

      setTheme('dark');
      mockClassList.add.mockClear();
      mockClassList.remove.mockClear();

      toggleTheme();

      expect(useThemeStore.getState().theme).toBe('light');
      expect(mockClassList.add).toHaveBeenCalledWith('light');
    });

    it('should toggle from system to dark (when system is light)', () => {
      mockMediaQuery.matches = false; // System prefers light
      const { toggleTheme } = useThemeStore.getState();

      toggleTheme();

      // Toggle treats system as current effective theme, so light -> dark
      expect(useThemeStore.getState().theme).toBe('dark');
    });
  });

  describe('getEffectiveTheme', () => {
    it('should return actual theme for light', () => {
      const { setTheme, getEffectiveTheme } = useThemeStore.getState();

      setTheme('light');

      expect(getEffectiveTheme()).toBe('light');
    });

    it('should return actual theme for dark', () => {
      const { setTheme, getEffectiveTheme } = useThemeStore.getState();

      setTheme('dark');

      expect(getEffectiveTheme()).toBe('dark');
    });

    it('should resolve system theme to dark when system prefers dark', () => {
      mockMediaQuery.matches = true;
      const { setTheme, getEffectiveTheme } = useThemeStore.getState();

      setTheme('system');

      expect(getEffectiveTheme()).toBe('dark');
    });

    it('should resolve system theme to light when system prefers light', () => {
      mockMediaQuery.matches = false;
      const { setTheme, getEffectiveTheme } = useThemeStore.getState();

      setTheme('system');

      expect(getEffectiveTheme()).toBe('light');
    });
  });

  describe('initializeTheme', () => {
    it('should apply current theme on initialization', () => {
      const { setTheme, initializeTheme } = useThemeStore.getState();

      setTheme('dark');
      mockClassList.add.mockClear();
      mockClassList.remove.mockClear();

      initializeTheme();

      expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(mockClassList.add).toHaveBeenCalledWith('dark');
    });

    it('should set up media query listener', () => {
      const { initializeTheme } = useThemeStore.getState();

      const cleanup = initializeTheme();

      expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );

      // Cleanup should remove listener
      if (cleanup) {
        cleanup();
      }
      expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });
  });
});
