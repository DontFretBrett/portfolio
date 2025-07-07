import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import BlogList from '../components/BlogList';
import TagCloud from '../components/TagCloud';
import Breadcrumbs from '../components/Breadcrumbs';
import { getAllBlogPosts } from '../data/blogPosts';
import type { BlogPost } from '../types/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter(post => 
      post.tags?.some(tag => selectedTags.includes(tag))
    );
  }, [posts, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog - Brett Sanders | Technology Leadership & Software Engineering</title>
        <meta name="description" content="Read Brett Sanders' blog on technology leadership, full-stack development, AI engineering, and career insights from 15+ years in the financial sector." />
        <meta name="keywords" content="Technology Blog, Software Engineering Blog, AI Blog, Leadership Blog, Full Stack Development, AWS, React, Node.js" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog - Brett Sanders | Technology Leadership & Software Engineering" />
        <meta property="og:description" content="Read Brett Sanders' blog on technology leadership, full-stack development, AI engineering, and career insights from 15+ years in the financial sector." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.brettsanders.com/blog" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Blog - Brett Sanders | Technology Leadership & Software Engineering" />
        <meta name="twitter:description" content="Read Brett Sanders' blog on technology leadership, full-stack development, AI engineering, and career insights." />
        
        <link rel="canonical" href="https://www.brettsanders.com/blog" />
        
        {/* Structured Data for Blog */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Brett Sanders Blog",
            "description": "Technology leadership, full-stack development, AI engineering, and career insights",
            "url": "https://www.brettsanders.com/blog",
            "author": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com"
            },
            "publisher": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com"
            }
          })}
        </script>
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Breadcrumbs 
          items={[
            { label: 'Blog', isLast: true }
          ]}
          className="mb-6"
        />
        <TagCloud 
          posts={posts}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          className="mb-4"
        />
      </div>
      <BlogList posts={filteredPosts} />
    </>
  );
} 