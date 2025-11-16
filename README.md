# Best React App 🚀

> A production-ready React application built with modern best practices, Feature-Sliced Design architecture, and comprehensive testing.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF.svg)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Tests-Passing-success.svg)]()

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Feature-Sliced Design](#feature-sliced-design)
- [Testing](#testing)
- [Development](#development)
- [Building](#building)

## 🎯 Overview

This application is a modern form management system built with React 19, TypeScript, and shadcn/ui components. It demonstrates enterprise-grade architecture using Feature-Sliced Design (FSD) methodology, ensuring scalability, maintainability, and team collaboration.

### Key Features

- ✅ **TanStack Form Integration** - Type-safe form management with validation
- ✅ **Dynamic Form Builder** - Create and manage forms with various field types
- ✅ **Contact Form** - Full-featured contact form with async validation
- ✅ **Form Status Management** - Track forms through draft, submitted, approved, and rejected states
- ✅ **User Authentication** - Role-based access control with privileges
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Type Safety** - Full TypeScript coverage
- ✅ **Comprehensive Testing** - 89 passing tests with Vitest and Testing Library

## 🏗️ Architecture

### Feature-Sliced Design (FSD)

This project strictly follows **Feature-Sliced Design** - a modern architectural methodology that organizes code by business logic and technical responsibility.

#### Why FSD?

1. **Scalability** - Grows with your application without becoming unmaintainable
2. **Team Collaboration** - Clear boundaries prevent merge conflicts
3. **Predictability** - Standardized structure makes onboarding easier
4. **Maintainability** - Changes are isolated and don't cascade
5. **Testability** - Each layer can be tested independently

#### FSD Layers (Bottom to Top)

```
┌─────────────────────────────────────┐
│           app (App)                 │  ← Application initialization
├─────────────────────────────────────┤
│         pages (Pages)               │  ← Route components
├─────────────────────────────────────┤
│        widgets (Widgets)            │  ← Composite UI blocks
├─────────────────────────────────────┤
│       features (Features)           │  ← User interactions
├─────────────────────────────────────┤
│       entities (Entities)           │  ← Business entities
├─────────────────────────────────────┤
│        shared (Shared)              │  ← Reusable infrastructure
└─────────────────────────────────────┘
```

**Import Rule**: Layers can only import from layers below them, never above.

## 🛠️ Tech Stack

### Core

- **[React 19.2.0](https://react.dev/)** - Latest React with improved performance and new features
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type safety and better developer experience
- **[Vite 7.2.2](https://vitejs.dev/)** - Lightning-fast build tool and dev server

### UI & Styling

- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed, accessible components built with:
  - **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
  - **[Tailwind CSS 4.1.17](https://tailwindcss.com/)** - Utility-first CSS framework
  - **[class-variance-authority](https://cva.style/)** - Component variant management
  - **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Intelligent class merging
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons

**Why shadcn/ui?**
- ✅ Copy-paste components (you own the code)
- ✅ Full customization without fighting the library
- ✅ Built on Radix UI for accessibility
- ✅ TypeScript-first with excellent DX
- ✅ Compatible with React 19

### Routing & State

- **[React Router 7.9.6](https://reactrouter.com/)** - Declarative routing
- **[Zustand 5.0.8](https://zustand-demo.pmnd.rs/)** - Lightweight, fast state management

**Why Zustand?**
- ✅ Minimal boilerplate - no providers or context needed
- ✅ TypeScript-first with excellent inference
- ✅ Tiny bundle size (~1KB)
- ✅ Works outside React components
- ✅ Built-in middleware (persist, combine, etc.)
- ✅ DevTools support

### Data & Forms

- **[TanStack Query 5.90.9](https://tanstack.com/query)** - Powerful async state management
- **[TanStack Form](https://tanstack.com/form)** - Headless, type-safe form state management

### Utilities

- **[Lodash 4.17.21](https://lodash.com/)** - Utility functions
- **[ExcelJS 4.4.0](https://github.com/exceljs/exceljs)** - Excel file generation
- **[@react-pdf/renderer](https://react-pdf.org/)** - PDF generation
- **[oidc-client-ts](https://github.com/authts/oidc-client-ts)** - OpenID Connect authentication

### Development Tools

- **[Vitest 4.0.9](https://vitest.dev/)** - Blazing fast unit test framework
- **[Testing Library](https://testing-library.com/)** - User-centric testing utilities
- **[Biome 2.3.5](https://biomejs.dev/)** - Fast formatter and linter
- **[Husky 9.1.7](https://typicode.github.io/husky/)** - Git hooks
- **[Lefthook 2.0.4](https://github.com/evilmartians/lefthook)** - Fast git hooks manager

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd best-react-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests in watch mode
npm test -- --run    # Run tests once
npm run test:ui      # Open Vitest UI
npm run test:coverage # Generate coverage report

# Code Quality
npm run lint         # Lint code with Biome
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code & sort Tailwind classes
npm run format:check # Check formatting without changes
```

## 📁 Project Structure

```
src/
├── app/                    # Application layer
│   └── App.tsx            # Root component, routing setup
│
├── pages/                  # Pages layer (routes)
│   ├── HomePage.tsx       # Landing page with search and cards
│   ├── FormPage.tsx       # Form builder page
│   ├── DraftsPage.tsx     # Draft forms management
│   └── ReviewPage.tsx     # Form review and approval
│
├── widgets/                # Widgets layer (composite UI)
│   ├── NavbarWithProfile/ # Navigation with user profile
│   ├── FormsTable/        # Forms data table
│   ├── CardGrid/          # Grid of cards
│   └── SearchBar/         # Search with results
│
├── features/               # Features layer (user interactions)
│   ├── card/              # Card feature types
│   ├── search/            # Search functionality
│   ├── form/              # Form management
│   └── navbar/            # Navigation features
│
├── entities/               # Entities layer (business logic)
│   ├── user/
│   │   └── types.ts       # User, UserRole, Privilege
│   └── form/
│       └── types.ts       # Form, FormStatus, FormField, FieldType
│
├── shared/                 # Shared layer (infrastructure)
│   ├── ui/                # UI components (shadcn/ui)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Label.tsx
│   │   ├── Typography.tsx
│   │   ├── Navbar.tsx
│   │   └── Table.tsx
│   ├── lib/               # Utilities
│   │   └── utils.ts       # cn, formatDate, debounce
│   ├── hooks/             # Shared hooks
│   │   ├── useAuth.ts
│   │   └── useResponsive.ts
│   └── api/               # API client setup
│
├── test/                   # Test configuration
│   └── setup.ts           # Vitest setup
│
└── main.tsx               # Application entry point
```

## 🎨 Feature-Sliced Design

### Critical Rules

#### ✅ DO

```typescript
// ✅ Import from lower layers
import { Button } from '@/shared/ui/Button';
import { User } from '@/entities/user/types';
import { useAuth } from '@/shared/hooks/useAuth';

// ✅ Import from same layer (different slices)
import { CardGrid } from '@/widgets/CardGrid';
import { SearchBar } from '@/widgets/SearchBar';
```

#### ❌ DON'T

```typescript
// ❌ NEVER import from upper layers
import { HomePage } from '@/pages/HomePage';  // in widgets
import { CardGrid } from '@/widgets/CardGrid'; // in entities

// ❌ NEVER bypass layers
import { Button } from '@/shared/ui/Button';  // directly in pages
// Instead, use through widgets or features
```

### Layer Responsibilities

#### 1. **app** - Application Initialization
- Routing configuration
- Global providers
- App-wide error boundaries

#### 2. **pages** - Route Components
- One page per route
- Compose widgets
- Handle page-level state
- **Never** contain business logic

#### 3. **widgets** - Composite UI Blocks
- Self-contained UI sections
- Combine multiple features
- Example: `NavbarWithProfile`, `FormsTable`

#### 4. **features** - User Interactions
- Specific user actions
- Business logic for interactions
- Example: `search`, `form submission`

#### 5. **entities** - Business Entities
- Domain models
- Business logic
- Type definitions
- Example: `User`, `Form`, `FormField`

#### 6. **shared** - Reusable Infrastructure
- UI components (shadcn/ui)
- Utilities
- Hooks
- API clients
- **No business logic**

### Why FSD is Non-Negotiable

1. **Prevents Technical Debt** - Clear boundaries prevent "spaghetti code"
2. **Enables Parallel Development** - Teams can work on different features without conflicts
3. **Simplifies Testing** - Each layer can be tested in isolation
4. **Facilitates Refactoring** - Changes are contained within layers
5. **Improves Onboarding** - New developers understand the structure immediately

## 🧪 Testing

### Test Coverage

We maintain **comprehensive test coverage** across all layers:

- ✅ **UI Components** - Button, Typography, Card, Input
- ✅ **Hooks** - useAuth, useResponsive
- ✅ **Utilities** - cn, formatDate, debounce
- ✅ **Integration Tests** - Coming soon

### Running Tests

```bash
# Watch mode (recommended for development)
npm test

# Run once (CI/CD)
npm test -- --run

# With UI
npm run test:ui

# Coverage report
npm run test:coverage
```

### Test Structure

```typescript
// Example: Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Results

```
✓ src/shared/lib/utils.test.ts (9 tests)
✓ src/shared/ui/Typography.test.tsx (5 tests)
✓ src/shared/hooks/useAuth.test.ts (3 tests)
✓ src/shared/ui/Button.test.tsx (6 tests)

Test Files  4 passed (4)
Tests  23 passed (23)
```

## 🗄️ State Management with Zustand

This project uses **Zustand** for global state management following **Feature-Sliced Design** architecture.

### Store Organization (FSD)

| Store | Location | Purpose |
|-------|----------|---------|
| **Cart** | `features/cart/model/` | Feature-owned shopping cart logic |
| **Auth** | `features/auth/model/` | Session, login, privileges, OIDC |
| **Search** | `features/search/model/` | Search UI and business logic |
| **Theme** | `shared/model/` | Global app appearance state |

### Global Stores

#### 1. **Cart Store** (`useCartStore`)

Manages shopping cart state with full CRUD operations.

```typescript
import { useCartStore } from '@/features/cart/model';

function CartButton() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const getTotal = useCartStore((state) => state.getTotal);

  return (
    <button onClick={() => addItem({ id: '1', name: 'Product', price: 10 })}>
      Cart ({items.length}) - ${getTotal()}
    </button>
  );
}
```

**Features:**
- Add/remove items
- Update quantities
- Calculate totals
- Cart drawer state

#### 2. **Auth Store** (`useAuthStore`)

Manages user authentication and authorization.

```typescript
import { useAuthStore } from '@/features/auth/model';
import { Privilege } from '@/entities/user/types';

function ProtectedButton() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const hasPrivilege = useAuthStore((state) => state.hasPrivilege);
  const logout = useAuthStore((state) => state.logout);

  if (!hasPrivilege(Privilege.CREATE_FORM)) {
    return null;
  }

  return <button onClick={logout}>Logout {currentUser?.name}</button>;
}
```

**Features:**
- Login/logout
- User profile management
- Role & privilege checking
- Loading states

#### 3. **Theme Store** (`useThemeStore`)

Manages dark/light theme with system preference support and persistence.

```typescript
import { useThemeStore } from '@/shared/model';

function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
```

**Features:**
- Light/dark/system modes
- Persists to localStorage
- System preference detection
- Auto-applies to DOM

#### 4. **Search Store** (`useSearchStore`)

Manages search queries, results, and recent searches.

```typescript
import { useSearchStore } from '@/features/search/model';

function SearchBar() {
  const query = useSearchStore((state) => state.query);
  const search = useSearchStore((state) => state.search);
  const recentSearches = useSearchStore((state) => state.recentSearches);

  return (
    <input
      value={query}
      onChange={(e) => search(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Features:**
- Search with debouncing
- Recent searches (last 5)
- Loading states
- Clear functionality

### Zustand Best Practices Used

1. **`combine` Middleware** - Separates state from actions for better TypeScript inference
2. **`persist` Middleware** - Auto-saves theme to localStorage
3. **Selector Pattern** - Only subscribe to needed state slices
4. **Computed Values** - Getters for derived state (e.g., `getTotal()`)
5. **Outside React** - Access state via `useCartStore.getState()`

### Testing Stores

All stores have comprehensive unit tests:

```bash
npm test -- --run
```

```
✓ src/features/cart/model/cartStore.test.ts (11 tests)
✓ src/features/auth/model/authStore.test.ts (10 tests)
✓ src/features/search/model/searchStore.test.ts (10 tests)
✓ src/shared/model/themeStore.test.ts (11 tests)

Test Files  4 passed (4)
Tests  42 passed (42)
```

## 📋 Form Management with TanStack Form

This project uses **TanStack Form** for type-safe, headless form state management.

### Why TanStack Form?

- ✅ **Headless** - Full control over UI/UX
- ✅ **Type-safe** - End-to-end TypeScript support
- ✅ **Framework agnostic** - Works with React, Vue, Solid, etc.
- ✅ **Validation** - Built-in sync and async validation
- ✅ **Tiny** - ~5KB gzipped
- ✅ **Zero dependencies** - No schema libraries required
- ✅ **Performant** - Fine-grained reactivity

### Basic Usage

```typescript
import { useForm } from '@tanstack/react-form';
import { useContactFormStore } from '@/features/form/model';

export function ContactForm() {
  const { submitForm } = useContactFormStore();

  const form = useForm({
    defaultValues: {
      firstName: '',
      email: '',
      age: 0,
    },
    onSubmit: async ({ value }) => {
      await submitForm(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* Type-safe field with validation */}
      <form.Field
        name="firstName"
        validators={{
          onChange: ({ value }) =>
            !value
              ? 'First name is required'
              : value.length < 2
                ? 'Must be at least 2 characters'
                : undefined,
        }}
      >
        {(field) => (
          <div>
            <input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 && (
              <span>{field.state.meta.errors.join(', ')}</span>
            )}
          </div>
        )}
      </form.Field>

      {/* Submit button with state */}
      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
```

### Validation Features

#### Synchronous Validation
```typescript
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? 'Invalid email' : undefined;
    },
  }}
>
  {(field) => (/* ... */)}
</form.Field>
```

#### Asynchronous Validation
```typescript
<form.Field
  name="username"
  validators={{
    onChangeAsyncDebounceMs: 500,
    onChangeAsync: async ({ value }) => {
      const exists = await checkUsernameExists(value);
      return exists ? 'Username already taken' : undefined;
    },
  }}
>
  {(field) => (
    <>
      <input {...field} />
      {field.state.meta.isValidating && <span>Checking...</span>}
    </>
  )}
</form.Field>
```

#### Multiple Validation Triggers
```typescript
validators={{
  onChange: ({ value }) => value.length < 3 ? 'Too short' : undefined,
  onBlur: ({ value }) => !value ? 'Required' : undefined,
  onSubmit: ({ value }) => value === 'admin' ? 'Reserved' : undefined,
}}
```

### Form State Management

TanStack Form integrates seamlessly with Zustand for submission handling:

```typescript
// features/form/model/contactFormStore.ts
export const useContactFormStore = create(
  combine(
    {
      submissions: [] as ContactFormData[],
      status: 'idle' as SubmissionStatus,
    },
    (set) => ({
      submitForm: async (data: ContactFormData) => {
        set({ status: 'submitting' });
        // API call
        set({ submissions: [...get().submissions, data], status: 'success' });
      },
    }),
  ),
);
```

### Example: Contact Form

See `src/features/form/ui/ContactForm.tsx` for a complete example with:
- ✅ Multiple field types (text, email, number, textarea)
- ✅ Synchronous and asynchronous validation
- ✅ Error messages and loading states
- ✅ Form submission with Zustand
- ✅ Success/error feedback
- ✅ Form reset after submission

### Testing Forms

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

it('should validate and submit form', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  // Fill in fields
  await user.type(screen.getByLabelText(/first name/i), 'John');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');

  // Submit
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Check success
  await waitFor(() => {
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });
});
```

### Best Practices

1. **Keep validation close to fields** - Define validators inline for clarity
2. **Use async validation sparingly** - Add debounce to avoid excessive API calls
3. **Leverage TypeScript** - Let the form infer types from defaultValues
4. **Separate concerns** - Use Zustand for submission logic, TanStack Form for UI state
5. **Test thoroughly** - Validate both sync and async validation paths

## �� Development

### Adding a New Feature

1. **Define Entity Types** (if needed)
```typescript
// src/entities/product/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}
```

2. **Create Feature Logic**
```typescript
// src/features/product/addToCart.ts
export function addToCart(product: Product) {
  // Feature logic
}
```

3. **Build Widget**
```typescript
// src/widgets/ProductCard/index.tsx
import { Product } from '@/entities/product/types';
import { Button } from '@/shared/ui/Button';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <Button>Add to Cart</Button>
    </div>
  );
}
```

4. **Use in Page**
```typescript
// src/pages/ProductsPage.tsx
import { ProductCard } from '@/widgets/ProductCard';

export function ProductsPage() {
  return <ProductCard product={product} />;
}
```

### Adding shadcn/ui Components

```bash
# Add a new component
npx shadcn@latest add dialog

# Components are automatically added to src/shared/ui/
# They follow FSD structure automatically
```

### Code Style

- Use **Biome** for formatting and linting
- Use **Prettier** with Tailwind plugin for class sorting
- Follow **TypeScript strict mode**
- Write **descriptive variable names**
- Add **JSDoc comments** for complex functions
- Keep components **small and focused**

### Formatting Tailwind Classes

This project uses **Prettier with prettier-plugin-tailwindcss** to automatically sort Tailwind classes:

```bash
# Format all files and sort Tailwind classes
npm run format

# Check if files are formatted correctly
npm run format:check
```

**Before:**
```tsx
<div className="p-4 bg-white flex rounded-lg shadow items-center" />
```

**After:**
```tsx
<div className="flex items-center rounded-lg bg-white p-4 shadow" />
```

Classes are sorted in a consistent, logical order automatically.

### Biome Configuration

This project uses **Biome** for fast linting and formatting. We've configured Biome to work harmoniously with Prettier in `biome.jsonc`:

#### Formatter Settings

To prevent conflicts between Biome and Prettier, we've configured Biome to match Prettier's style:

- **Quote Style**: Single quotes (`'`) for JavaScript/TypeScript and CSS
- **Semicolons**: Always required
- **Trailing Commas**: ES5 style (objects, arrays)
- **Indent**: 2 spaces
- **Line Width**: 80 characters

This ensures running `npm run format` (Prettier) followed by `npm run lint` (Biome) produces no conflicts.

#### Disabled Linting Rules

We've customized certain rules in `biome.jsonc` to match our project's needs:

#### Performance Rules

- **`noNamespaceImport: "off"`**
  - **What**: Allows `import * as React from "react"`
  - **Why**: shadcn/ui components use namespace imports, and it's a common React pattern

- **`noBarrelFile: "off"`**
  - **What**: Allows barrel files (index.ts that re-export multiple modules)
  - **Why**: We use `src/shared/ui/index.ts` to centralize component exports for cleaner imports

#### Style Rules

- **`noEnum: "off"`**
  - **What**: Allows TypeScript enums
  - **Why**: Enums provide type-safe constants for `FormStatus`, `UserRole`, and `FieldType`

- **`useFilenamingConvention: "off"`**
  - **What**: Allows PascalCase filenames (e.g., `HomePage.tsx`)
  - **Why**: React components use PascalCase naming, and files should match component names

#### Suspicious Rules

- **`noExplicitAny: "off"`**
  - **What**: Allows the `any` type
  - **Why**: Generic utilities like `debounce` and dynamic form data legitimately need `any`

- **`noArrayIndexKey: "off"`**
  - **What**: Allows using array index as React `key` prop
  - **Why**: Static lists (like table headers) that never reorder are safe with index keys

- **`useAwait: "off"`**
  - **What**: Allows `async` functions without `await`
  - **Why**: Functions may be async for future API calls or consistency with async patterns

#### Security Rules

- **`noDangerouslySetInnerHtml: "off"`**
  - **What**: Allows `dangerouslySetInnerHTML`
  - **Why**: Table component needs to render formatted HTML content (use with caution)

#### Accessibility Rules

- **`useKeyWithClickEvents: "off"`**
  - **What**: Allows `onClick` without keyboard event handlers
  - **Why**: Some interactive elements have keyboard support through parent components

- **`noStaticElementInteractions: "off"`**
  - **What**: Allows click handlers on `<div>` elements
  - **Why**: Card components use divs for layout; accessibility is handled contextually

- **`noNoninteractiveElementInteractions: "off"`**
  - **What**: Allows event handlers on non-interactive elements
  - **Why**: Custom interactive components built with divs (consider using buttons when appropriate)

#### Complexity Rules

- **`noForEach: "off"`**
  - **What**: Allows `.forEach()` instead of `for...of`
  - **Why**: `.forEach()` is more readable for simple iterations and side effects

#### Nursery Rules

- **`noReactForwardRef: "off"`**
  - **What**: Allows `React.forwardRef`
  - **Why**: While React 19 deprecates it, shadcn/ui components still use it for backward compatibility

- **`useSortedClasses: "off"`**
  - **What**: Disables Biome's Tailwind class sorting
  - **Why**: We use Prettier's `prettier-plugin-tailwindcss` for consistent class ordering

**Note**: These rules are disabled for pragmatic reasons. Always consider security (XSS), accessibility (a11y), and performance when writing code.

## 🏗️ Building

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── index.html
```

### Environment Variables

Create `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Best React App
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📚 Additional Resources

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [React 19 Documentation](https://react.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

1. Follow FSD architecture strictly
2. Write tests for new features
3. Update documentation
4. Use conventional commits
5. Ensure all tests pass before PR

## 📄 License

MIT License - feel free to use this project for learning and production.

---

**Built with ❤️ using Feature-Sliced Design**
```
