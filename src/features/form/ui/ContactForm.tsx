import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Label } from '@/shared/ui/Label';
import { useContactFormStore } from '../model';

function FieldInfo({ field }: { field: any }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 ? (
        <p className="mt-1 text-sm text-red-600">
          {field.state.meta.errors.join(', ')}
        </p>
      ) : null}
      {field.state.meta.isValidating ? (
        <p className="mt-1 text-sm text-gray-500">Validating...</p>
      ) : null}
    </>
  );
}

export function ContactForm() {
  const { submitForm, status, error } = useContactFormStore();

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
      message: '',
    },
    onSubmit: async ({ value }) => {
      const result = await submitForm(value);
      if (result.success) {
        // Reset form on success
        form.reset();
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Form</h2>
        <p className="mt-1 text-sm text-gray-600">
          Fill out the form below to get in touch
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* First Name Field */}
        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'First name is required';
              }
              if (value.length < 2) {
                return 'First name must be at least 2 characters';
              }
              return;
            },
            onBlur: ({ value }) => {
              if (!value) {
                return 'First name is required';
              }
              if (value.length < 2) {
                return 'First name must be at least 2 characters';
              }
              return;
            },
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: async ({ value }) => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return (
                value.toLowerCase().includes('test') &&
                'First name cannot contain "test"'
              );
            },
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>First Name *</Label>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="John"
                value={field.state.value}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Last Name Field */}
        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'Last name is required';
              }
              if (value.length < 2) {
                return 'Last name must be at least 2 characters';
              }
              return;
            },
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Last Name *</Label>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Doe"
                value={field.state.value}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'Email is required';
              }
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                return 'Please enter a valid email address';
              }
              return;
            },
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Email *</Label>
              <Input
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="john.doe@example.com"
                type="email"
                value={field.state.value}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Age Field */}
        <form.Field
          name="age"
          validators={{
            onChange: ({ value }) => {
              if (value < 13) {
                return 'You must be at least 13 years old';
              }
              if (value > 120) {
                return 'Please enter a valid age';
              }
              return;
            },
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Age *</Label>
              <Input
                id={field.name}
                min="0"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                placeholder="25"
                type="number"
                value={field.state.value}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Message Field */}
        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return 'Message is required';
              }
              if (value.length < 10) {
                return 'Message must be at least 10 characters';
              }
              if (value.length > 500) {
                return 'Message must be less than 500 characters';
              }
              return;
            },
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Message *</Label>
              <textarea
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id={field.name}
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Your message here..."
                rows={4}
                value={field.state.value}
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {/* Success Message */}
        {status === 'success' && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-800">
            Form submitted successfully!
          </div>
        )}

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              className="w-full"
              disabled={!canSubmit || status === 'submitting'}
              type="submit"
            >
              {status === 'submitting' || isSubmitting
                ? 'Submitting...'
                : 'Submit'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
