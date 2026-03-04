# Component Architecture Rules

This project uses a **strict layered component architecture** to ensure clarity, reusability, and long-term maintainability.

Each layer has a **single responsibility** and **clear dependency boundaries**.

---

## Layer Order

atoms → molecules → organism → template → pages

Components may only import **from layers below them**.

---

## Folder Responsibilities

### `atoms/` — Primitive UI Elements

The smallest, most reusable UI building blocks.

#### Examples

- Button
- Input
- Text
- Icon
- Spinner

#### Rules

- No business logic
- No data fetching
- No side effects
- No imports from other layers
- Styling only via `*.styles.ts` or CVA

Atoms must be **completely context-agnostic**.

---

### `molecules/` — Small Compositions

Simple compositions of multiple atoms with a narrow responsibility.

#### Examples

- FormField
- SearchBox
- UserBadge

#### Rules

- May import from `atoms`
- Light local logic is allowed
- No routing
- No data fetching
- Reusable across multiple features and pages

Molecules add **structure**, not **behavior**.

---

### `organism/` — Page Sections

Self-contained UI sections that represent meaningful parts of a page.

#### Examples

- Navbar
- Footer
- Sidebar
- AuthForm
- HomeHero

#### Rules

- May use state and React hooks
- May import from `atoms` and `molecules`
- No routing
- No direct API or server calls
- No knowledge of pages or template

Organisms define **presentation-level intent**, not application flow.

---

### `template/` — Page Template

Reusable page skeletons that define overall structure.

#### Examples

- DashboardTemplate
- AuthTemplate

#### Rules

- Compose `organism` components
- No business logic
- No data fetching
- No application state

Template control **structure only**, not behavior.

---

## Pages (`app/`)

Pages are the **top-level orchestration layer**.

Pages are responsible for:

- Routing
- Data fetching
- Server actions
- Feature composition
- Passing data down into template and sections

Pages must remain **thin** and should not contain UI complexity.

---

## Dependency Rules (Strict)

Allowed import direction:

atoms → molecules → organism → template → pages

Forbidden:

- Importing from higher layers
- Skipping layers
- Circular dependencies
- Deep imports bypassing `index.ts`

All imports must go through a **public API (`index.ts`)**.

---

## Public API Rule

Every component folder **must expose an `index.ts`**.

### Correct

```ts
import { Button } from '@/components/atoms/button'
```

### Incorrect

```ts
import { Button } from '@/components/atoms/button/button'
```
