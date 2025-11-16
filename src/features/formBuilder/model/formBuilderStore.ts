import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import type { Form } from '@/entities/form';

// Form builder store - manages form creation and editing
// Location: features/formBuilder/model (feature-owned business logic)
export const useFormBuilderStore = create(
  combine(
    {
      forms: [] as Form[],
      currentForm: null as Form | null,
    },
    (set, get) => ({
      saveForm: (form: Form) => {
        const existingIndex = get().forms.findIndex((f) => f.id === form.id);

        if (existingIndex >= 0) {
          // Update existing form
          const updatedForms = [...get().forms];
          updatedForms[existingIndex] = {
            ...form,
            updatedAt: new Date(),
          };
          set({ forms: updatedForms, currentForm: form });
        } else {
          // Add new form
          set({
            forms: [...get().forms, form],
            currentForm: form,
          });
        }
      },

      setCurrentForm: (form: Form | null) => {
        set({ currentForm: form });
      },

      clearCurrentForm: () => {
        set({ currentForm: null });
      },

      deleteForm: (id: string) => {
        set({
          forms: get().forms.filter((f) => f.id !== id),
          currentForm: get().currentForm?.id === id ? null : get().currentForm,
        });
      },
    })
  )
);
