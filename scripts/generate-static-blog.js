import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Validates and sanitizes a path segment to prevent directory traversal attacks.
 * @param {string} segment - The path segment to validate (e.g., a slug)
 * @param {string} baseDir - The base directory that the segment should be relative to
 * @returns {string} - The validated absolute path
 * @throws {Error} - If the path is invalid or attempts directory traversal
 */
function validatePathSegment(segment, baseDir) {
  // Reject null, undefined, or empty segments
  if (!segment || typeof segment !== 'string') {
    throw new Error('Invalid path segment: must be a non-empty string');
  }
  
  // Reject absolute paths
  if (path.isAbsolute(segment)) {
    throw new Error('Invalid path segment: absolute paths are not allowed');
  }
  
  // Reject segments containing null bytes
  if (segment.includes('\0')) {
    throw new Error('Invalid path segment: null bytes are not allowed');
  }
  
  // Normalize the segment to remove any '..' or '.' components
  const normalizedSegment = path.normalize(segment);
  
  // Reject if normalized segment contains path separators (e.g., '/', '\')
  // This prevents subdirectory traversal like 'a/b' or '..\\'
  if (normalizedSegment.includes(path.sep)) {
    throw new Error('Invalid path segment: directory separators are not allowed');
  }
  
  // Resolve the full path and ensure it starts with the base directory
  const resolvedPath = path.resolve(baseDir, normalizedSegment);
  const normalizedBase = path.resolve(baseDir);
  
  // Ensure the resolved path is within the base directory and not the base directory itself
  if (!resolvedPath.startsWith(normalizedBase + path.sep)) {
    throw new Error(`Invalid path segment: resolved path "${resolvedPath}" is outside base directory "${normalizedBase}"`);
  }
  
  return resolvedPath;
}

/**
 * Validates a complete file path to ensure it's safe for filesystem operations.
 * @param {string} filePath - The complete file path to validate
 * @param {string} baseDir - The base directory that the path should be within
 * @returns {string} - The validated absolute path
 * @throws {Error} - If the path is invalid or attempts directory traversal
 */
function validateFilePath(filePath, baseDir) {
  const normalizedBase = path.resolve(baseDir);
  const resolvedPath = path.resolve(filePath);
  
  // Ensure the resolved path is within the base directory
  if (!resolvedPath.startsWith(normalizedBase + path.sep)) {
    throw new Error(`Invalid file path: resolved path "${resolvedPath}" is outside base directory "${normalizedBase}"`);
  }
  
  return resolvedPath;
}

// Function to load blog posts dynamically from the content directory
async function loadBlogPosts() {
  const contentDir = path.join(__dirname, '../src/content');
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  
  const blogPosts = [];
  
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter (more flexible: allows optional whitespace, optional trailing newline, and logs skipped files)
    const frontmatterMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\s*\r?\n)?/);
    if (!frontmatterMatch) {
      console.warn(`[generate-static-blog] Skipping file "${file}" - frontmatter not found or malformed.`);
      continue;
    }
    
    const frontmatter = frontmatterMatch[1];
    
    // Parse YAML with js-yaml for robust handling of complex structures
    let data;
    try {
      data = yaml.load(frontmatter) || {};
    } catch (error) {
      console.warn(`[generate-static-blog] Skipping file "${file}" - invalid YAML frontmatter:`, error.message);
      continue;
    }
    
    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    blogPosts.push({
      slug: file.replace('.md', ''),
      title: data.title || 'Untitled',
      description: data.description || data.excerpt || 'No description available',
      date: data.date || new Date().toISOString().split('T')[0],
      tags: data.tags || [],
      readingTime: `${readingTime} min read`,
      excerpt: data.excerpt || 'No excerpt available'
    });
  }
  
  // Sort by date (newest first)
  return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate static HTML for blog index
