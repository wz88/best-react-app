import { type Form, FormStatus } from '../../entities/form/types';
import { formatDate } from '../../shared/lib/utils';
import { Card } from '../../shared/ui/Card';
import { Table } from '../../shared/ui/Table';
import { Typography } from '../../shared/ui/Typography';

type FormsTableProps = {
  forms: Form[];
  onFormClick?: (form: Form) => void;
  onEditForm?: (form: Form) => void;
  onDeleteForm?: (formId: string) => void;
};

export function FormsTable({
  forms,
  onFormClick,
  onEditForm,
  onDeleteForm,
}: FormsTableProps) {
  const getStatusColor = (status: FormStatus) => {
    switch (status) {
      case FormStatus.DRAFT:
        return 'bg-yellow-100 text-yellow-800';
      case FormStatus.SUBMITTED:
        return 'bg-blue-100 text-blue-800';
      case FormStatus.APPROVED:
        return 'bg-green-100 text-green-800';
      case FormStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const headers = ['Title', 'Status', 'Created', 'Actions'];

  const rows = forms.map((form) => [
    form.title,
    `<span class="px-2 py-1 rounded text-xs ${getStatusColor(form.status)}">${form.status}</span>`,
    formatDate(form.createdAt),
    // Actions
    `<div class="flex gap-2">
      <button onclick="window.formActions?.view?.('${form.id}')" class="text-blue-600 hover:text-blue-800">View</button>
      <button onclick="window.formActions?.edit?.('${form.id}')" class="text-green-600 hover:text-green-800">Edit</button>
      <button onclick="window.formActions?.delete?.('${form.id}')" class="text-red-600 hover:text-red-800">Delete</button>
    </div>`,
  ]);

  // Set up global form actions
  if (typeof window !== 'undefined') {
    window.formActions = {
      view: (id: string) => {
        const form = forms.find((f) => f.id === id);
        if (form) {
          onFormClick?.(form);
        }
      },
      edit: (id: string) => {
        const form = forms.find((f) => f.id === id);
        if (form) {
          onEditForm?.(form);
        }
      },
      delete: (id: string) => {
        onDeleteForm?.(id);
      },
    };
  }

  return (
    <Card className="p-6">
      <Typography className="mb-6" variant="h4">
        Forms
      </Typography>

      {forms.length === 0 ? (
        <div className="py-8 text-center">
          <Typography className="text-gray-500">
            No forms found. Create your first form to get started.
          </Typography>
        </div>
      ) : (
        <Table headers={headers} rows={rows} />
      )}
    </Card>
  );
}
