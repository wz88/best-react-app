import type { CardGridProps, Card as CardType } from '@/entities/card';
import { Button } from '../../shared/ui/Button';
import { Card } from '../../shared/ui/Card';

export function CardGrid({ cards, onCardClick }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card: CardType) => (
        <Card className="transition-shadow hover:shadow-lg" key={card.id}>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              {card.title}
            </h3>
            <p className="mb-4 text-gray-600">{card.description}</p>
            <div className="flex items-center justify-between">
              <span
                className={`rounded px-2 py-1 text-xs ${
                  card.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {card.status}
              </span>
              <Button onClick={() => onCardClick?.(card)} size="sm">
                View
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
