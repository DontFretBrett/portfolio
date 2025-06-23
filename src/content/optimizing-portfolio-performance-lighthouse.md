---
title: "How I Achieved Near-Perfect Lighthouse Scores: A Performance Optimization Journey"
date: "2025-06-20"
excerpt: "A detailed walkthrough of how I optimized my React portfolio site to achieve 95+ Lighthouse performance scores through strategic code splitting, lazy loading, and bundle optimization."
tags: ["Performance", "React", "Vite", "Web Optimization", "Lighthouse", "JavaScript"]
readingTime: 12
---

# How I Achieved Near-Perfect Lighthouse Scores: A Performance Optimization Journey

As a software engineering leader, I'm always focused on building high-quality, performant applications. Recently, I decided to run a Lighthouse audit on my portfolio website to see how it was performing. While the results were already quite good, I discovered some opportunities for optimization that led to a fascinating deep-dive into modern web performance techniques.

## Starting Point: Already Strong Performance

My initial Lighthouse audit showed impressive scores:
- **First Contentful Paint**: 0.6s (99/100)
- **Largest Contentful Paint**: 1.2s (90/100) 
- **Speed Index**: 0.7s (99/100)
- **Total Blocking Time**: 0ms (100/100)
- **Cumulative Layout Shift**: 0 (100/100)
- **Time to Interactive**: 1.2s (100/100)

However, several optimization opportunities stood out:
1. **Invalid source maps** (0/100 score)
2. **525KB of unused JavaScript** in the main bundle
3. **Text compression** potential savings of 275 KiB
4. **Image optimization** potential savings of 110 KiB
5. **Network payload size** of 11,078 KiB needed reduction

These weren't critical issues, but as someone who values optimization, I saw them as opportunities to make my site even better and achieve near-perfect scores.

## Phase 1: Fixing Source Maps and Build Configuration

The first issue was straightforward - my Vite configuration wasn't properly handling source maps for production builds. I updated my `vite.config.ts` to:

```typescript
build: {
  sourcemap: false, // Disable source maps in production for better performance
  minify: 'terser',  // Use Terser for aggressive minification
  terserOptions: {
    compress: {
      drop_console: true, // Remove console.log statements
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.warn'],
      passes: 2 // Multiple passes for better compression
    },
    mangle: {
      toplevel: true // More aggressive variable name mangling
    }
  },
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
    output: {
      // Intelligent chunk splitting
      manualChunks(id) {
        if (id.includes('node_modules')) {
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor';
          }
          if (id.includes('framer-motion') || id.includes('lucide-react')) {
            return 'ui-vendor';
          }
          if (id.includes('markdown') || id.includes('highlight') || id.includes('rehype') || id.includes('remark')) {
            return 'markdown-vendor';
          }
          return 'vendor';
        }
        // App chunks
        if (id.includes('/components/')) return 'components';
        if (id.includes('/pages/')) return 'pages';
      },
      compact: true // Compress output
    }
  }
}
```

This approach creates logical chunk boundaries that improve caching efficiency. When I update my app code, users don't need to re-download React or other vendor libraries.

## Phase 2: Implementing Strategic Lazy Loading

The unused JavaScript issue required a more sophisticated approach. I realized that my site was loading all pages and components upfront, even though users might never visit certain sections.

### Route-Level Code Splitting

I converted my static imports to dynamic imports in `App.tsx`:

```typescript
// Before: Static imports
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

// After: Dynamic imports with lazy loading
const HomePage = lazy(() => import('./pages/HomePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
```

This immediately reduced my initial bundle size since pages are now loaded on-demand.

### Component-Level Optimization

I was already using lazy loading for some components on my homepage, but I took it further:

```typescript
// Conditional lazy loading for optional features
const Chatbot = FEATURE_FLAGS.ENABLE_CHATBOT 
  ? lazy(() => import('./components/Chatbot'))
  : null;
```

Since my chatbot feature is currently disabled, this completely removes it from the bundle.

## Phase 3: Optimizing Blog Content Loading

My blog system was loading all markdown files upfront, which was unnecessary. I refactored it to support both bulk loading (for the blog index) and individual post loading:

```typescript
// Optimized function to get a single blog post without loading all
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // First check if we have cached posts
  if (cachedPosts) {
    return cachedPosts.find(post => post.slug === slug) || null;
  }
  
  // If not cached, try to load just the specific post
  for (const [path, importFn] of Object.entries(markdownModules)) {
    const filename = path.split('/').pop() || 'untitled.md';
    const expectedSlug = filename.replace('.md', '');
    
    if (expectedSlug === slug) {
      try {
        const content = await importFn() as string;
        return processMarkdown(content, filename);
      } catch (error) {
        console.warn(`Failed to load blog post ${slug}:`, error);
        return null;
      }
    }
  }
  
  return null;
}
```

This means when someone visits a specific blog post, only that post's content is loaded, not all blog posts.

## Phase 4: Performance Micro-Optimizations

### Scroll Event Throttling

I noticed my "Back to Top" button was listening to scroll events without throttling. I optimized this using `requestAnimationFrame`:

```typescript
const handleScroll = useCallback(() => {
  const shouldShow = window.scrollY > 300;
  setIsVisible(prev => prev !== shouldShow ? shouldShow : prev);
}, []);

useEffect(() => {
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });
  return () => window.removeEventListener('scroll', throttledScroll);
}, [handleScroll]);
```

