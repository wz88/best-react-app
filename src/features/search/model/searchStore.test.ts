import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSearchStore } from './searchStore';

describe('useSearchStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useSearchStore.setState({
      query: '',
      results: [],
      isSearching: false,
      recentSearches: [],
    });
  });

  describe('setQuery', () => {
    it('should update search query', () => {
      const { setQuery } = useSearchStore.getState();

      setQuery('test query');

      expect(useSearchStore.getState().query).toBe('test query');
    });
  });

  describe('setResults', () => {
    it('should update search results', () => {
      const { setResults } = useSearchStore.getState();

      const mockResults = [
        {
          id: '1',
          title: 'Result 1',
          description: 'Desc 1',
          type: 'form' as const,
        },
      ];

      setResults(mockResults);

      expect(useSearchStore.getState().results).toEqual(mockResults);
    });
  });

  describe('setIsSearching', () => {
    it('should update searching state', () => {
      const { setIsSearching } = useSearchStore.getState();

      setIsSearching(true);
      expect(useSearchStore.getState().isSearching).toBe(true);

      setIsSearching(false);
      expect(useSearchStore.getState().isSearching).toBe(false);
    });
  });

  describe('search', () => {
    it('should perform search and update recent searches', async () => {
      vi.useFakeTimers();
      const { search } = useSearchStore.getState();

      search('test query');

      // Should set query and isSearching immediately
      let state = useSearchStore.getState();
      expect(state.query).toBe('test query');
      expect(state.isSearching).toBe(true);

      // Fast-forward time
      vi.advanceTimersByTime(300);

      // Should have results and not be searching
      state = useSearchStore.getState();
      expect(state.isSearching).toBe(false);
      expect(state.results).toHaveLength(1);
      expect(state.recentSearches).toContain('test query');

      vi.useRealTimers();
    });

    it('should keep only last 5 recent searches', async () => {
      vi.useFakeTimers();
      const { search } = useSearchStore.getState();

      // Perform 6 searches
      for (let i = 1; i <= 6; i++) {
        search(`query ${i}`);
        vi.advanceTimersByTime(300);
      }

      const state = useSearchStore.getState();
      expect(state.recentSearches).toHaveLength(5);
      expect(state.recentSearches).not.toContain('query 1');
      expect(state.recentSearches).toContain('query 6');

      vi.useRealTimers();
    });

    it('should not duplicate recent searches', async () => {
      vi.useFakeTimers();
      const { search } = useSearchStore.getState();

      search('test');
      vi.advanceTimersByTime(300);
      search('test');
      vi.advanceTimersByTime(300);

      const state = useSearchStore.getState();
      expect(state.recentSearches.filter((q) => q === 'test')).toHaveLength(1);

      vi.useRealTimers();
    });

    it('should not add empty queries to recent searches', async () => {
      vi.useFakeTimers();
      const { search } = useSearchStore.getState();

      search('   ');
      vi.advanceTimersByTime(300);

      const state = useSearchStore.getState();
      expect(state.recentSearches).toHaveLength(0);

      vi.useRealTimers();
    });
  });

  describe('clearSearch', () => {
    it('should clear query and results', () => {
      const { setQuery, setResults, clearSearch } = useSearchStore.getState();

      setQuery('test');
      setResults([
        { id: '1', title: 'Result 1', description: 'Desc 1', type: 'form' },
      ]);
      clearSearch();

      const state = useSearchStore.getState();
      expect(state.query).toBe('');
      expect(state.results).toHaveLength(0);
    });
  });

  describe('clearRecentSearches', () => {
    it('should clear all recent searches', async () => {
      vi.useFakeTimers();
      const { search, clearRecentSearches } = useSearchStore.getState();

      search('test 1');
      vi.advanceTimersByTime(300);
      search('test 2');
      vi.advanceTimersByTime(300);

      clearRecentSearches();

      expect(useSearchStore.getState().recentSearches).toHaveLength(0);

      vi.useRealTimers();
    });
  });

  describe('removeRecentSearch', () => {
    it('should remove specific recent search', async () => {
      vi.useFakeTimers();
      const { search, removeRecentSearch } = useSearchStore.getState();

      search('test 1');
      vi.advanceTimersByTime(300);
      search('test 2');
      vi.advanceTimersByTime(300);

      removeRecentSearch('test 1');

      const state = useSearchStore.getState();
      expect(state.recentSearches).not.toContain('test 1');
      expect(state.recentSearches).toContain('test 2');

      vi.useRealTimers();
    });
  });
});
