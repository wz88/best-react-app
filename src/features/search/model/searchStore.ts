import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import type { SearchResult } from '../types';

// Search store - manages search queries and results
// Location: features/search/model (feature: search UI and logic)
export const useSearchStore = create(
  combine(
    // Initial state
    {
      query: '',
      results: [] as SearchResult[],
      isSearching: false,
      recentSearches: [] as string[],
    },
    // Action creators
    (set, get) => ({
      // Set search query
      setQuery: (query: string) => {
        set({ query });
      },

      // Set search results
      setResults: (results: SearchResult[]) => {
        set({ results });
      },

      // Set searching state
      setIsSearching: (isSearching: boolean) => {
        set({ isSearching });
      },

      // Perform search (mock implementation)
      search: (query: string) => {
        set({ query, isSearching: true });

        // Add to recent searches if not empty
        if (query.trim()) {
          const { recentSearches } = get();
          const updated = [
            query,
            ...recentSearches.filter((q) => q !== query),
          ].slice(0, 5); // Keep last 5 searches
          set({ recentSearches: updated });
        }

        // Simulate API call
        setTimeout(() => {
          // Mock results
          const mockResults: SearchResult[] = query.trim()
            ? [
                {
                  id: '1',
                  title: `Result for "${query}"`,
                  description: 'This is a mock search result',
                  type: 'form',
                },
              ]
            : [];

          set({ results: mockResults, isSearching: false });
        }, 300);
      },

      // Clear search
      clearSearch: () => {
        set({ query: '', results: [] });
      },

      // Clear recent searches
      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },

      // Remove a specific recent search
      removeRecentSearch: (query: string) => {
        set((state) => ({
          recentSearches: state.recentSearches.filter((q) => q !== query),
        }));
      },
    })
  )
);
