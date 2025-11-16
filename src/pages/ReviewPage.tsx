import { useState } from 'react';
import {
  FieldType,
  type Form,
  type FormField,
  FormStatus,
} from '../entities/form/types';
import { useAuth } from '../shared/hooks/useAuth';
import { Button } from '../shared/ui/Button';
import { Card } from '../shared/ui/Card';
import { Checkbox } from '../shared/ui/Checkbox';
import { Typography } from '../shared/ui/Typography';
import { NavbarWithProfile } from '../widgets/NavbarWithProfile';

export function ReviewPage() {
  const { currentUser } = useAuth();
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const [forms] = useState<Form[]>([
    {
      id: '1',
      title: 'Customer Feedback Form',
      description:
        'Collect feedback from customers about our products and services',
      status: FormStatus.SUBMITTED,
      fields: [
        {
          id: '1',
          name: 'customerName',
          label: 'Customer Name',
          type: FieldType.TEXT,
          required: true,
        },
        {
          id: '2',
          name: 'email',
          label: 'Email Address',
          type: FieldType.EMAIL,
          required: true,
        },
        {
          id: '3',
          name: 'rating',
          label: 'Overall Rating',
          type: FieldType.SELECT,
          required: true,
        },
        {
          id: '4',
          name: 'feedback',
          label: 'Feedback Comments',
          type: FieldType.TEXTAREA,
          required: false,
        },
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-16'),
      submittedAt: new Date('2024-01-16'),
    },
  ]);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Forms', href: '/forms' },
    { label: 'Drafts', href: '/drafts' },
    { label: 'Review', href: '/review' },
  ];

  const handleFormSelect = (form: Form) => {
    setSelectedForm(form);
    const initialData: Record<string, any> = {};
    form.fields.forEach((field) => {
      initialData[field.name] = field.value || '';
    });
    setFormData(initialData);
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleApprove = () => {
    if (selectedForm) {
      console.log('Approving form:', selectedForm.title);
      // In real app, this would call an API
    }
  };

  const handleReject = () => {
    if (selectedForm) {
      console.log('Rejecting form:', selectedForm.title);
      // In real app, this would call an API
    }
  };

  const renderFormField = (field: FormField) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            type={field.type}
            value={value}
          />
        );

      case 'textarea':
        return (
          <textarea
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            rows={4}
            value={value}
          />
        );

      case 'select':
        return (
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            value={value}
          >
            <option value="">Select an option</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>
        );

      case 'checkbox':
        return (
          <Checkbox
            checked={value}
            label={field.label}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
          />
        );

      default:
        return (
          <input
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            type="text"
            value={value}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarWithProfile
        navigationItems={navigationItems}
        onLogout={() => console.log('Logout')}
        user={currentUser || undefined}
      />

      <div className="container mx-auto py-8">
        <Typography className="mb-6 text-gray-800" variant="h2">
          Review Forms
        </Typography>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Forms List */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <Typography className="mb-4 text-gray-800" variant="h4">
                Submitted Forms
              </Typography>

              <div className="space-y-3">
                {forms
                  .filter((form) => form.status === FormStatus.SUBMITTED)
                  .map((form) => (
                    <div
                      className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                        selectedForm?.id === form.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      key={form.id}
                      onClick={() => handleFormSelect(form)}
                    >
                      <Typography
                        className="font-medium text-gray-800"
                        variant="small"
                      >
                        {form.title}
                      </Typography>
                      <Typography className="text-gray-600" variant="small">
                        Submitted: {form.submittedAt?.toLocaleDateString()}
                      </Typography>
                    </div>
                  ))}
              </div>
            </Card>
          </div>

          {/* Form Review */}
          <div className="lg:col-span-2">
            {selectedForm ? (
              <Card className="p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <Typography className="mb-2 text-gray-800" variant="h4">
                      {selectedForm.title}
                    </Typography>
                    <Typography className="text-gray-600">
                      {selectedForm.description}
                    </Typography>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                    {selectedForm.status}
                  </span>
                </div>

                <div className="space-y-6">
                  {selectedForm.fields.map((field) => (
                    <div key={field.id}>
                      <Typography
                        className="mb-2 font-medium text-gray-800"
                        variant="small"
                      >
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-red-500">*</span>
                        )}
                      </Typography>
                      {renderFormField(field)}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-4">
                  <Button color="green" onClick={handleApprove}>
                    Approve Form
                  </Button>
                  <Button color="red" onClick={handleReject} variant="outlined">
                    Reject Form
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Typography className="text-gray-500">
                  Select a form from the list to review
                </Typography>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
