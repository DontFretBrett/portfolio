---
title: "Smoother React Navigation with the View Transition API in My Portfolio"
date: "2025-11-15"
tags: ["React", "View Transition API", "Animations", "Performance", "Accessibility", "Single Page Applications", "Web APIs", "CSS"]
excerpt: "How I used the View Transition API to add smooth, accessible route transitions to my React portfolio without introducing heavy animation libraries or breaking older browsers."
description: "A practical walkthrough of integrating the View Transition API into a React + React Router portfolio, including feature detection, accessibility considerations, CSS customization, and real-world implementation details."
keywords: "View Transition API React, React Router animations, SPA page transitions, document.startViewTransition, CSS view-transition-name, smooth navigation animations, accessible animations"
---

The View Transition API is one of the most exciting modern web APIs for improving perceived performance and user experience. Instead of manually choreographing complex exit and enter animations between views, the browser can now snapshot the old and new DOM states and animate between them for you.

In this article, I’ll walk through how I implemented the View Transition API in my React portfolio, using React Router, TypeScript, and a small utility wrapper. The goal was to create **smooth, accessible transitions between pages** while maintaining compatibility with older browsers and respecting user motion preferences.

If you want to go deeper into the underlying platform API, the official MDN documentation is a great reference: [View Transition API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).

## Why the View Transition API for a React Portfolio?

Historically, animating between views in a React single-page app meant:

- Wiring up manual exit/enter animations in your components
- Coordinating route changes with animation lifecycles
- Managing “old vs new” DOM trees in the same document

That approach works, but it can get complex and fragile.

The View Transition API offers a simpler model:

- The browser takes snapshots of the **old** and **new** DOM
- You opt in specific elements with `view-transition-name`
- You style the transition using special pseudo-elements like `::view-transition-old()` and `::view-transition-new()`

For a portfolio site, this is a perfect fit: I want navigation to feel polished, but I don’t want to drag in a heavy animation library or rewrite my routing.

## Architecture Overview

My stack for this implementation:

- **React + TypeScript**
- **React Router** for SPA routing
- **Vite** for bundling
- **Tailwind CSS** + a small amount of custom CSS

The View Transition integration centers around three pieces:

1. A **small TypeScript helper** that wraps `document.startViewTransition`
2. A **navigation component** (`NavLink`) that uses the helper around route changes
3. A bit of **global CSS** to define transition groups and timing

## 1. A Safe, Typed Wrapper Around `document.startViewTransition`

The raw API is exposed as `document.startViewTransition`, but it’s still experimental and not available in every browser. It also needs to respect accessibility features like `prefers-reduced-motion`.

To keep my components clean, I created a tiny helper:

```typescript
// src/utils/viewTransition.ts
// Lightweight wrapper around the View Transition API for SPA route changes.
// Docs: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
// The callback may be async, matching the underlying API's Promise-aware design.

type TransitionCallback = () => void | Promise<void>;

function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

export function startViewTransition(callback: TransitionCallback) {
  // Always run the callback; bail out early if we shouldn't animate.
  if (typeof document === 'undefined' || shouldReduceMotion()) {
    callback();
    return;
  }

  const anyDocument = document as Document & {
    startViewTransition?: (cb: () => void | Promise<void>) => unknown;
  };

  if (typeof anyDocument.startViewTransition !== 'function') {
    callback();
    return;
  }

  anyDocument.startViewTransition(() => {
    callback();
  });
}
```

This helper follows View Transition API best practices:

- **Feature detection**: gracefully falls back when `startViewTransition` is unavailable
- **Accessibility**: honors `prefers-reduced-motion` and skips animations when users request less motion
- **Async-friendly**: allows the callback to be `async`, aligned with the spec and React’s async patterns

## 2. Wrapping React Router Navigation with View Transitions

Next, I updated my `NavLink` component, which powers both the main header and the compact header navigation. Instead of letting `react-router-dom` handle navigation directly on click, I intercept the click and wrap the `navigate` call in a view transition.

Key goals:

- Keep **existing analytics hooks** working
- Respect **modifier keys** (e.g., Cmd+Click to open in a new tab)
- Avoid **redundant navigation** (clicking the current route should do nothing)

