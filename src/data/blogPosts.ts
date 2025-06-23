import type { BlogPost } from '../types/blog';
import { processMarkdown } from '../utils/blog';

// Lazy import markdown files only when needed
const markdownModules = import.meta.glob('../content/*.md', { 
  query: '?raw', 
  import: 'default',
  eager: false // Don't load all files immediately
});

// Process all markdown files into blog posts
async function loadBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  // Load files in parallel for better performance
  const loadPromises = Object.entries(markdownModules).map(async ([path, importFn]) => {
    try {
      const content = await importFn() as string;
      const filename = path.split('/').pop() || 'untitled.md';
      return processMarkdown(content, filename);
    } catch (error) {
      console.warn(`Failed to load blog post from ${path}:`, error);
      return null;
    }
  });
  
  const results = await Promise.all(loadPromises);
  posts.push(...results.filter(Boolean) as BlogPost[]);
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Cache for loaded posts
let cachedPosts: BlogPost[] | null = null;

// Export function to get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!cachedPosts) {
    cachedPosts = await loadBlogPosts();
  }
  return cachedPosts;
}

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

// For backwards compatibility, export a promise that resolves to the posts
export const blogPosts = getAllBlogPosts(); 