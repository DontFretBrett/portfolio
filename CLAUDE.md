# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server (port 5173)
- `pnpm build` - Build for production (TypeScript + Vite)
- `pnpm preview` - Preview production build (port 4173)
- `pnpm lint` - Run ESLint with TypeScript support
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test:build` - Full build validation (typecheck + lint + build)

### Build Analysis
- `pnpm build:analyze` - Build with bundle analysis

## Architecture Overview

### Core Technologies
- **React 19.2** with TypeScript and concurrent rendering
- **Vite** as build tool with advanced optimization
- **Tailwind CSS** for styling with dark mode support
- **React Router DOM** for client-side routing
- **pnpm** as package manager

### Application Structure

#### Route-Based Architecture
- **Lazy Loading**: All pages are lazy-loaded with React.lazy()
- **Conditional Headers**: Home page uses Header, others use CompactHeader
- **Suspense Boundaries**: PageLoader component for loading states
- **Feature Flags**: Components conditionally loaded via `src/config/features.ts`

#### Key Architectural Patterns

**Context-Based Theme Management**
- Located in `src/contexts/ThemeContext.tsx`
- Uses branded types for type safety
- Implements localStorage persistence with error handling
- Supports system theme detection via media queries

**Component Organization**
- `src/components/` - Reusable UI components
- `src/pages/` - Route-specific page components
- `src/content/` - Markdown blog posts
- `src/data/` - Static data files (projects, blog metadata)
- `src/utils/` - Utility functions

**Type Safety**
- `src/types/` - Comprehensive TypeScript definitions
- Branded types for enhanced type safety (e.g., Theme type)
- Result types for error handling

### Build Configuration

#### Vite Optimizations
- **Code Splitting**: Strategic manual chunks by feature and vendor
- **Compression**: Gzip and Brotli compression enabled
- **Tree Shaking**: Aggressive unused code elimination
- **Asset Optimization**: Inline threshold of 4KB
- **Target Modern Browsers**: ES2022+ for smaller bundles

#### Path Aliases
- `@` → `./src`
- `@components` → `./src/components`
- `@pages` → `./src/pages`
- `@utils` → `./src/utils`
- `@types` → `./src/types`
- `@data` → `./src/data`

### Content Management

#### Blog System
- Markdown files in `src/content/`
- Metadata in `src/data/blogPosts.ts`
- Dynamic routing via `/blog/:slug`
- Syntax highlighting with highlight.js
- Comments via Giscus integration

#### Project Showcase
- AI projects data in `src/data/aiProjects.ts`
- Supports embedded demos (Hugging Face Spaces)
- Dynamic routing via `/ai-projects/:slug`

### Performance Features

#### Lazy Loading Strategy
- Page-level code splitting
- Conditional component loading (e.g., Chatbot)
- Optimized chunk naming and caching

#### SEO & Meta Management
- React Helmet Async for dynamic meta tags
- Structured data and Open Graph support
- Sitemap and robots.txt configuration

### Development Guidelines

#### React 19 Best Practices
- Uses concurrent rendering by default
- Follows React 19 context patterns (simplified provider syntax)
- Implements proper error boundaries
- Uses React.memo and useMemo for performance optimization

#### TypeScript Patterns
- Branded types for enhanced type safety
- Result types for error handling
- Comprehensive type definitions in dedicated files
- No `any` types - full type coverage

#### Styling Conventions
- Tailwind CSS with custom configuration
- Dark mode support via class-based approach
- Responsive design with mobile-first approach
- Accessibility-first design (WCAG compliance)

### Deployment Configuration

#### Vercel Setup
- SPA routing configuration in `vercel.json`
- Security headers (X-Frame-Options, CSP, etc.)
- Asset caching strategies (1 year for assets, 1 day for sitemaps)
- Content-Type headers for XML/text files
- Automatic deployments from main branch
- AI crawler detection and static blog HTML serving via rewrites

#### Vercel MCP Integration
- **MCP Server**: Configured in Cursor via `~/.cursor/mcp.json` (global config)
- **Endpoint**: `https://mcp.vercel.com`
- **Deployment Workflow**: 
  - **DO NOT** use MCP tools for regular deployments
  - Deployments are **automatic** via Vercel when PRs are merged to main branch
  - Vercel automatically picks up changes from the main branch and deploys
- **Available Tools** (for monitoring/management only):
  - `list_projects` - List all Vercel projects
  - `get_project` - Get specific project details
  - `list_deployments` - View deployment history and status
  - `get_deployment` - Inspect specific deployment by ID/URL
  - `get_deployment_build_logs` - Retrieve build logs for debugging failed builds
  - `get_access_to_vercel_url` - Create shareable links for protected deployments
  - `web_fetch_vercel_url` - Access Vercel Authentication-protected URLs
  - `check_domain_availability_and_price` - Check domain availability
  - `search_vercel_documentation` - Search Vercel docs from within Cursor
  - `use_vercel_cli` - Execute Vercel CLI commands
  - `deploy_to_vercel` - **Emergency use only** - not for regular workflow
- **Usage**: Use MCP tools for checking deployment status, viewing logs, managing projects, or searching docs. Do NOT use for regular deployments.
- **Authorization**: OAuth-based authentication via Cursor's MCP connection

#### Security Measures
- Content Security Policy headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Testing and Quality

#### Code Quality Tools
- ESLint with TypeScript support
- React Hooks and React Refresh plugins
- Automatic unused disable directives reporting
- Zero warning tolerance in production builds

#### Build Validation
- TypeScript compilation check
- ESLint validation
- Production build verification
- Bundle size analysis

### Feature Management

#### Feature Flags
- Centralized in `src/config/features.ts`
- Currently controls chatbot functionality
- Requires redeploy for changes (static flags)

#### Conditional Rendering
- Feature-based component loading
- Lazy loading of optional features
- Graceful degradation for disabled features