---
title: "Building Here's Your Link: A Modern Link Sharing Service with TanStack Start"
date: "2025-12-15"
tags: ["TanStack Start", "React", "TypeScript", "SSR", "Neon Postgres", "Drizzle ORM", "Vercel KV", "Redis", "QR Codes", "Edge Computing", "Tailwind CSS", "Serverless", "Full Stack Development"]
excerpt: "A deep dive into building a fast, anonymous link and text sharing service using TanStack Start, Neon Postgres, and Vercel KV. Learn about modern SSR patterns, edge caching strategies, and production-ready architecture."
description: "Brett Sanders explores building Here's Your Link, a production-ready link sharing service using TanStack Start, Neon Postgres, Drizzle ORM, and Vercel KV. Covers architecture, caching strategies, rate limiting, and modern web development patterns."
keywords: "TanStack Start, React SSR, Neon Postgres, Drizzle ORM, Vercel KV, Redis, Serverless Architecture, Edge Computing, QR Codes, TypeScript, Tailwind CSS, Link Shortening, Brett Sanders"
---

# Building Here's Your Link: A Modern Link Sharing Service with TanStack Start

## Introduction

Here's Your Link is a fast, anonymous link and text sharing service that enables instant device-to-device handoffs. Users can create short links for text or URLs, get a QR code, and set expiration times—all without authentication. This post covers the tech stack, architecture, and design decisions that make it production-ready.

