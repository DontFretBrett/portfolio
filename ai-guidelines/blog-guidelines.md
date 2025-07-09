# Blog Guidelines for Brett Sanders Portfolio

This document provides comprehensive guidelines for creating new blog posts that maintain consistency, ensure optimal crawlability, and follow established patterns across the portfolio.

## 📋 Table of Contents

1. [File Structure & Naming](#file-structure--naming)
2. [Frontmatter Requirements](#frontmatter-requirements)
3. [Content Guidelines](#content-guidelines)
4. [SEO & Crawlability](#seo--crawlability)
5. [Technical Implementation](#technical-implementation)
6. [Quality Checklist](#quality-checklist)
7. [Build Process](#build-process)
8. [Troubleshooting](#troubleshooting)

---

## 📁 File Structure & Naming

### File Location
- All blog posts MUST be placed in: `/src/content/`
- Extension: `.md` (Markdown format)

### File Naming Convention
- **Format**: `kebab-case.md` (lowercase with hyphens)
- **Pattern**: `{descriptive-title}.md`
- **Examples**:
  - ✅ `implementing-react-19-best-practices-portfolio.md`
  - ✅ `ai-image-validator-autogen-blog-post.md`
  - ❌ `My New Blog Post.md`
  - ❌ `blogPost2025.md`

### Slug Generation
- Slug is automatically generated from filename (removes `.md` extension)
- Filename becomes the URL: `/blog/{filename-without-md}`
- Choose filenames carefully as they become permanent URLs

---

## 🏷️ Frontmatter Requirements

### Required Fields
All blog posts MUST include these fields:

```yaml
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
---
```

### Highly Recommended Fields
Include these for optimal SEO and user experience:

```yaml
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief 1-2 sentence summary for social media and blog listings"
description: "SEO-optimized description (200-300 characters) for meta tags"
keywords: "comma, separated, keywords, for, SEO, Brett Sanders"
tags: ["tag1", "tag2", "tag3"]
---
```

### Field Specifications

#### `title`
- **Type**: String (quoted)
- **Format**: Descriptive and SEO-friendly
- **Length**: 50-70 characters ideal for SEO
- **Pattern**: "Action/Topic: Description/Context"
- **Examples**:
  - "Implementing React 19 Best Practices in My Portfolio"
  - "Building an AI Image Validator with AutoGen Multi-Agent System"

#### `date`
- **Type**: String (quoted)
- **Format**: `"YYYY-MM-DD"` (ISO 8601)
- **Example**: `"2025-07-09"`
- **Note**: Used for sorting and display

#### `excerpt`
- **Type**: String (quoted)
- **Length**: 100-200 characters
- **Purpose**: Social media previews, blog listings
- **Style**: Engaging, action-oriented
- **Example**: `"Learn how I upgraded my portfolio to React 19 and implemented modern best practices including concurrent rendering and performance optimizations."`

#### `description`
- **Type**: String (quoted)
- **Length**: 200-300 characters
- **Purpose**: SEO meta description
- **Include**: Keywords, "Brett Sanders" for branding
- **Example**: `"Learn how to build a comprehensive AI image validation system using AutoGen multi-agent framework, combining computer vision and content moderation by Brett Sanders."`

#### `keywords`
- **Type**: String (comma-separated)
- **Format**: `"keyword1, keyword2, keyword3, Brett Sanders"`
- **Include**: Technical keywords, author name
- **Example**: `"React 19, TypeScript, Performance, Best Practices, Brett Sanders"`

#### `tags`
- **Type**: Array of strings
- **Format**: `["tag1", "tag2", "tag3"]`
- **Count**: 4-12 tags recommended
- **Categories**:
  - **Technical**: "React", "TypeScript", "Python", "AI"
  - **Conceptual**: "Best Practices", "Performance", "UI/UX"
  - **Tools**: "AutoGen", "Tailwind CSS", "Vite"
- **Examples**: `["React 19", "TypeScript", "Performance", "Best Practices", "Web Development"]`

---

## 📝 Content Guidelines

### Content Structure
1. **Introduction**: Brief overview of what the post covers
2. **Main Content**: Detailed explanation with examples
3. **Code Examples**: Well-formatted code blocks with syntax highlighting
4. **Conclusion**: Summary and key takeaways

### Writing Style
- **Tone**: Professional but approachable
- **Perspective**: First person when sharing personal experience
- **Length**: 1,500-3,000 words for comprehensive coverage
- **Headings**: Use proper markdown hierarchy (##, ###, ####)

### Code Examples
- Use proper syntax highlighting: `javascript`, `typescript`, `python`, etc.
- Include comments for complex code
- Show before/after examples when relevant
- Test all code examples before publishing

### Images and Media
- Store images in `/public/` directory
- Use descriptive filenames
- Include alt text for accessibility
- Optimize images for web (WebP format preferred)

---

## 🔍 SEO & Crawlability

### Static HTML Generation
- All blog posts automatically generate static HTML for crawlers
- Located in `/dist/blog/{slug}/index.html` after build
- Contains full metadata and structured data

### Meta Tags
The system automatically generates:
- Open Graph tags for social sharing
- Twitter Card metadata
- Canonical URLs
- Author information

### Structured Data
Automatic JSON-LD structured data includes:
- BlogPosting schema
- Author information
- Publication dates
- Keywords and tags
- Reading time

### Crawlability Features
- ✅ Static HTML versions for AI crawlers
- ✅ Proper robots.txt permissions
- ✅ XML sitemap inclusion
- ✅ Clean URL structure
- ✅ Mobile-friendly responsive design

---

## 🛠️ Technical Implementation

### File Processing
1. **Markdown Parsing**: Frontmatter extracted and processed
2. **Content Processing**: Markdown converted to HTML
3. **Reading Time**: Automatically calculated (200 words/minute)
4. **Slug Generation**: Based on filename
5. **Static Generation**: HTML versions created for crawlers
6. **Error Handling**: Robust loading with Promise.allSettled to prevent partial failures

### TypeScript Types
Blog posts conform to the `BlogPost` interface:

```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: number;
  tags?: string[];
  description?: string;
  keywords?: string;
}
```

### Automatic Processing
- Reading time calculation
- Content caching for performance
- Lazy loading of markdown files with robust error handling
- Promise.allSettled-based loading prevents partial failures
- Improved error resilience for individual post loading issues

---

## ✅ Quality Checklist

### Before Publishing
- [ ] Frontmatter includes all required fields
- [ ] Title is SEO-optimized (50-70 characters)
- [ ] Date is current and properly formatted
- [ ] Excerpt is engaging and concise
- [ ] Description includes keywords and author name
- [ ] Tags are relevant and follow naming conventions
- [ ] Content is well-structured with proper headings
- [ ] Code examples are tested and properly formatted
- [ ] Images have alt text and are optimized
- [ ] Links work correctly
- [ ] Spelling and grammar checked

### After Publishing
- [ ] Static HTML generated correctly
- [ ] Post appears in blog index
- [ ] SEO meta tags present
- [ ] Social sharing works
- [ ] Mobile responsive
- [ ] Crawlable by search engines

---

## 🔧 Build Process

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
```
This automatically:
1. Compiles TypeScript
2. Builds Vite project
3. Generates static HTML for all blog posts
4. Updates sitemap
5. Optimizes assets

### Static Blog Generation
The build process creates static HTML versions in `/dist/blog/`:
- `/dist/blog/index.html` - Blog index page
- `/dist/blog/{slug}/index.html` - Individual post pages

These static files ensure AI crawlers can access your content.

---

## 🔧 Troubleshooting

### Common Issues

#### Missing Frontmatter Fields
**Error**: Blog post not displaying correctly
**Solution**: Ensure all required fields are present and properly formatted

#### Incorrect Date Format
**Error**: Posts not sorting correctly
**Solution**: Use `"YYYY-MM-DD"` format in quotes

#### Malformed Tags Array
**Error**: Tags not displaying
**Solution**: Use proper array syntax: `["tag1", "tag2"]`

#### File Not Found
**Error**: Blog post not loading
**Solution**: Verify file is in `/src/content/` with `.md` extension

#### Blog Loading Issues
**Error**: Only some posts load on first visit, rest appear after refresh
**Solution**: System now uses Promise.allSettled for robust loading - if this occurs, check console for individual post errors

### Static Generation Issues
If static HTML isn't generating:
1. Check console for build errors
2. Verify all frontmatter is valid
3. Ensure no syntax errors in markdown
4. Run `pnpm build` to see specific errors
5. Check for individual post loading failures (system handles partial failures gracefully)

### SEO Issues
If SEO meta tags are missing:
1. Check frontmatter completeness
2. Verify description and keywords fields
3. Ensure proper quote formatting
4. Check generated HTML in `/dist/blog/`

---

## 📊 Example Blog Post Template

```markdown
---
title: "Building Amazing Web Applications with Next.js 14: A Complete Guide"
date: "2025-07-09"
excerpt: "Learn how to build modern web applications with Next.js 14, covering app router, server components, and performance optimizations."
description: "Master Next.js 14 with this comprehensive guide covering app router, server components, and performance optimizations by Brett Sanders."
keywords: "Next.js 14, React, Server Components, App Router, Performance, Brett Sanders"
tags: ["Next.js", "React", "Performance", "Web Development", "Server Components"]
---

# Building Amazing Web Applications with Next.js 14: A Complete Guide

## Introduction

In this comprehensive guide, we'll explore how to build modern web applications using Next.js 14...

## Setting Up Your Development Environment

### Prerequisites
- Node.js 18 or later
- npm or yarn package manager

### Installation
```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

## Key Features of Next.js 14

### App Router
The new app router provides...

### Server Components
Server components allow...

## Conclusion

Next.js 14 represents a significant step forward in React development...
```

---

## 🔄 Recent Improvements

### Blog Loading Reliability (July 2025)
- **Issue Fixed**: Blog posts would sometimes only partially load on first visit
- **Root Cause**: Circular dependency between blogPosts.ts and blog.ts caused race conditions
- **Solution**: Refactored imports and implemented Promise.allSettled for robust loading
- **Result**: All blog posts now load consistently on first visit

### Error Handling Enhancements
- **Improvement**: Individual post loading failures no longer affect other posts
- **Implementation**: Promise.allSettled ensures graceful degradation
- **Benefit**: More resilient blog loading experience

### Technical Debt Cleanup
- **Removed**: Unused puppeteer dependency and prerender scripts
- **Cleaned**: Circular dependencies in the codebase
- **Improved**: Build process reliability and performance

---

## 🔄 Maintenance Notes

### Regular Updates
- Review and update older posts for accuracy
- Update dependencies and code examples
- Refresh screenshots and images
- Update author information if needed

### Performance Monitoring
- Monitor static generation performance
- Check crawlability with tools like Google Search Console
- Analyze reading time accuracy
- Review SEO performance
- Monitor blog loading consistency (should load all posts on first visit)

### Content Audit
- Quarterly review of all blog posts
- Update outdated technical information
- Ensure consistency across all posts
- Verify all links still work

---

## 📞 Support

For questions or issues with blog implementation:
1. Check this guidelines document
2. Review existing blog posts for examples
3. Test locally with `pnpm dev`
4. Verify build process with `pnpm build`

Remember: Consistency is key for both user experience and SEO performance. Follow these guidelines to ensure your blog posts integrate seamlessly with the portfolio.