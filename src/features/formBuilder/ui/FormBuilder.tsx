import { useForm } from '@tanstack/react-form';
import { FieldType, type FormField, FormStatus } from '@/entities/form';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select';
import { Typography } from '@/shared/ui/Typography';
import { useFormBuilderStore } from '../model';

export function FormBuilder() {
  const { saveForm } = useFormBuilderStore();

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      fields: [] as FormField[],
      newFieldName: '',
      newFieldLabel: '',
      newFieldType: FieldType.TEXT as FieldType,
    },
    onSubmit: async ({ value }) => {
      const formData = {
        id: Date.now().toString(),
        title: value.title,
        description: value.description,
        status: FormStatus.DRAFT,
        fields: value.fields,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      saveForm(formData);

      // Reset form
      form.reset();
    },
  });

  const handleAddField = () => {
    const newFieldName = form.getFieldValue('newFieldName');
    const newFieldLabel = form.getFieldValue('newFieldLabel');
    const newFieldType = form.getFieldValue('newFieldType');

    if (newFieldName && newFieldLabel) {
      const field: FormField = {
        id: Date.now().toString(),
        name: newFieldName,
        label: newFieldLabel,
        type: newFieldType,
        required: false,
        value: '',
      };

      const currentFields = form.getFieldValue('fields');
      form.setFieldValue('fields', [...currentFields, field]);

      // Reset field inputs
      form.setFieldValue('newFieldName', '');
      form.setFieldValue('newFieldLabel', '');
      form.setFieldValue('newFieldType', FieldType.TEXT);
    }
  };

  const handleRemoveField = (fieldId: string) => {
    const currentFields = form.getFieldValue('fields');
    form.setFieldValue(
      'fields',
      currentFields.filter((f) => f.id !== fieldId)
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Form Details */}
        <Card className="p-6">
          <Typography className="mb-4 text-gray-800" variant="h4">
            Form Details
          </Typography>

          <div className="space-y-4">
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  value ? undefined : 'Form title is required',
              }}
            >
              {(field) => (
                <div>
                  <Input
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Form Title"
                    value={field.state.value}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <Input
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Description"
                  value={field.state.value}
                />
              )}
            </form.Field>
          </div>
        </Card>

        {/* Add Fields */}
        <Card className="p-6">
          <Typography className="mb-4 text-gray-800" variant="h4">
            Add Fields
          </Typography>

          <div className="space-y-4">
            <form.Field name="newFieldName">
              {(field) => (
                <Input
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Field Name"
                  value={field.state.value}
                />
              )}
            </form.Field>

            <form.Field name="newFieldLabel">
              {(field) => (
                <Input
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Field Label"
                  value={field.state.value}
                />
              )}
            </form.Field>

            <form.Field name="newFieldType">
              {(field) => (
                <Select
                  onValueChange={(value) =>
                    field.handleChange(value as FieldType)
                  }
                  value={field.state.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={FieldType.TEXT}>Text</SelectItem>
                    <SelectItem value={FieldType.NUMBER}>Number</SelectItem>
                    <SelectItem value={FieldType.EMAIL}>Email</SelectItem>
                    <SelectItem value={FieldType.SELECT}>Select</SelectItem>
                    <SelectItem value={FieldType.CHECKBOX}>Checkbox</SelectItem>
                    <SelectItem value={FieldType.TEXTAREA}>Textarea</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </form.Field>

            <Button className="w-full" onClick={handleAddField} type="button">
              Add Field
            </Button>
          </div>
        </Card>
      </div>

      {/* Form Fields Preview */}
      <form.Field name="fields">
        {(field) =>
          field.state.value.length > 0 && (
            <Card className="mt-6 p-6">
              <Typography className="mb-4 text-gray-800" variant="h4">
                Form Fields
              </Typography>

              <div className="space-y-3">
                {field.state.value.map((formField) => (
                  <div className="rounded-lg border p-3" key={formField.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <Typography
                          className="font-medium text-gray-800"
                          variant="small"
                        >
                          {formField.label}
                        </Typography>
                        <Typography className="text-gray-600" variant="small">
                          {formField.name} • {formField.type}
                          {formField.required && ' • Required'}
                        </Typography>
                      </div>
                      <Button
                        onClick={() => handleRemoveField(formField.id)}
                        size="sm"
                        type="button"
                        variant="outline"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )
        }
      </form.Field>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit} type="submit">
              {isSubmitting ? 'Saving...' : 'Save Form'}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
