// Contact form types
export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  message: string;
};

export type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';
