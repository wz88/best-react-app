import { useState } from 'react';
import { type Form, FormStatus } from '../entities/form/types';
import { useAuth } from '../shared/hooks/useAuth';
import { Button } from '../shared/ui/Button';
import { Card } from '../shared/ui/Card';
import { FormsTable } from '../widgets/FormsTable';
import { NavbarWithProfile } from '../widgets/NavbarWithProfile';

export function DraftsPage() {
  const { currentUser } = useAuth();
  const [forms, setForms] = useState<Form[]>([
    {
      id: '1',
      title: 'Customer Feedback Form',
      description:
        'Collect feedback from customers about our products and services',
      status: FormStatus.DRAFT,
      fields: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      id: '2',
      title: 'Employee Survey',
      description: 'Annual employee satisfaction and engagement survey',
      status: FormStatus.DRAFT,
      fields: [],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
    },
    {
      id: '3',
      title: 'Contact Request',
      description: 'Form for potential clients to contact us',
      status: FormStatus.SUBMITTED,
      fields: [],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-08'),
      submittedAt: new Date('2024-01-08'),
    },
    {
      id: '4',
      title: 'Product Registration',
      description: 'Register new products for warranty and support',
      status: FormStatus.APPROVED,
      fields: [],
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-03'),
      submittedAt: new Date('2024-01-03'),
    },
  ]);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Forms', href: '/forms' },
    { label: 'Drafts', href: '/drafts' },
    { label: 'Review', href: '/review' },
  ];

  const handleFormClick = (form: Form) => {
    console.log('View form:', form.title);
  };

  const handleEditForm = (form: Form) => {
    console.log('Edit form:', form.title);
  };

  const handleDeleteForm = (formId: string) => {
    console.log('Delete form:', formId);
    setForms((prev) => prev.filter((form) => form.id !== formId));
  };

  const handleCreateNewForm = () => {
    console.log('Create new form');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithProfile
        navigationItems={navigationItems}
        onLogout={() => console.log('Logout')}
        user={currentUser || undefined}
      />

      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">My Forms</h2>
          <Button color="blue" onClick={handleCreateNewForm}>
            Create New Form
          </Button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-blue-600">
              {forms.filter((f) => f.status === FormStatus.DRAFT).length}
            </h3>
            <p className="text-gray-600">Drafts</p>
          </Card>

          <Card className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-yellow-600">
              {forms.filter((f) => f.status === FormStatus.SUBMITTED).length}
            </h3>
            <p className="text-gray-600">Submitted</p>
          </Card>

          <Card className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-green-600">
              {forms.filter((f) => f.status === FormStatus.APPROVED).length}
            </h3>
            <p className="text-gray-600">Approved</p>
          </Card>

          <Card className="p-4 text-center">
            <h3 className="text-2xl font-semibold text-red-600">
              {forms.filter((f) => f.status === FormStatus.REJECTED).length}
            </h3>
            <p className="text-gray-600">Rejected</p>
          </Card>
        </div>

        {/* Forms Table */}
        <FormsTable
          forms={forms}
          onDeleteForm={handleDeleteForm}
          onEditForm={handleEditForm}
          onFormClick={handleFormClick}
        />
      </div>
    </div>
  );
}
