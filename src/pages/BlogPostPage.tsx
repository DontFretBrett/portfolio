import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BlogPost from '../components/BlogPost';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlogPost } from '../data/blogPosts';
import type { BlogPost as BlogPostType } from '../types/blog';


// Component that loads blog post data
function BlogPostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPostType | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const blogPost = await getBlogPost(slug);
        setPost(blogPost);
      } catch (error) {
        console.error('Failed to load blog post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <>
        {/* React 19 native document metadata */}
        <title>Post Not Found - Brett Sanders Blog</title>
        <meta name="description" content="The blog post you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
        
        <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  const postUrl = `https://www.brettsanders.com/blog/${post.slug}`;
  const publishedDate = new Date(post.date).toISOString();
  const modifiedDate = new Date(post.date).toISOString(); // Use same as published for now
  const metaDescription = post.description || post.excerpt;
  const metaKeywords = post.keywords || post.tags?.join(', ') || 'technology, software engineering, leadership';

  return (
    <>
      {/* React 19 native document metadata - automatically hoisted to <head> */}
      <title>{post.title} - Brett Sanders Blog</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Brett Sanders" />
      
      {/* Open Graph */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:site_name" content="Brett Sanders Blog" />
      <meta property="article:author" content="Brett Sanders" />
      <meta property="article:published_time" content={publishedDate} />
      <meta property="article:modified_time" content={modifiedDate} />
      <meta property="article:section" content="Technology" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:creator" content="@WontFretBrett" />
      <meta name="twitter:site" content="@WontFretBrett" />
      
      <link rel="canonical" href={postUrl} />
      
      {/* Fallback to react-helmet-async for better compatibility and structured data */}
      <Helmet>
        <title>{post.title} - Brett Sanders Blog</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="author" content="Brett Sanders" />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:site_name" content="Brett Sanders Blog" />
        <meta property="article:author" content="Brett Sanders" />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={modifiedDate} />
        <meta property="article:section" content="Technology" />
        {post.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:creator" content="@WontFretBrett" />
        <meta name="twitter:site" content="@WontFretBrett" />
        
        <link rel="canonical" href={postUrl} />
        
        {/* Structured Data for Article */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": metaDescription,
            "url": postUrl,
            "datePublished": publishedDate,
            "dateModified": modifiedDate,
            "author": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com",
              "jobTitle": "Software Engineering Director",
              "description": "Technology leader with 15+ years of experience in financial sector specializing in AI engineering and full stack development",
              "image": "https://www.brettsanders.com/me.jpeg",
              "sameAs": [
                "https://www.linkedin.com/in/imbrett/",
                "https://github.com/DontFretBrett",
                "https://x.com/WontFretBrett"
              ],
              "knowsAbout": [
                "Software Engineering",
                "AI Engineering", 
                "Full Stack Development",
                "Technology Leadership",
                "AWS",
                "React",
                "TypeScript",
                "Node.js"
              ]
            },
            "publisher": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.brettsanders.com/me.jpeg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": postUrl
            },
            "keywords": metaKeywords,
            "wordCount": post.content.split(' ').length,
            "timeRequired": `PT${post.readingTime}M`,
            "articleSection": "Technology",
            "inLanguage": "en-US",
            "about": post.tags?.map(tag => ({
              "@type": "Thing",
              "name": tag
            })) || [],
            "mentions": post.tags?.map(tag => ({
              "@type": "Thing",
              "name": tag
            })) || [],
            "isAccessibleForFree": true,
            "creativeWorkStatus": "Published",
            "copyrightHolder": {
              "@type": "Person",
              "name": "Brett Sanders"
            },
            "copyrightYear": new Date(post.date).getFullYear(),
            "license": "https://creativecommons.org/licenses/by/4.0/",
            "educationalLevel": "Professional",
            "audience": {
              "@type": "Audience",
              "audienceType": "Software Engineers, Technology Leaders, AI Engineers"
            }
          })}
        </script>
      </Helmet>
      
      <div className="overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title, isLast: true }
            ]}
            className="mb-6"
          />
        </div>
        <BlogPost post={post} />
      </div>
    </>
  );
}



export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  return <BlogPostContent slug={slug} />;
} 