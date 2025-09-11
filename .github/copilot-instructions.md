# AI Agent Instructions for Portfolio Project

## Project Overview
Modern portfolio website built with React 19, TypeScript, and Vite, featuring blog system, AI projects showcase, and advanced performance optimizations.

## Essential Development Commands
```bash
pnpm dev        # Development server (port 5173)
pnpm build      # Production build with static blog generation
pnpm typecheck  # TypeScript validation
pnpm lint       # ESLint check
pnpm test:build # Full validation (typecheck + lint + build)
```

## Key Architecture Patterns

### Route-Based Code Splitting
- Pages are lazy-loaded via React.lazy() in `src/App.tsx`
- Example: 
```typescript
const BlogPage = lazy(() => import('@pages/BlogPage'));
```

### Theme Management
- Use `ThemeContext` from `src/contexts/ThemeContext.tsx`
- Theme changes must persist to localStorage
- Follow branded type pattern for type safety:
```typescript
type Theme = 'light' | 'dark';
```

### Content Management
- Blog posts: Add Markdown files to `src/content/`
- Projects: Update `src/data/aiProjects.ts`
- Always include metadata for SEO/crawlers
- Follow guidelines in `ai-guidelines/blog-guidelines.md`

## Project Structure Conventions
- `@components/` - Reusable UI components
- `@pages/` - Route components (lazy-loaded)
- `@content/` - Markdown blog posts
- `@data/` - Static data files
- `@types/` - TypeScript definitions
- `@utils/` - Utility functions

## Critical Integration Points
1. **Giscus Comments**:
   - Uses GitHub Discussions
   - Config in `src/components/Giscus.tsx`
   - Requires repository configuration

2. **Analytics Integration**:
   - GA4 configuration in `src/config/analytics.ts`
   - Events must follow naming convention: `{category}_{action}`

3. **Feature Flags**:
   - Centralized in `src/config/features.ts`
   - Used for conditional feature loading

## Type Safety Requirements
- No `any` types allowed
- Use branded types for enhanced safety
- Always define interfaces in `src/types/`
- Example from ThemeContext:
```typescript
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
```

## Performance Guidelines
- Implement React.memo for expensive renders
- Use dynamic imports for large dependencies
- Follow code splitting patterns in existing pages
- Keep bundle chunks under 500KB

## Common Pitfalls
- Don't modify `ThemeContext` directly; use provided hooks
- Always handle loading states with Suspense
- Include error boundaries for async components
- Test dark mode when adding new components

## SEO Requirements
- All pages need meta tags via React Helmet Async
- Follow schema.org markup patterns in blog posts
- Generate static HTML for AI crawlers during build
- Example metadata structure:
```typescript
{
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}
```