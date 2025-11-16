# 🏗️ Feature-Sliced Design (FSD) Guide

## What is FSD?

FSD is an architectural methodology for frontend projects (React) that organizes code by **features and business domains**, not by technical layers.  
This increases maintainability, modularity, and clear ownership—especially for large, fast-moving projects.

***

## Principles of FSD

### 1. **Domain Ownership**
Each folder should encapsulate a business/domain concern.

**What this means:**
- If you're working on "shopping cart" functionality, ALL cart-related code lives in `features/cart/`
- No scattering cart logic across multiple unrelated folders
- Easy to find, modify, or delete entire features

**Example:**
```
✅ GOOD: features/cart/model/cartStore.ts
✅ GOOD: features/cart/ui/CartDrawer.tsx
❌ BAD:  shared/stores/cart.ts (cart is a feature, not shared)
❌ BAD:  utils/cartHelpers.ts (should be in features/cart/lib/)
```

### 2. **Encapsulation**
Features own their state, UI, and logic—no "global" state except for truly shared cross-cutting concerns.

**What this means:**
- Cart state belongs in `features/cart/model/`
- Auth state belongs in `features/auth/model/`
- Only truly global state (like theme) goes in `shared/model/`

**Example:**
```typescript
// ✅ GOOD: Feature-owned state
import { useCartStore } from '@/features/cart/model';
import { useAuthStore } from '@/features/auth/model';

// ✅ GOOD: Truly global state
import { useThemeStore } from '@/shared/model';

// ❌ BAD: Don't put feature state in shared
import { useCartStore } from '@/shared/store'; // Wrong!
```

### 3. **Layer Separation**
Divide app into *features*, *entities*, *widgets*, *shared*, and *pages*.

**The Hierarchy (bottom to top):**
```
┌─────────────────────────────────────┐
│           pages (Pages)             │  ← Routes/screens
├─────────────────────────────────────┤
│         widgets (Widgets)           │  ← Composite UI blocks
├─────────────────────────────────────┤
│       features (Features)           │  ← Business logic
├─────────────────────────────────────┤
│       entities (Entities)           │  ← Domain models
├─────────────────────────────────────┤
│        shared (Shared)              │  ← Generic utilities
└─────────────────────────────────────┘
```

**Import Rule:** Higher layers can import from lower layers, but NEVER the reverse.

### 4. **Explicit Boundaries**
Never mix concerns; know exactly who "owns" a piece of code or state.

**Questions to ask:**
- Who is responsible for this code?
- If I need to change cart behavior, where do I look?
- Can I delete this feature folder without breaking unrelated code?

***

## Project Structure (Recommended)

```
src/
  app/                    # App entry, providers, theming, router
  features/               # Business features (cart, search, auth, form, etc)
    cart/
      model/                # Zustand store, actions, business logic
      ui/                   # Feature-specific UI and components
      api/                  # API interactions just for this feature
    search/
      model/
      ui/
      ...
    auth/
      model/
      ui/
      ...
  entities/                # Business entities (user, form, etc)
    user/
      model/
      ui/
      ...
    form/
      ...
  widgets/                 # Smart UI composed from features/entities/shared
    CardGrid/
    NavbarWithProfile/
  pages/                   # Route-level components (Home, FormPage, Review)
    HomePage.tsx
    FormPage.tsx
    ReviewPage.tsx
  shared/                  # Global UI, generic hooks, utils, theme, API
    ui/                      # Custom Material Tailwind components, wrappers
    hooks/                   # Utility hooks (e.g., useBoolean)
    lib/                     # Utility pure functions, helpers (e.g., formatDate)
    model/                   # Truly global state (e.g., themeStore)
    api/                     # Shared API clients, TanStack Query configs
```

***

## Where Do New Files & Logic Go?

1. **Is it a business feature?**  
   - Example: Cart, Search, Auth, Form, Profile, Review
   - **Put it in:** `src/features/<feature>/`

2. **Does it represent a central, reusable domain object (entity)?**  
   - Example: User, Form, Product  
   - **Put it in:** `src/entities/<entity>/`  
   - Entities should not have business logic, only modeling (state, data, types).

