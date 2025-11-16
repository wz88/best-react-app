import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import type { ContactFormData, SubmissionStatus } from '../types';

// Contact form store - manages form submission state
// Location: features/form/model (feature-owned business logic)
export const useContactFormStore = create(
  combine(
    {
      submissions: [] as ContactFormData[],
      status: 'idle' as SubmissionStatus,
      error: null as string | null,
    },
    (set, get) => ({
      submitForm: async (data: ContactFormData) => {
        set({ status: 'submitting', error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Add to submissions
          set({
            submissions: [...get().submissions, data],
            status: 'success',
          });

          return { success: true };
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Failed to submit form';
          set({ status: 'error', error: errorMessage });
          return { success: false, error: errorMessage };
        }
      },

      resetStatus: () => {
        set({ status: 'idle', error: null });
      },

      clearSubmissions: () => {
        set({ submissions: [] });
      },
    })
  )
);
