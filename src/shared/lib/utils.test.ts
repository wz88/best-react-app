import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cn, debounce, formatDate } from './utils';

describe('utils', () => {
  describe('cn (className merger)', () => {
    it('merges class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      expect(cn('foo', false, 'baz')).toBe('foo baz');
    });

    it('merges tailwind classes correctly', () => {
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
    });

    it('handles undefined and null', () => {
      expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('handles different dates', () => {
      const date1 = new Date('2024-12-25');
      const date2 = new Date('2024-06-01');

      expect(formatDate(date1)).toContain('Dec');
      expect(formatDate(date2)).toContain('Jun');
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('delays function execution', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 500);

      debouncedFunc();
      expect(func).not.toHaveBeenCalled();

      vi.advanceTimersByTime(500);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('cancels previous calls', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 500);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      vi.advanceTimersByTime(500);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('passes arguments correctly', () => {
      const func = vi.fn();
      const debouncedFunc = debounce(func, 500);

      debouncedFunc('test', 123);
      vi.advanceTimersByTime(500);

      expect(func).toHaveBeenCalledWith('test', 123);
    });
  });
});
