import { BlogPost, BlogMetadata } from '../types/blog';
import { getAllBlogPosts as getAllBlogPostsInternal, getBlogPost as getBlogPostInternal } from '../data/blogPosts';

// Function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Function to strip markdown formatting for clean excerpts
function stripMarkdown(text: string): string {
  return text
    // Remove headers (# ## ###)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold and italic (**text** *text*)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove inline code `code`
    .replace(/`([^`]+)`/g, '$1')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Simple frontmatter parser that works in the browser
function parseFrontmatter(markdownContent: string): { data: Record<string, string | string[]>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = markdownContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: markdownContent };
  }
  
  const [, frontmatterStr, content] = match;
  const data: Record<string, string | string[]> = {};
  
  // Parse YAML-like frontmatter
  if (frontmatterStr) {
    const lines = frontmatterStr.split('\n');
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        
        // Handle different value types
        if (value.startsWith('[') && value.endsWith(']')) {
          // Array handling
          data[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
        } else if (value.startsWith('"') && value.endsWith('"')) {
          // String handling
          data[key] = value.slice(1, -1);
        } else {
          // Plain value
          data[key] = value.replace(/"/g, '');
        }
      }
    }
  }
  
  return { data, content };
}

// Function to process markdown content
export function processMarkdown(markdownContent: string, filename: string): BlogPost {
  const { data, content } = parseFrontmatter(markdownContent);
  const metadata = data as unknown as BlogMetadata;
  
  const title = (typeof metadata.title === 'string' ? metadata.title : filename.replace(/\.md$/, ''));
  // Use filename-based slug for consistency with file system
  const slug = filename.replace(/\.md$/, '');
  const readingTime = calculateReadingTime(content);
  const excerpt = (typeof metadata.excerpt === 'string' ? metadata.excerpt : stripMarkdown(content.substring(0, 200)) + '...');
  
  const blogPost: BlogPost = {
    slug,
    title,
    excerpt,
    content,
    date: (typeof metadata.date === 'string' ? metadata.date : new Date().toISOString()),
    readingTime,
    tags: (Array.isArray(metadata.tags) ? metadata.tags : []),
  };
  
  // Only add optional properties if they exist
  if (typeof metadata.description === 'string') {
    blogPost.description = metadata.description;
  }
  if (Array.isArray(metadata.keywords)) {
    blogPost.keywords = metadata.keywords;
  }
  
  return blogPost;
}

// Function to format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await getBlogPostInternal(slug);
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getAllBlogPostsInternal();
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// React 19 use() hook compatible promise creators
export function createBlogPostPromise(slug: string): Promise<BlogPost | null> {
  return getBlogPost(slug);
}

export function createBlogPostsPromise(): Promise<BlogPost[]> {
  return getAllBlogPosts();
} 