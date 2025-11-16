import { FormBuilder } from '@/features/formBuilder';
import { useAuth } from '@/shared/hooks/useAuth';
import { Typography } from '@/shared/ui/Typography';
import { NavbarWithProfile } from '@/widgets/NavbarWithProfile';

export function FormPage() {
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
        <Typography className="mb-6 text-gray-800" variant="h2">
          Create Form
        </Typography>

        <FormBuilder />
      </div>
    </div>
  );
}
