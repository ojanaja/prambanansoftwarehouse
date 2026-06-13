# Technical Modernization Upgrade Plan

This document outlines the roadmap, breaking changes, and migration procedures for upgrading the Prambanan Digital codebase to modern web standards.

---

## 1. Next.js 15 Upgrade Plan

Next.js 15 requires React 19. Upgrading to Next.js 15 will streamline performance, improve dev logs, and adapt to modern rendering architecture.

### Key Breaking Changes & Fixes

#### A. Asynchronous Route Parameters (`params` and `searchParams`)
In Next.js 15, `params` and `searchParams` on layouts, pages, and route handler entry points are **Promises** and must be awaited before accessing properties.

* **Legacy Next 14 (Before):**
  ```tsx
  export default function ProjectDetail({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    // ...
  }
  ```
* **Next 15 Migration (After):**
  ```tsx
  export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // ...
  }
  ```

#### B. Caching Defaults Changes
`fetch` requests, GET route handlers, and client-side page transitions are **no longer cached by default** (they are dynamic by default).
* **Action:** To preserve server-side caching of API requests or CMS fetches, explicitly set the cache option:
  ```typescript
  fetch(url, { cache: 'force-cache' })
  ```
  Or declare static route parameters:
  ```typescript
  export const dynamic = 'force-static';
  ```

#### C. React Hook Form & next-safe-action (if used)
Ensure all form libraries and validation middleware are updated to versions compatible with React 19 types.

### Recommended Upgrade Steps
1. Run the Next.js upgrade codemod to automate syntax transitions:
   ```bash
   npx @next/codemod@latest upgrade
   ```
2. Manually verify layouts, pages, and API routes parameter typings.
3. Test builds with `npm run build` and monitor for un-awaited params warnings.

---

## 2. React 19 Upgrade Plan

React 19 introduces native compiler enhancements, new lifecycle hooks, and removes legacy wrappers.

### Key Features & Deprecations

#### A. Ref as a Prop (No `forwardRef`)
You can now pass `ref` as a normal component prop. `forwardRef` is deprecated.
* **Legacy (Before):**
  ```tsx
  const CustomButton = React.forwardRef<HTMLButtonElement, Props>((props, ref) => (
    <button ref={ref} {...props} />
  ));
  ```
* **React 19 (After):**
  ```tsx
  function CustomButton({ ref, ...props }: Props & { ref: React.Ref<HTMLButtonElement> }) {
    return <button ref={ref} {...props} />;
  }
  ```

#### B. Context as Provider
Use `<Context>` instead of `<Context.Provider>` to provide context values.
* **React 19 (After):**
  ```tsx
  export function ThemeProvider({ children }) {
    return <ThemeContext value="dark">{children}</ThemeContext>;
  }
  ```

#### C. New Async Action Hooks
Introduce native handling for forms, actions, and pending states:
* `useActionState` (replacing `useFormState` from Next.js)
* `useFormStatus`

### Recommended Upgrade Steps
1. Upgrade packages: `npm install react@latest react-dom@latest --legacy-peer-deps`
2. Check for typing mismatches, specifically related to `@types/react` where children prop must be explicitly typed, and custom `forwardRef` instances can be simplified.
3. Test compatibility with dynamic third-party libraries (GSAP, Lottie, Swiper).

---

## 3. Tailwind CSS v4 Upgrade Plan

Tailwind v4 features a Rust-based fast compilation engine, deprecates `tailwind.config.js`, and shifts configuration entirely to CSS.

### Key Architectural Shifts

#### A. CSS-First Configuration
Custom theme values, breakpoints, and colors are defined using CSS variables and the `@theme` directive directly inside your primary stylesheet (e.g. `src/app/globals.css`), rather than `tailwind.config.js`.

* **Tailwind v4 Syntax (`globals.css`):**
  ```css
  @import "tailwindcss";

  @theme {
    --color-primary-50: #fff7f5;
    --color-primary-500: #ef613d;
    --font-sans: 'Inter', sans-serif;
  }
  ```

#### B. Automatic Content Detection
Tailwind v4 automatically scans all codebase files for classes. You do not need to configure the `content` file paths array anymore.

#### C. Built-in Imports
V4 handles CSS imports out of the box using standard `@import "tailwindcss";` syntax, replacing the three `@tailwind` base directives.

### Recommended Upgrade Steps
1. Run the official upgrade tool:
   ```bash
   npx @tailwindcss/upgrade
   ```
   This tool will automatically convert your `tailwind.config.js` into CSS-based `@theme` values and adjust syntax.
2. Clean up `tailwind.config.js` and verify custom animations/fonts transition correctly into CSS variables.
3. Build the assets and run visual smoke tests on key page layouts.