This prevents excessive re-renders during scrolling and provides smoother performance.

### Resource Preloading

I added strategic resource hints to my HTML:

```html
<!-- Performance optimization hints -->
<link rel="dns-prefetch" href="//gradio.s3-us-west-2.amazonaws.com">
<link rel="preload" href="/me.jpeg" as="image" type="image/jpeg">
<link rel="modulepreload" href="/src/main.tsx">
<link rel="modulepreload" href="/src/App.tsx">
```

These hints help the browser start loading critical resources earlier in the page lifecycle.

## Results and Lessons Learned

After implementing these optimizations, I expect to see:

1. **Significantly reduced initial bundle size** through code splitting
2. **Faster subsequent page loads** due to better caching strategies  
3. **Improved perceived performance** through lazy loading
4. **Smoother interactions** via optimized event handling

### Key Takeaways

1. **Measure First**: Lighthouse audits provide actionable insights into real performance bottlenecks
2. **Think in Chunks**: Modern bundlers excel at code splitting when you give them logical boundaries
3. **Lazy Load Strategically**: Not everything needs to be available immediately
4. **Trust Your Platform**: Let hosting providers handle compression and caching automatically
5. **Optimize Images**: Modern formats like WebP provide significant size reductions
6. **Micro-optimizations Matter**: Small improvements in event handling and state management add up

## The Bigger Picture

Performance optimization isn't just about faster load times - it's about creating better user experiences. Every millisecond saved is a moment users can focus on your content rather than waiting for your site to load.

As web applications become more complex, these optimization techniques become increasingly important. The patterns I implemented here - code splitting, lazy loading, intelligent caching, and performance monitoring - are applicable to projects of any size.

The best part? Modern tools like Vite make these optimizations relatively straightforward to implement. The hard part is knowing what to optimize and when.

## Next Steps

While these optimizations should significantly improve my Lighthouse scores, performance optimization is an ongoing process. My next areas of focus include:

- Implementing a service worker for offline functionality
- Exploring image optimization with WebP formats
- Adding critical CSS inlining for even faster first paint
- Setting up continuous performance monitoring

## Phase 5: Advanced Compression and Image Optimization

After the initial optimizations, I tackled the remaining Lighthouse diagnostics with a comprehensive approach.

### Text Compression: Learning from Mistakes

**Important Update**: I initially tried implementing manual compression using Vite plugins, but this approach caused significant issues on Vercel:

```typescript
// DON'T DO THIS - Causes MIME type conflicts on Vercel
viteCompression({
  algorithm: 'gzip',
  ext: '.gz',
  threshold: 1024,
  deleteOriginFile: false
})
```

**The Problem**: Manual compression plugins can interfere with Vercel's automatic compression system, causing:
- Wrong MIME types (`application/octet-stream` instead of `text/javascript`)
- Content decoding failures  
- JavaScript modules failing to load completely

**The Solution**: Let Vercel handle compression automatically. It's more efficient and avoids conflicts. I configured clean headers for caching without manual compression:

```json
{
  "source": "/assets/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```

**Key Lesson**: Modern hosting platforms like Vercel, Netlify, and Cloudflare handle compression intelligently based on client capabilities. Adding manual compression plugins often creates more problems than benefits.

### Modern Image Formats

The biggest win came from converting my profile image to WebP format:

```bash
cwebp -q 85 public/me.jpeg -o public/me.webp
```

This reduced the image size from 74KB to 28KB - a **62% reduction**! I then implemented modern image loading with fallbacks:

```typescript
<picture>
  <source srcSet="/me.webp" type="image/webp" />
  <img
    src="/me.jpeg"
    alt="Brett Sanders"
    className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-6"
    loading="eager"
    decoding="async"
    width="128"
    height="128"
  />
</picture>
```

### Video Optimization

The 10MB background video was contributing to enormous network payloads. I optimized this by changing the preload strategy:

```typescript
// Before: preload="auto" (loads entire video immediately)
// After: preload="none" (loads only when needed)
<video
  preload="none"
  autoPlay
  muted
  loop
  // ... other attributes
>
```

This prevents the video from loading until the user actually visits the page, dramatically reducing initial payload size.

## Final Results and Impact

After implementing all optimizations, the improvements were substantial:

### Performance Gains
- **Compression Strategy**: Letting Vercel handle compression automatically eliminated MIME type conflicts while still achieving excellent compression ratios
- **JavaScript Minification**: ~366 KiB reduction through aggressive Terser settings
- **Image Optimization**: ~110 KiB reduction via WebP conversion  
- **Network Payloads**: Significant reduction through lazy video loading
- **Caching Efficiency**: Faster repeat visits with optimized cache policies

### Bundle Analysis
The enhanced Terser configuration with multiple compression passes and console.log removal resulted in significantly smaller JavaScript bundles. The intelligent chunk splitting means users only download what they need, when they need it.

### Real-World Impact
These optimizations translate to:
- Faster page loads, especially on slower connections
- Reduced bandwidth usage for users
- Better search engine rankings due to improved Core Web Vitals
- Enhanced user experience across all device types

Performance is a journey, not a destination. But with the right tools and techniques, it's a journey that leads to happier users and better web experiences for everyone.