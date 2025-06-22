import type { BlogPost } from '../types/blog';
import { processMarkdown } from '../utils/blog';

// Dynamically import all markdown files from the content directory
const markdownModules = import.meta.glob('../content/*.md', { 
  query: '?raw', 
  import: 'default' 
});

// Process all markdown files into blog posts
async function loadBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  for (const [path, importFn] of Object.entries(markdownModules)) {
    try {
      const content = await importFn() as string;
      const filename = path.split('/').pop() || 'untitled.md';
      const post = processMarkdown(content, filename);
      posts.push(post);
    } catch (error) {
      console.warn(`Failed to load blog post from ${path}:`, error);
    }
  }
  
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

// Export function to get a specific blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug);
}

// For backwards compatibility, export a promise that resolves to the posts
export const blogPosts = getAllBlogPosts(); 