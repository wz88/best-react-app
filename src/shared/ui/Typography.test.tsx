import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Typography } from './Typography';

describe('Typography', () => {
  it('renders paragraph by default', () => {
    render(<Typography>Default text</Typography>);
    const element = screen.getByText('Default text');
    expect(element.tagName).toBe('P');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(
      <Typography variant="h1">Heading 1</Typography>
    );
    expect(screen.getByText('Heading 1').tagName).toBe('H1');

    rerender(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2').tagName).toBe('H2');

    rerender(<Typography variant="small">Small text</Typography>);
    expect(screen.getByText('Small text').tagName).toBe('SMALL');
  });

  it('applies custom className', () => {
    render(<Typography className="text-red-500">Red text</Typography>);
    expect(screen.getByText('Red text')).toHaveClass('text-red-500');
  });

  it('renders as anchor when as="a" is provided', () => {
    render(
      <Typography as="a" href="/test">
        Link
      </Typography>
    );
    const link = screen.getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies variant-specific classes', () => {
    render(<Typography variant="h1">Title</Typography>);
    expect(screen.getByText('Title')).toHaveClass('text-4xl', 'font-bold');
  });
});