3. **Is it a reusable smart UI block, often made by combining different features/entities?**  
   - Example: `CardGrid`, `FormsTable`, `NavbarWithProfile`
   - **Put it in:** `src/widgets/<WidgetName>/`

4. **Is it a route/view component?**  
   - Example: `HomePage`, `FormPage`, `ReviewPage`
   - **Put it in:** `src/pages/`

5. **Is it a truly shared util, UI element, or configuration?**  
   - Example: Custom Button, utility hooks, theme, API configs
   - **Put it in:** `src/shared/` in the relevant subfolder.

***

## 🎯 Decision Tree: Where Does My Code Go?

Use this flowchart to decide where to place new code:

```
START: I need to add new code...
│
├─ Is it a ROUTE/SCREEN?
│  └─ YES → pages/MyPage.tsx
│
├─ Is it BUSINESS LOGIC for a specific feature?
│  ├─ State management (Zustand)? → features/<feature>/model/
│  ├─ API calls for this feature? → features/<feature>/api/
│  ├─ UI specific to this feature? → features/<feature>/ui/
│  └─ Types for this feature? → features/<feature>/types.ts
│
├─ Is it a DOMAIN MODEL (data structure used everywhere)?
│  ├─ Types/interfaces? → entities/<entity>/types.ts
│  └─ NO business logic, just data modeling
│
├─ Is it a COMPOSITE UI BLOCK (combines multiple features)?
│  └─ YES → widgets/MyWidget/
│
└─ Is it TRULY GENERIC (used across many unrelated features)?
   ├─ UI component (Button, Input)? → shared/ui/
   ├─ Utility function (formatDate)? → shared/lib/
   ├─ Generic hook (useDebounce)? → shared/hooks/
   ├─ Global state (theme)? → shared/model/
   └─ API client config? → shared/api/
```

### Detailed Decision Questions

#### **1. What context does this serve?**

**If logic/UI is only relevant to ONE feature:**
```
✅ features/cart/model/cartStore.ts
✅ features/auth/ui/LoginForm.tsx
✅ features/search/api/searchApi.ts
```

**If it's used by MULTIPLE features:**
- Is it a domain model? → `entities/`
- Is it generic utility? → `shared/`
- Is it a composite UI? → `widgets/`

#### **2. Is it core data or a model used everywhere?**

**Examples of entities:**
- `User` - used by auth, profile, forms, etc.
- `Form` - used by form builder, drafts, review
- `Product` - used by cart, catalog, orders

```
✅ entities/user/types.ts
✅ entities/form/types.ts
❌ entities/cart/cartState.ts (cart is a feature, not an entity!)
```

#### **3. Will this be reused across many parts of the app?**

**Ask: "Is this tied to business logic?"**
- YES → It's probably a feature or entity
- NO → It's probably shared

```
✅ shared/ui/Button.tsx (generic button)
✅ shared/lib/formatDate.ts (pure utility)
❌ shared/ui/CartButton.tsx (cart-specific, should be in features/cart/ui/)
```

#### **4. Is it a composition of components?**

**Widgets combine features/entities/shared:**
```
✅ widgets/NavbarWithProfile/
   - Uses: features/auth/model (for user)
   - Uses: shared/ui/Navbar (for layout)
   - Combines them into a smart component

✅ widgets/FormsTable/
   - Uses: entities/form/types
   - Uses: shared/ui/Table
   - Adds form-specific logic
```

***

### Common Patterns

- **Zustand Stores:**  
  - `features/<feature>/model/<feature>Store.ts`  
  - Only global themes or settings: `shared/model/themeStore.ts`

- **API Interactions:**  
  - Feature-specific APIs: `features/<feature>/api/`
  - Shared clients/configs: `shared/api/`

- **UI Components:**  
  - Feature-specific: `features/<feature>/ui/`
  - Generic and reusable (often wrapping Material Tailwind): `shared/ui/`

- **Hooks:**  
  - Generic, shareable: `shared/hooks/`
  - Feature-specific: `features/<feature>/model/` or `features/<feature>/hooks/`

***

## 📚 Real Examples from This Codebase

### Current Structure Validation

