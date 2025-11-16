import { beforeEach, describe, expect, it } from 'vitest';
import { useContactFormStore } from './contactFormStore';

describe('useContactFormStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useContactFormStore.setState({
      submissions: [],
      status: 'idle',
      error: null,
    });
  });

  describe('initial state', () => {
    it('should have empty submissions array', () => {
      const { submissions } = useContactFormStore.getState();
      expect(submissions).toEqual([]);
    });

    it('should have idle status', () => {
      const { status } = useContactFormStore.getState();
      expect(status).toBe('idle');
    });

    it('should have null error', () => {
      const { error } = useContactFormStore.getState();
      expect(error).toBeNull();
    });
  });

  describe('submitForm', () => {
    it('should successfully submit form data', async () => {
      const { submitForm } = useContactFormStore.getState();
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        age: 25,
        message: 'Hello, this is a test message',
      };

      const result = await submitForm(formData);

      expect(result.success).toBe(true);
      expect(useContactFormStore.getState().submissions).toHaveLength(1);
      expect(useContactFormStore.getState().submissions[0]).toEqual(formData);
      expect(useContactFormStore.getState().status).toBe('success');
      expect(useContactFormStore.getState().error).toBeNull();
    });

    it('should set status to submitting during submission', async () => {
      const { submitForm } = useContactFormStore.getState();
      const formData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        age: 30,
        message: 'Another test message',
      };

      const submitPromise = submitForm(formData);

      // Check status immediately after calling submitForm
      expect(useContactFormStore.getState().status).toBe('submitting');

      await submitPromise;

      expect(useContactFormStore.getState().status).toBe('success');
    });

    it('should add multiple submissions', async () => {
      const { submitForm } = useContactFormStore.getState();

      const formData1 = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        age: 28,
        message: 'First submission',
      };

      const formData2 = {
        firstName: 'Bob',
        lastName: 'Williams',
        email: 'bob@example.com',
        age: 35,
        message: 'Second submission',
      };

      await submitForm(formData1);
      await submitForm(formData2);

      const { submissions } = useContactFormStore.getState();
      expect(submissions).toHaveLength(2);
      expect(submissions[0]).toEqual(formData1);
      expect(submissions[1]).toEqual(formData2);
    });

    it('should clear error on successful submission', async () => {
      const { submitForm } = useContactFormStore.getState();

      // Set an error first
      useContactFormStore.setState({ error: 'Previous error' });

      const formData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        age: 20,
        message: 'Test message',
      };

      await submitForm(formData);

      expect(useContactFormStore.getState().error).toBeNull();
    });
  });

  describe('resetStatus', () => {
    it('should reset status to idle', () => {
      const { resetStatus } = useContactFormStore.getState();

      useContactFormStore.setState({ status: 'success' });
      resetStatus();

      expect(useContactFormStore.getState().status).toBe('idle');
    });

    it('should clear error', () => {
      const { resetStatus } = useContactFormStore.getState();

      useContactFormStore.setState({ error: 'Some error' });
      resetStatus();

      expect(useContactFormStore.getState().error).toBeNull();
    });

    it('should not affect submissions', () => {
      const { resetStatus } = useContactFormStore.getState();

      const submissions = [
        {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          age: 25,
          message: 'Message',
        },
      ];

      useContactFormStore.setState({ submissions });
      resetStatus();

      expect(useContactFormStore.getState().submissions).toEqual(submissions);
    });
  });

  describe('clearSubmissions', () => {
    it('should clear all submissions', () => {
      const { clearSubmissions } = useContactFormStore.getState();

      const submissions = [
        {
          firstName: 'Test1',
          lastName: 'User1',
          email: 'test1@example.com',
          age: 25,
          message: 'Message 1',
        },
        {
          firstName: 'Test2',
          lastName: 'User2',
          email: 'test2@example.com',
          age: 30,
          message: 'Message 2',
        },
      ];

      useContactFormStore.setState({ submissions });
      clearSubmissions();

      expect(useContactFormStore.getState().submissions).toEqual([]);
    });

    it('should not affect status or error', () => {
      const { clearSubmissions } = useContactFormStore.getState();

      useContactFormStore.setState({
        status: 'success',
        error: 'Some error',
      });

      clearSubmissions();

      expect(useContactFormStore.getState().status).toBe('success');
      expect(useContactFormStore.getState().error).toBe('Some error');
    });
  });
});
