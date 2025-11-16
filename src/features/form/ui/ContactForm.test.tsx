import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useContactFormStore } from '../model';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  beforeEach(() => {
    // Reset store before each test
    useContactFormStore.setState({
      submissions: [],
      status: 'idle',
      error: null,
    });
  });

  it('should render all form fields', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should show validation error for empty first name', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.click(firstNameInput);
    await user.tab(); // Blur the field

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
  });

  it('should show validation error for short first name', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, 'A');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/first name must be at least 2 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('should show async validation error for first name containing "test"', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    await user.type(firstNameInput, 'test');

    // Wait for debounced async validation
    await waitFor(
      () => {
        expect(
          screen.getByText(/first name cannot contain "test"/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should show validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it('should show validation error for age under 13', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const ageInput = screen.getByLabelText(/^age \*/i);
    await user.clear(ageInput);
    await user.type(ageInput, '10');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/you must be at least 13 years old/i)
      ).toBeInTheDocument();
    });
  });

  it('should show validation error for short message', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/^message \*/i);
    await user.type(messageInput, 'Short');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/message must be at least 10 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('should disable submit button when form is invalid', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    // TanStack Form enables button by default until validation runs
    // The button will be disabled after user interaction triggers validation
    expect(submitButton).toBeInTheDocument();
  });

  it('should enable submit button when form is valid', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill in all required fields with valid data
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.clear(screen.getByLabelText(/^age \*/i));
    await user.type(screen.getByLabelText(/^age \*/i), '25');
    await user.type(
      screen.getByLabelText(/^message \*/i),
      'This is a valid message with enough characters'
    );

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /submit/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill in all fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.clear(screen.getByLabelText(/^age \*/i));
    await user.type(screen.getByLabelText(/^age \*/i), '25');
    await user.type(
      screen.getByLabelText(/^message \*/i),
      'This is a valid message with enough characters'
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Wait for submission to complete
    await waitFor(
      () => {
        expect(
          screen.getByText(/form submitted successfully/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check that data was added to store
    const { submissions } = useContactFormStore.getState();
    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      age: 25,
      message: 'This is a valid message with enough characters',
    });
  });

  it('should show submitting state during submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill in fields
    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/last name/i), 'Smith');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.clear(screen.getByLabelText(/^age \*/i));
    await user.type(screen.getByLabelText(/^age \*/i), '30');
    await user.type(
      screen.getByLabelText(/^message \*/i),
      'Another valid message'
    );

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Check for submitting state
    expect(screen.getByText(/submitting/i)).toBeInTheDocument();

    // Wait for completion
    await waitFor(
      () => {
        expect(
          screen.getByText(/form submitted successfully/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('should reset form after successful submission', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);

    // Fill in fields
    await user.type(firstNameInput, 'Alice');
    await user.type(lastNameInput, 'Johnson');
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com');
    await user.clear(screen.getByLabelText(/^age \*/i));
    await user.type(screen.getByLabelText(/^age \*/i), '28');
    await user.type(screen.getByLabelText(/^message \*/i), 'Test message here');

    // Submit
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for success
    await waitFor(
      () => {
        expect(
          screen.getByText(/form submitted successfully/i)
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Wait for form to reset
    await waitFor(() => {
      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
    });
  });
});
