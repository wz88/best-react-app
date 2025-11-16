import { useState } from 'react';
import type { SearchProps, SearchResult } from '../../features/search/types';
import { Button } from '../../shared/ui/Button';
import { Card } from '../../shared/ui/Card';
import { Input } from '../../shared/ui/Input';
import { Typography } from '../../shared/ui/Typography';

export function SearchBar({
  placeholder = 'Search...',
  onSearch,
  value = '',
}: SearchProps) {
  const [searchQuery, setSearchQuery] = useState(value);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Simulate search API call
    setTimeout(() => {
      if (query.trim()) {
        const mockResults: SearchResult[] = [
          {
            id: '1',
            title: 'Customer Feedback Form',
            description: 'Collect feedback from customers',
            type: 'form',
          },
          {
            id: '2',
            title: 'Employee Survey',
            description: 'Annual employee satisfaction survey',
            type: 'form',
          },
        ];
        setResults(mockResults);
      } else {
        setResults([]);
      }
      setIsSearching(false);
    }, 500);

    onSearch(query);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex gap-2">
        <Input
          className="flex-1"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          value={searchQuery}
        />
        <Button onClick={() => handleSearch(searchQuery)}>Search</Button>
      </div>

      {results.length > 0 && (
        <Card className="p-4">
          <Typography className="mb-3" variant="h6">
            Search Results
          </Typography>
          <div className="space-y-2">
            {results.map((result) => (
              <div
                className="rounded-lg border p-3 hover:bg-gray-50"
                key={result.id}
              >
                <Typography className="font-medium" variant="small">
                  {result.title}
                </Typography>
                <Typography className="text-gray-600" variant="small">
                  {result.description}
                </Typography>
                <span className="text-xs text-blue-600">{result.type}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
