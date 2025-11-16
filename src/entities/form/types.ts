export type Form = {
  id: string;
  title: string;
  description: string;
  status: FormStatus;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
};

export enum FormStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export type FormField = {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  value?: any;
  validation?: ValidationRule[];
};

export enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textarea',
}

export type ValidationRule = {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern';
  value?: any;
  message: string;
};
