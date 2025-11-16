import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

// Theme store - manages application theme
// Location: shared/model (truly global state for app look/feel)
export const useThemeStore = create(
  persist(
    combine(
      // Initial state
      {
        theme: 'system' as Theme,
      },
      // Action creators
      (set, get) => {
        // Helper function to apply theme to DOM
        const applyThemeToDOM = (theme: Theme) => {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');

          if (theme === 'system') {
            const systemTheme = window.matchMedia(
              '(prefers-color-scheme: dark)'
            ).matches
              ? 'dark'
              : 'light';
            root.classList.add(systemTheme);
          } else {
            root.classList.add(theme);
          }
        };

        return {
          // Set theme
          setTheme: (theme: Theme) => {
            set({ theme });
            applyThemeToDOM(theme);
          },

          // Toggle between light and dark
          toggleTheme: () => {
            const current = get().theme;
            const newTheme = current === 'dark' ? 'light' : 'dark';
            set({ theme: newTheme });
            applyThemeToDOM(newTheme);
          },

          // Apply theme to document (exposed for external use)
          applyTheme: (theme: Theme) => {
            applyThemeToDOM(theme);
          },

          // Get effective theme (resolves 'system' to actual theme)
          getEffectiveTheme: (): 'light' | 'dark' => {
            const { theme } = get();
            if (theme === 'system') {
              return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            }
            return theme;
          },

          // Initialize theme on mount
          initializeTheme: () => {
            const { theme } = get();
            applyThemeToDOM(theme);

            // Listen for system theme changes
            const mediaQuery = window.matchMedia(
              '(prefers-color-scheme: dark)'
            );
            const handleChange = () => {
              if (get().theme === 'system') {
                applyThemeToDOM('system');
              }
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
          },
        };
      }
    ),
    {
      name: 'theme-storage', // localStorage key
    }
  )
);
