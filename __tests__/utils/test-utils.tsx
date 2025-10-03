import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Test utilities
export const createMockQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

// Mock data generators
export const createMockEntry = (overrides = {}) => ({
  id: '1',
  title: 'Test Entry',
  description: 'Test Description',
  startTime: '09:00',
  endTime: '10:00',
  date: '2024-01-01',
  category: 'work',
  priority: 'medium',
  status: 'pending',
  ...overrides,
});

export const createMockEntries = (count = 3) =>
  Array.from({ length: count }, (_, index) =>
    createMockEntry({
      id: (index + 1).toString(),
      title: `Test Entry ${index + 1}`,
    })
  );

// Common test helpers
export const waitForLoadingToFinish = () =>
  new Promise(resolve => setTimeout(resolve, 0));

export const mockConsoleError = () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });
};

// Test the test utilities themselves
describe('Test Utilities', () => {
  it('should create mock entry with default values', () => {
    const entry = createMockEntry();
    expect(entry).toHaveProperty('id', '1');
    expect(entry).toHaveProperty('title', 'Test Entry');
    expect(entry).toHaveProperty('category', 'work');
  });

  it('should create mock entry with overrides', () => {
    const entry = createMockEntry({ title: 'Custom Title', id: 'custom-id' });
    expect(entry).toHaveProperty('title', 'Custom Title');
    expect(entry).toHaveProperty('id', 'custom-id');
    expect(entry).toHaveProperty('category', 'work'); // Should keep default
  });

  it('should create multiple mock entries', () => {
    const entries = createMockEntries(3);
    expect(entries).toHaveLength(3);
    expect(entries[0]).toHaveProperty('id', '1');
    expect(entries[1]).toHaveProperty('id', '2');
    expect(entries[2]).toHaveProperty('id', '3');
  });
});
