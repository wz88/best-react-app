export type SearchProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  value?: string;
};

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'card' | 'user';
};
