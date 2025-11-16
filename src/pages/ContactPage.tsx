import { ContactForm } from '@/features/form';
import { useAuth } from '@/shared/hooks/useAuth';
import { Typography } from '@/shared/ui/Typography';
import { NavbarWithProfile } from '@/widgets/NavbarWithProfile';

export function ContactPage() {
  const { currentUser } = useAuth();

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Forms', href: '/forms' },
    { label: 'Contact', href: '/contact' },
    { label: 'Drafts', href: '/drafts' },
    { label: 'Review', href: '/review' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithProfile
        navigationItems={navigationItems}
        onLogout={() => console.log('Logout')}
        user={currentUser || undefined}
      />

      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-2xl">
          <Typography className="mb-2 text-gray-800" variant="h2">
            Contact Us
          </Typography>
          <Typography className="mb-8 text-gray-600" variant="paragraph">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </Typography>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