| What We Have | Location | ✅ Correct? | Why |
|--------------|----------|------------|-----|
| Contact form | `features/form/` | ✅ YES | Feature with TanStack Form integration |
| Form builder | `features/formBuilder/` | ✅ YES | Feature for creating forms |
| Cart store | `features/cart/model/cartStore.ts` | ✅ YES | Feature-owned business logic |
| Auth store | `features/auth/model/authStore.ts` | ✅ YES | Feature for session/login |
| Search store | `features/search/model/searchStore.ts` | ✅ YES | Feature for search logic |
| Theme store | `shared/model/themeStore.ts` | ✅ YES | Truly global app state |
| User types | `entities/user/types.ts` | ✅ YES | Domain model used everywhere |
| Form types | `entities/form/types.ts` | ✅ YES | Domain model used everywhere |
| Card types | `entities/card/types.ts` | ✅ YES | Domain model for card data |
| Button component | `shared/ui/Button.tsx` | ✅ YES | Generic, reusable UI |
| NavbarWithProfile | `widgets/NavbarWithProfile/` | ✅ YES | Composite UI block |
| CardGrid | `widgets/CardGrid/` | ✅ YES | Composite UI for displaying cards |
| HomePage | `pages/HomePage.tsx` | ✅ YES | Route-level component |
| ContactPage | `pages/ContactPage.tsx` | ✅ YES | Route for contact form |
| FormPage | `pages/FormPage.tsx` | ✅ YES | Route for form builder |

### Common Scenarios & Solutions

#### Scenario 0: "I want to add a contact form with TanStack Form" (Real Example from This Project)

**What you need:**
- Contact form UI with validation
- Form submission state management
- Success/error handling

**Where it goes:**
```
features/form/
├── model/
│   ├── contactFormStore.ts      # Zustand store for submissions
│   ├── contactFormStore.test.ts # Store tests
│   └── index.ts                 # Barrel export
├── ui/
│   ├── ContactForm.tsx          # TanStack Form component
│   ├── ContactForm.test.tsx     # Component tests
│   └── index.ts                 # Barrel export
├── types.ts                     # ContactFormData, SubmissionStatus
└── index.ts                     # Feature barrel export

pages/
└── ContactPage.tsx              # Route that uses ContactForm

entities/form/
└── types.ts                     # Generic Form entity (used by multiple features)
```

**Why this structure?**
- `ContactForm` is a feature (specific business logic for contact)
- `Form` entity is shared by contact form AND form builder
- Each feature has its own store, UI, and types
- Page just composes the feature

**Code example:**
```typescript
// features/form/index.ts
export { useContactFormStore } from './model';
export { ContactForm } from './ui';
export type { ContactFormData, SubmissionStatus } from './types';

// pages/ContactPage.tsx
import { ContactForm } from '@/features/form';

export function ContactPage() {
  return <ContactForm />;
}
```

#### Scenario 1: "I want to add a product catalog feature"

**What you need:**
- Product listing
- Product filtering
- Product state management

**Where it goes:**
```
features/catalog/
├── model/
│   ├── catalogStore.ts      # Product list state, filters
│   └── index.ts
├── ui/
│   ├── ProductList.tsx      # Display products
│   ├── ProductFilters.tsx   # Filter UI
│   └── ProductCard.tsx      # Individual product
├── api/
│   └── catalogApi.ts        # Fetch products from backend
└── types.ts                 # Catalog-specific types
```

**Why not entities?**
- `Product` type → `entities/product/types.ts` (used by catalog, cart, orders)
- Catalog logic → `features/catalog/` (specific to browsing/filtering)

#### Scenario 2: "I need a reusable modal component"

**Decision process:**
1. Is it tied to a specific feature? NO
2. Is it generic and reusable? YES
3. → Goes in `shared/ui/Modal.tsx`

```typescript
// ✅ GOOD
import { Modal } from '@/shared/ui/Modal';

// Use it in any feature
function CartDrawer() {
  return <Modal>{/* cart content */}</Modal>;
}
```

#### Scenario 3: "I want to add user profile editing"

**What you need:**
- Profile form
- Update user API call
- Profile state

**Where it goes:**
```
features/profile/
├── model/
│   └── profileStore.ts      # Profile edit state
├── ui/
│   ├── ProfileForm.tsx      # Edit form
│   └── AvatarUpload.tsx     # Avatar upload
└── api/
    └── profileApi.ts        # Update profile endpoint

entities/user/
└── types.ts                 # User type (already exists)
```