```tsx
// src/components/NavLink.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { startViewTransition } from '../utils/viewTransition';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'header' | 'compact';
  shortText?: string;
}

export default function NavLink({
  to,
  children,
  onClick,
  className,
  variant = 'header',
  shortText
}: NavLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const baseClasses = variant === 'header'
    ? 'px-4 py-2 bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-gray-100 hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/10 hover:border-white/20 dark:border-gray-600/30 dark:hover:border-gray-500/40'
    : 'px-2 py-1.5 sm:px-3 bg-white/15 hover:bg-white/25 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-white hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/20 hover:border-white/30 dark:border-gray-600/30 dark:hover:border-gray-500/40 text-sm font-medium drop-shadow-sm';

  const combinedClassName = className ? `${baseClasses} ${className}` : baseClasses;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick();
    }

    // Respect modifier keys / non-left clicks
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    // Avoid redundant navigation
    if (location.pathname === to) {
      return;
    }

    event.preventDefault();

    startViewTransition(() => {
      navigate(to);
    });
  };

  return (
    <Link to={to} onClick={handleClick} className={combinedClassName}>
      {variant === 'compact' && shortText ? (
        <>
          <span className="hidden sm:inline">{children}</span>
          <span className="sm:hidden">{shortText}</span>
        </>
      ) : (
        children
      )}
    </Link>
  );
}
```

With this change, any navigation triggered via `NavLink` gets a smooth view transition in supported browsers, while still behaving exactly like a normal React Router link from the user’s perspective.

## 3. Styling Transitions with `view-transition-name` and Pseudo-Elements

The core of the visual effect lives in CSS. I opted into transitions for:

- The entire `body` (as a root group)
- The main content region with `id="main-content"`

This allows me to keep the header and footer stable while the main content cross-fades between routes.

```css
/* src/index.css */
/* View Transition API enhancements for smoother SPA navigation */
@supports (view-transition-name: none) {
  body {
    view-transition-name: body-root;
  }

  /* Treat the main content as a distinct transition group */
  #main-content {
    view-transition-name: main-content;
  }

  ::view-transition-old(body-root),
  ::view-transition-new(body-root) {
    animation-duration: 220ms;
    animation-timing-function: ease-in-out;
  }

  ::view-transition-old(main-content),
  ::view-transition-new(main-content) {
    animation-duration: 260ms;
    animation-timing-function: ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(body-root),
    ::view-transition-new(body-root),
    ::view-transition-old(main-content),
    ::view-transition-new(main-content) {
      animation-duration: 0.01ms;
    }
  }
}
```

This approach keeps the transitions:

- **Subtle**: short, ease-in-out animations that enhance without distracting
- **Targeted**: focused on the main content region, not the entire UI
- **Accessible**: fully disabled for users who prefer reduced motion

## Accessibility and Progressive Enhancement

From the start, the integration followed a progressive enhancement mindset:

- If the View Transition API doesn’t exist, navigation simply works as before.
- If users prefer reduced motion, the helper runs the callback without animation.
- If CSS `view-transition-name` isn’t supported, the pseudo-element rules are ignored.

This mirrors the guidance from MDN and modern articles on view transitions: **treat animations as an enhancement, not a requirement**.

Combined with existing accessibility work in the portfolio (skip links, focus-visible styles, high contrast support, and reduced-motion handling), the View Transition API slots in cleanly without compromising usability.

## Results and Next Steps

After enabling view transitions:

- **Route changes feel smoother**, especially when moving between major sections like Home, Blog, and AI Projects.
- The implementation required **minimal JavaScript** and **no additional animation library**.
- The code remains maintainable and easy to disable or tweak if the spec evolves.

Future enhancements I’m considering:

- Assigning custom `view-transition-name` values to specific elements (e.g., blog post titles or avatars) and creating “shared element” style transitions between lists and detail pages.
- Experimenting with more advanced animations on `::view-transition-image-pair()` for card-to-detail transitions.
- Exploring cross-document transitions if I introduce more multi-page navigation in the future.

If you’re building a React SPA in 2025, the View Transition API is absolutely worth experimenting with. It gives you **native-feeling transitions**, better perceived performance, and a modern, standards-based approach to animations—all while keeping your React code clean and accessible. 