function generateBlogIndexHTML(blogPosts) {

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Brett Sanders</title>
  <meta name="description" content="Technical blog by Brett Sanders covering software engineering, AI, and technology leadership.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.brettsanders.com/blog">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Blog - Brett Sanders">
  <meta property="og:description" content="Technical blog covering software engineering, AI, and technology leadership.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.brettsanders.com/blog">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Brett Sanders Blog",
    "url": "https://www.brettsanders.com/blog",
    "description": "Technical blog by Brett Sanders covering software engineering, AI, and technology leadership",
    "author": {
      "@type": "Person",
      "name": "Brett Sanders",
      "url": "https://www.brettsanders.com"
    },
    "blogPost": [
      ${blogPosts.map(post => `{
        "@type": "BlogPosting",
        "headline": "${post.title}",
        "description": "${post.description}",
        "url": "https://www.brettsanders.com/blog/${post.slug}",
        "datePublished": "${post.date}",
        "author": {
          "@type": "Person",
          "name": "Brett Sanders"
        },
        "keywords": "${post.tags.join(', ')}"
      }`).join(',\n      ')}
    ]
  }
  </script>
  
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .card { background: #f9f9f9; padding: 1.5rem; border-radius: 8px; }
    .title { color: #1a1a1a; margin-bottom: 0.5rem; }
    .description { color: #666; margin-bottom: 1rem; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .tag { background: #e3f2fd; color: #1565c0; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem; }
    .meta { display: flex; justify-content: space-between; color: #888; font-size: 0.875rem; }
    a { color: #1565c0; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <header style="text-align: center; margin-bottom: 3rem;">
      <h1>Brett Sanders Blog</h1>
      <p>Technical insights on software engineering, AI, and technology leadership</p>
    </header>
    
    <main>
      <div class="grid">
        ${blogPosts.map(post => `
          <article class="card">
            <h2 class="title">
              <a href="/blog/${post.slug}">${post.title}</a>
            </h2>
            <p class="description">${post.description}</p>
            <div class="tags">
              ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="meta">
              <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
              <span>${post.readingTime}</span>
            </div>
          </article>
        `).join('')}
      </div>
    </main>
  </div>
</body>
</html>
  `;
}

// Generate static HTML for individual blog posts
function generateBlogPostHTML(post) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} - Brett Sanders</title>
  <meta name="description" content="${post.description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://www.brettsanders.com/blog/${post.slug}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://www.brettsanders.com/blog/${post.slug}">
  <meta property="article:published_time" content="${post.date}">
  <meta property="article:author" content="Brett Sanders">
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${post.title}",
    "description": "${post.description}",
    "url": "https://www.brettsanders.com/blog/${post.slug}",
    "datePublished": "${post.date}",
    "author": {
      "@type": "Person",
      "name": "Brett Sanders",
      "url": "https://www.brettsanders.com"
    },
    "keywords": "${post.tags.join(', ')}"
  }
  </script>
  
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; margin: 0; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
    .title { color: #1a1a1a; margin-bottom: 1rem; }
    .meta { color: #666; margin-bottom: 2rem; }
    .description { color: #444; font-size: 1.1em; margin-bottom: 2rem; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
    .tag { background: #e3f2fd; color: #1565c0; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem; }
    .content { color: #333; }
    a { color: #1565c0; }
  </style>
</head>
<body>
  <div class="container">
    <article>
      <h1 class="title">${post.title}</h1>
      <div class="meta">
        <time datetime="${post.date}">${new Date(post.date).toLocaleDateString()}</time>
        <span> • ${post.readingTime}</span>
      </div>
      <p class="description">${post.description}</p>
      <div class="tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <div class="content">
        <p><strong>This is a static preview of the blog post.</strong></p>
        <p>For the full interactive experience with syntax highlighting, comments, and dynamic features, please visit the main site.</p>
        <p><a href="https://www.brettsanders.com/blog/${post.slug}">Read the full article on brettsanders.com</a></p>
      </div>
    </article>
  </div>
</body>
</html>
  `;
}

// Generate all static files
async function generateStaticFiles() {
  const blogPosts = await loadBlogPosts();
  const distDir = path.join(__dirname, '../dist');
  const blogDir = path.join(distDir, 'static', 'blog');
  
  // Create directories if they don't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  
  // Generate blog index
  fs.writeFileSync(path.join(blogDir, 'index.html'), generateBlogIndexHTML(blogPosts));
  console.log('✓ Generated blog index.html');
  
  // Generate individual blog posts
  blogPosts.forEach(post => {
    try {
      // Validate the slug to prevent path traversal attacks
      const postDir = validatePathSegment(post.slug, blogDir);
      
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }
      
      // Validate the final file path before writing (should be within postDir, not just blogDir)
      const indexPath = validateFilePath(path.join(postDir, 'index.html'), postDir);
      fs.writeFileSync(indexPath, generateBlogPostHTML(post));
      console.log(`✓ Generated ${post.slug}/index.html`);
    } catch (error) {
      console.error(`✗ Failed to generate blog post for slug "${post.slug}":`, error.message);
      // Continue processing other posts even if one fails
    }
  });
  
  console.log('Static blog files generated successfully!');
}

generateStaticFiles().catch(console.error);