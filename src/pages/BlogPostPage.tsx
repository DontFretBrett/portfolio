import { use, Suspense } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BlogPost from '../components/BlogPost';
import { getBlogPost } from '../data/blogPosts';
import { ArrowLeft } from 'lucide-react';

// React 19 component that uses the use() hook
function BlogPostContent({ slug }: { slug: string }) {
  // React 19 use() hook - getBlogPost is memoized to prevent redundant requests
  // The promise is cached by slug, making this safe for React's use() hook
  const post = use(getBlogPost(slug));

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
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
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
              "sameAs": [
                "https://www.linkedin.com/in/imbrett/",
                "https://github.com/DontFretBrett",
                "https://x.com/WontFretBrett"
              ]
            },
            "publisher": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": postUrl
            },
            "keywords": metaKeywords,
            "wordCount": post.content.split(' ').length,
            "timeRequired": `PT${post.readingTime}M`,
            "articleSection": "Technology",
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>
      
      <div className="overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 pt-8 dark:bg-gray-900">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
        <BlogPost post={post} />
      </div>
    </>
  );
}

// Loading fallback component
function BlogPostLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog post...</p>
      </div>
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContent slug={slug} />
    </Suspense>
  );
} 