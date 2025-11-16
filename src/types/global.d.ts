import '@testing-library/jest-dom';

declare global {
  type Window = {
    formActions?: {
      view?: (id: string) => void;
      edit?: (id: string) => void;
      delete?: (id: string) => void;
    };
  };
}
