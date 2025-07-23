# Technology Stack

## Core Framework
- **React 19** with TypeScript - Latest React features and full type safety
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS with class-based dark mode
- **pnpm** - Package manager (preferred over npm/yarn)

## Key Libraries
- **React Router DOM 7** - Client-side routing
- **Framer Motion** - Animations and transitions
- **React Markdown** - Markdown rendering with syntax highlighting
- **React Helmet Async** - SEO meta tag management
- **Lucide React** - Icon library
- **Giscus** - GitHub Discussions-powered comments

## Development Tools
- **TypeScript 5.8+** - Strict configuration with enhanced linting
- **ESLint 9** - Modern flat config with React hooks plugin
- **PostCSS** - CSS processing
- **Terser** - Production minification

## Build Configuration
- **Target**: ES2022+ for modern browsers
- **Code Splitting**: Manual chunks for vendors, components, pages
- **Compression**: Gzip and Brotli for production
- **Path Aliases**: `@/`, `@components/`, `@pages/`, etc.

## Common Commands

### Development
```bash
pnpm dev          # Start development server (port 5173)
pnpm preview      # Preview production build (port 4173)
```

### Building
```bash
pnpm build        # Full production build + static blog generation
pnpm build:analyze # Build with bundle analysis
```

### Code Quality
```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues automatically
pnpm typecheck    # TypeScript type checking
pnpm test:build   # Full validation (typecheck + lint + build)
```

## Deployment
- **Platform**: Vercel with automatic deployments
- **Static Generation**: Blog posts pre-rendered for AI crawlers
- **Security Headers**: X-Frame-Options, CSP configured
- **Asset Optimization**: Intelligent caching and compression