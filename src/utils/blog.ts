import { BlogPost, BlogMetadata } from '../types/blog';

// Function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Simple frontmatter parser that works in the browser
function parseFrontmatter(markdownContent: string): { data: any; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = markdownContent.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: markdownContent };
  }
  
  const [, frontmatterStr, content] = match;
  const data: any = {};
  
  // Parse YAML-like frontmatter
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
  
  return { data, content };
}

// Function to process markdown content
export function processMarkdown(markdownContent: string, filename: string): BlogPost {
  const { data, content } = parseFrontmatter(markdownContent);
  const metadata = data as BlogMetadata;
  
  const title = metadata.title || filename.replace(/\.md$/, '');
  const slug = generateSlug(title);
  const readingTime = calculateReadingTime(content);
  const excerpt = metadata.excerpt || content.substring(0, 200) + '...';
  
  return {
    slug,
    title,
    excerpt,
    content,
    date: metadata.date || new Date().toISOString(),
    readingTime,
    tags: metadata.tags || [],
    description: metadata.description,
    keywords: metadata.keywords
  };
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