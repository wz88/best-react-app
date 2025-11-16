import { useState } from 'react';
import type { Card } from '@/entities/card';
import { useAuth } from '../shared/hooks/useAuth';
import { Button } from '../shared/ui/Button';
import { Typography } from '../shared/ui/Typography';
import { CardGrid } from '../widgets/CardGrid';
import { NavbarWithProfile } from '../widgets/NavbarWithProfile';
import { SearchBar } from '../widgets/SearchBar';

export function HomePage() {
  const { currentUser } = useAuth();
  const [cards] = useState<Card[]>([
    {
      id: '1',
      title: 'Create Form',
      description: 'Build and design custom forms with validation',
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'View Drafts',
      description: 'Manage and edit your draft forms',
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Submitted Forms',
      description: 'Review submitted and approved forms',
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: '4',
      title: 'Analytics',
      description: 'View form submission analytics',
      status: 'inactive',
      createdAt: new Date(),
    },
  ]);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Forms', href: '/forms' },
    { label: 'Drafts', href: '/drafts' },
    { label: 'Review', href: '/review' },
  ];

  const handleCardClick = (card: Card) => {
    console.log('Card clicked:', card.title);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithProfile
        navigationItems={navigationItems}
        onLogout={handleLogout}
        user={currentUser || undefined}
      />

      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <Typography className="mb-4 text-gray-800" variant="h2">
            Welcome to Form Builder
          </Typography>
          <Typography className="mb-6 text-gray-600">
            Create, manage, and review forms with ease
          </Typography>
          <Button color="blue" size="lg">
            Get Started
          </Button>
        </div>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div>
          <Typography className="mb-6 text-center text-gray-800" variant="h3">
            Quick Actions
          </Typography>
          <CardGrid cards={cards} onCardClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
}
