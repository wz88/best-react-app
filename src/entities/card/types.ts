export type Card = {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
};

export type CardGridProps = {
  cards: Card[];
  onCardClick?: (card: Card) => void;
};