> 🔗 **Try it yourself!** Visit [Here's Your Link](https://www.heresyourlink.com) to create your own short links and QR codes instantly.

## The Tech Stack

### Frontend Framework: TanStack Start

Built with **TanStack Start** (React + TypeScript + SSR), which provides:

- **File-based routing** with type-safe route params
- **Server-side rendering** for fast initial loads
- **Server functions** for type-safe API calls
- **Built-in data loading** with route loaders

TanStack Start combines the best of React Server Components with a more flexible, file-based routing system that feels natural for full-stack applications.

### Styling: Tailwind CSS

**Tailwind CSS** with custom design tokens for:

- **Glassmorphism effects** for a modern, polished look
- **Responsive layouts** that work on all devices
- **Accessible focus states** for keyboard navigation
- **Custom animations** for smooth user interactions

### Database: Neon Postgres + Drizzle ORM

- **Neon Postgres**: Serverless Postgres that auto-scales and suspends when idle
- **Drizzle ORM**: Type-safe queries with excellent TypeScript support
- **Schema design**:
  - `id`, `slug`, `namespace` (for future multi-tenancy)
  - `type` ('text' or 'url')
  - `rawText` or `targetUrl` based on type
  - `viewsCount`, `lastViewAt` for analytics
  - `expiresAt` for auto-expiry
  - `createdAt`, `updatedAt` timestamps

### Caching: Vercel KV / Redis

Dual-mode caching strategy:

- **Production**: Vercel KV (REST API) for edge caching
- **Local**: Redis via Docker for development

An abstraction layer switches between them based on environment variables, ensuring consistent behavior across environments.

### Hosting: Vercel

- **Edge network** for global distribution
- **Serverless functions** for API routes
- **Automatic scaling** based on demand
- **Built-in analytics** and monitoring

## Architecture Overview

### Request Flow

#### Creating a Share

1. User submits form → React Query mutation
2. POST to `/api/shares` → TanStack Start server function or Vercel function
3. **Rate limiting check** (10 requests/minute per IP)
4. **Input validation** (text: 64KB limit, URL: scheme validation)
5. **Generate unique slug** (6-character base62, ~56 billion combinations)
6. Insert into Postgres
7. **Cache in KV** (24-hour TTL, or match expiry if shorter)
8. Return short URL + slug

#### Viewing a Share

1. User visits `/s/[slug]`
2. Route loader fetches share data
3. **Check KV cache first** (cache-aside pattern)
4. Cache miss → query Postgres
5. **Check expiry** (410 if expired)
6. **Increment view count** (async for cached shares)
7. Render:
   - **URL shares**: redirect to target
   - **Text shares**: display sanitized content

### Key Design Decisions

#### 1. Dual API Architecture

Two API implementations for flexibility:

- **TanStack Start server functions** (`app/api/shares.ts`) for SSR
- **Vercel serverless functions** (`api/shares/[slug].ts`) for edge deployment

Both share the same business logic, ensuring consistency across deployment strategies.

#### 2. Smart Caching Strategy

- **Cache TTL**: 24 hours, or match expiry if shorter
- **Cache-aside pattern**: check cache, fallback to DB, update cache
- **View count updates**: async for cached shares to avoid blocking

This approach reduces database load while maintaining data consistency.

#### 3. Unique Slug Generation

```typescript
const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  6
)
```

- **6-character base62 slugs** for compact URLs
- **Collision detection** with retries
- **Namespace support** for future multi-tenancy

With 6 characters and base62 encoding, we have approximately 56 billion possible combinations, making collisions extremely unlikely.

#### 4. Rate Limiting

- **POST (create)**: 10 requests/minute per IP
- **GET (view)**: 60 requests/minute per IP
- Implemented in KV/Redis with sliding window
- **Fail-open** if KV is unavailable (graceful degradation)

Rate limiting prevents abuse while maintaining a good user experience for legitimate users.

#### 5. Security Measures

- **Input validation**: text size limits, URL scheme validation
- **HTML escaping** for text content
- **CORS protection** with origin validation
- **Optional API key authentication** for programmatic access
- **Content Security Policy headers**
- **XSS protection headers**
- **Request size limits** to prevent DoS attacks

## Performance Optimizations

### 1. Edge Caching

Most share views are served from KV, reducing database load by up to 95% for popular shares.

### 2. Async View Count Updates

For cached shares, view count updates are async to avoid blocking responses. This ensures fast redirects even when updating analytics.

### 3. SSR with TanStack Start

Server-side rendering improves initial load times and SEO, while maintaining the benefits of client-side interactivity.

### 4. Optimistic UI Updates

React Query provides optimistic updates for a responsive feel, even when network requests are in flight.

### 5. Code Splitting

Vite handles automatic code splitting for optimal bundle sizes, ensuring users only download what they need.

## User Experience Features

### 1. Dual Delivery

Every share includes:
- **Short URL** (e.g., [heresyourlink.com/s/abc123](https://www.heresyourlink.com/s/abc123))
- **High-contrast QR code** for easy mobile scanning

This dual approach ensures users can share links in any context—via messaging apps, email, or in-person with QR codes.

### 2. Smart Expiry

Options: 1 day, 7 days, 30 days, or never. Expired shares return **410 Gone** with a user-friendly message.

### 3. Text Viewer

- **Sanitized rendering** for security
- **Copy-to-clipboard** functionality
- **Character count** with progress bar
- **64KB limit** to prevent abuse

### 4. Modern UI

- **Glassmorphism effects** for visual appeal
- **Responsive design** that works on all devices
- **Accessible focus states** for keyboard users
- **Smooth animations** for polished interactions

## Development Experience

### Local Development

Docker Compose setup provides:
- **Postgres container** for database
- **Redis container** for caching
- **Hot reload** with Vite for instant feedback
- **Express dev server** for API debugging

This setup mirrors production while keeping development fast and efficient.

### Type Safety

- **TypeScript throughout** for compile-time safety
- **Drizzle ORM** for type-safe queries
- **TanStack Router** for type-safe routes
- **End-to-end type safety** from DB to UI

Type safety catches errors early and provides excellent IDE support.

### Database Migrations

Drizzle Kit provides:
- **Schema generation** from TypeScript definitions
- **Migration management** with version control
- **Studio** for visual DB exploration

Migrations are versioned and can be applied automatically in CI/CD pipelines.

## Monitoring & Operations

### Cost Monitoring

Designed to run on free tiers:
- **Vercel**: 100GB bandwidth/month
- **Neon**: 0.5GB storage, auto-suspend when idle
- **Vercel KV**: 256MB storage, 10K commands/day

Includes automated monitoring scripts to track usage and prevent unexpected costs.

### Error Handling

- **Graceful error boundaries** in React components
- **User-friendly error messages** for common failures
- **Detailed logging** for debugging
- **Rate limit headers** in responses for API clients

## Future Enhancements

The architecture supports:
- **Multi-tenancy** via namespaces
- **Custom domains** for branded short links
- **Analytics dashboard** for share creators
- **API** for programmatic access
- **Bulk operations** for power users

The foundation is built to scale as needs grow.

## Conclusion

Here's Your Link demonstrates a modern web application using:

- **TanStack Start** for SSR and type safety
- **Neon Postgres** for serverless database
- **Vercel KV** for edge caching
- **Smart caching** and rate limiting strategies
- **Security best practices** throughout
- **Modern UI/UX** with glassmorphism and responsive design

The codebase is structured for maintainability and scalability, with clear separation of concerns and type safety throughout.

Whether you're building a similar service or learning modern web development patterns, this project shows how to combine these technologies into a production-ready application.

> 🚀 **Ready to try it?** Visit [Here's Your Link](https://www.heresyourlink.com) to start creating short links and QR codes instantly.

---

**Tech Stack Summary:**
- Framework: TanStack Start (React + TypeScript + SSR)
- Database: Neon Postgres with Drizzle ORM
- Cache: Vercel KV / Redis
- Hosting: Vercel
- Styling: Tailwind CSS
- QR Codes: qrcode.react

**Key Metrics:**
- 6-character slugs (~56 billion combinations)
- 64KB text limit per share
- 24-hour cache TTL (or match expiry)
- 10 requests/minute rate limit (POST)
- Global edge distribution via Vercel

The project is available for exploration. Visit [Here's Your Link](https://www.heresyourlink.com) to see how these technologies work together in practice.