**Why this split?**
- `User` type is an entity (used by auth, profile, forms)
- Profile editing is a feature (specific business logic)

#### Scenario 4: "I need a dashboard page with multiple widgets"

**Structure:**
```
pages/
└── DashboardPage.tsx        # Route component

widgets/
├── StatsCard/               # Shows statistics
├── RecentActivity/          # Shows recent actions
└── QuickActions/            # Action buttons

features/
├── stats/model/             # Stats data logic
└── activity/model/          # Activity data logic
```

**DashboardPage.tsx:**
```typescript
import { StatsCard } from '@/widgets/StatsCard';
import { RecentActivity } from '@/widgets/RecentActivity';
import { QuickActions } from '@/widgets/QuickActions';

export function DashboardPage() {
  return (
    <div>
      <StatsCard />
      <RecentActivity />
      <QuickActions />
    </div>
  );
}
```

#### Scenario 5: "I need to format dates across the app"

**Decision:**
- Not tied to any feature? YES
- Pure utility function? YES
- → Goes in `shared/lib/formatDate.ts`

```typescript
// ✅ GOOD
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// Import anywhere
import { formatDate } from '@/shared/lib/formatDate';
```

***

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Putting everything in `shared/`

```typescript
// ❌ BAD
shared/
├── stores/
│   ├── cartStore.ts         // Cart is a feature!
│   ├── authStore.ts         // Auth is a feature!
│   └── searchStore.ts       // Search is a feature!
```

**Why it's wrong:** These are features with specific business logic, not generic utilities.

**✅ Fix:**
```typescript
features/
├── cart/model/cartStore.ts
├── auth/model/authStore.ts
└── search/model/searchStore.ts
```

### ❌ Mistake 2: Creating "utils" or "helpers" folders

```typescript
// ❌ BAD
utils/
├── cartHelpers.ts           // Cart-specific
├── formValidation.ts        // Form-specific
└── searchUtils.ts           // Search-specific
```

**Why it's wrong:** These are feature-specific, not generic.

**✅ Fix:**
```typescript
features/cart/lib/cartHelpers.ts
features/form/lib/validation.ts
features/search/lib/searchUtils.ts
```

### ❌ Mistake 3: Mixing business logic in entities

```typescript
// ❌ BAD
entities/user/
├── types.ts
└── userActions.ts           // Business logic!
```

**Why it's wrong:** Entities are just data models, no business logic.

**✅ Fix:**
```typescript
entities/user/
└── types.ts                 // Just types

features/auth/
└── model/authStore.ts       // User-related business logic
```

### ❌ Mistake 4: Creating "components" folder

```typescript
// ❌ BAD
components/
├── LoginForm.tsx            // Auth-specific
├── CartItem.tsx             // Cart-specific
└── SearchBar.tsx            // Search-specific
```

**Why it's wrong:** Components should be organized by feature or shared.

**✅ Fix:**
```typescript
features/auth/ui/LoginForm.tsx
features/cart/ui/CartItem.tsx
features/search/ui/SearchBar.tsx
```

***

## Quick Reference Table

| I'm adding... | Where does it go? | Example |
|---------------|-------------------|---------|
| Shopping cart logic | `features/cart/model/` | `cartStore.ts` |
| Login form | `features/auth/ui/` | `LoginForm.tsx` |
| User type definition | `entities/user/` | `types.ts` |
| Generic button | `shared/ui/` | `Button.tsx` |
| Date formatter | `shared/lib/` | `formatDate.ts` |
| Dashboard page | `pages/` | `DashboardPage.tsx` |
| Stats widget | `widgets/StatsCard/` | `index.tsx` |
| Theme toggle | `shared/model/` | `themeStore.ts` |
| Cart API calls | `features/cart/api/` | `cartApi.ts` |
| Generic hook | `shared/hooks/` | `useDebounce.ts` |

***

## 🔄 Refactoring Existing Code to FSD

### When to Refactor

