# Testing Patterns and Guidelines

This directory contains all test files for the schedule application. We use Jest and React Testing Library for component testing.

## File Structure

```
__tests__/
├── components/          # Component tests
│   └── ui/             # UI component tests
├── lib/                # Utility function tests
├── utils/              # Test utilities and helpers
│   └── test-utils.tsx  # Custom render function and test helpers
└── README.md           # This file
```

## Testing Patterns

### 1. Component Testing

**File naming**: `ComponentName.test.tsx`
**Location**: Mirror the source file structure in `__tests__/`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '@/components/ComponentName';

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName>Content</ComponentName>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles user interactions', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);

    await user.click(screen.getByRole('button'));
    // Assert expected behavior
  });
});
```

### 2. Custom Render Function

Always use our custom render function for components that need providers:

```tsx
import { render, screen } from '@/__tests__/utils/test-utils';

// This automatically wraps components with QueryClientProvider
```

### 3. Test Data

Use the provided mock data generators:

```tsx
import {
  createMockEntry,
  createMockEntries,
} from '@/__tests__/utils/test-utils';

const mockEntry = createMockEntry({ title: 'Custom Title' });
const mockEntries = createMockEntries(5);
```

### 4. Testing User Interactions

Use `@testing-library/user-event` for realistic user interactions:

```tsx
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();
await user.click(screen.getByRole('button'));
await user.type(screen.getByLabelText('Name'), 'John Doe');
```

### 5. Testing Async Operations

Use `waitFor` for async operations:

```tsx
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Loading complete')).toBeInTheDocument();
});
```

### 6. Testing Error States

Mock console.error to avoid noise in test output:

```tsx
import { mockConsoleError } from '@/__tests__/utils/test-utils';

describe('Error handling', () => {
  mockConsoleError();

  it('handles errors gracefully', () => {
    // Test error scenarios
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test Button.test.tsx
```

## Coverage Goals

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Common Patterns

### Testing Form Components

```tsx
it('submits form with valid data', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<Form onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText('Name'), 'John Doe');
  await user.click(screen.getByRole('button', { name: 'Submit' }));

  expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
});
```

### Testing Loading States

```tsx
it('shows loading state while fetching data', () => {
  render(<Component isLoading={true} />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

### Testing Conditional Rendering

```tsx
it('renders different content based on props', () => {
  const { rerender } = render(<Component variant='primary' />);
  expect(screen.getByText('Primary content')).toBeInTheDocument();

  rerender(<Component variant='secondary' />);
  expect(screen.getByText('Secondary content')).toBeInTheDocument();
});
```