**Signs your code needs reorganization:**
- ✅ You can't find where a feature's logic lives
- ✅ Changing one feature breaks another
- ✅ `shared/` folder is huge and mixed
- ✅ You have `utils/`, `helpers/`, or `components/` folders
- ✅ State management is scattered everywhere

### Step-by-Step Refactoring

#### Step 1: Identify Features
List all business features in your app:
```
✅ Cart
✅ Auth
✅ Search
✅ Profile
✅ Forms
✅ Reviews
```

#### Step 2: Create Feature Folders
```bash
mkdir -p src/features/cart/{model,ui,api}
mkdir -p src/features/auth/{model,ui,api}
mkdir -p src/features/search/{model,ui,api}
```

#### Step 3: Move Files Gradually
Don't move everything at once! Move one feature at a time:

```bash
# Example: Moving cart
mv src/stores/cartStore.ts src/features/cart/model/
mv src/components/CartDrawer.tsx src/features/cart/ui/
mv src/api/cart.ts src/features/cart/api/
```

#### Step 4: Update Imports
```typescript
// Before
import { useCartStore } from '@/stores/cartStore';
import { CartDrawer } from '@/components/CartDrawer';

// After
import { useCartStore } from '@/features/cart/model';
import { CartDrawer } from '@/features/cart/ui';
```

#### Step 5: Test
Run tests after each feature migration:
```bash
npm test
npm run lint
```

### Migration Checklist

- [ ] Identify all features
- [ ] Create feature folders
- [ ] Move state management (stores)
- [ ] Move feature-specific UI
- [ ] Move feature-specific API calls
- [ ] Update all imports
- [ ] Run tests
- [ ] Update documentation

***

## 🎓 Learning Path

### For New Developers

1. **Start here:** Read "What is FSD?" and "Principles"
2. **Use the decision tree:** When adding code, follow the flowchart
3. **Check examples:** Look at real scenarios before coding
4. **Ask questions:** "Where does this belong?" before creating files

### For Code Reviewers

**Questions to ask in PRs:**
- ✅ Is this in the right layer?
- ✅ Does this feature own its state?
- ✅ Are imports following the hierarchy?
- ✅ Is `shared/` truly generic?
- ✅ Are entities free of business logic?

### Red Flags in Code Review

```typescript
// 🚨 RED FLAG: Feature state in shared
import { useCartStore } from '@/shared/store';

// 🚨 RED FLAG: Business logic in entities
entities/user/userActions.ts

// 🚨 RED FLAG: Generic utils in features
features/cart/utils/formatDate.ts  // Should be in shared/lib/

// 🚨 RED FLAG: Feature-specific UI in shared
shared/ui/CartButton.tsx  // Should be in features/cart/ui/
```

***

## 📖 Additional Resources

### Official FSD Documentation
- [Feature-Sliced Design](https://feature-sliced.design/)
- [FSD Examples](https://feature-sliced.design/examples)

### This Project's Structure
```bash
# View current structure
tree src -L 3 -I 'node_modules|*.test.*'

# Find all stores
find src -name "*Store.ts"

# Find all widgets
ls -la src/widgets/
```

***

## Final Guidance

### Core Principles (Remember These!)

1. **Err on the side of encapsulation.**  
   - Keep unrelated logic out of shared and entity layers.
   - When in doubt, make it feature-specific first.

2. **Features own their state and logic.**
   - Cart logic lives in `features/cart/`
   - Auth logic lives in `features/auth/`
   - Never scatter feature logic across the app.

3. **Entities model the world, not how the app works.**
   - `User` is an entity (what a user IS)
   - Login/logout is a feature (what the app DOES with users)

4. **Widgets compose UI, not logic.**
   - Widgets combine components from features/entities/shared
   - Business logic stays in features

5. **Pages map to route-level screens only.**
   - One page per route
   - Pages compose widgets and features
   - Minimal logic in pages

6. **Shared is only for truly generic, app-wide utilities.**
   - Ask: "Would this be useful in a completely different app?"
   - If YES → `shared/`
   - If NO → `features/` or `entities/`

### The Golden Rule

> **"If you can delete a feature folder without breaking unrelated code, you've done FSD correctly."**

***

> Following this guide ensures your codebase remains clean, modular, and ready to scale with clear logic ownership.

---