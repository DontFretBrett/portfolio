import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { BlogPost as BlogPostType } from '../types/blog';
import { formatDate } from '../utils/blog';
import Giscus from './Giscus';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen">
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
          
          {post.readingTime && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readingTime} min read</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span>By</span>
            <Link 
              to="/" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Brett Sanders
            </Link>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-3 mb-8">
            <Tag className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Article description/excerpt */}
        {post.excerpt && (
          <div className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
            {post.excerpt}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            // Enhanced link component with external link indicators
            a: ({ href, children, ...props }) => {
              const isExternal = href?.startsWith('http') && !href.includes('brettsanders.com');
              const isInternal = href?.startsWith('/') || href?.includes('brettsanders.com');
              
              if (isExternal) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    {...props}
                  >
                    {children}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                );
              }
              
              if (isInternal && href?.startsWith('/')) {
                return (
                  <Link
                    to={href}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    {...props}
                  >
                    {children}
                  </Link>
                );
              }
              
              return (
                <a
                  href={href}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  {...props}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Author Bio Section */}
      <aside className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/me.jpeg"
              alt="Brett Sanders"
              className="w-16 h-16 rounded-full ring-2 ring-blue-500 hover:ring-4 transition-all"
            />
          </Link>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                About Brett Sanders
              </Link>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
              Software Engineering Director with 15+ years of experience in the financial sector. 
              Expert in AI engineering, full-stack development, and technology leadership. 
              Currently building cutting-edge AI agents and autonomous systems.
            </p>
            <div className="flex gap-4 text-sm">
              <Link 
                to="/" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                View Profile
              </Link>
              <Link 
                to="/ai-projects" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                AI Projects
              </Link>
              <Link 
                to="/blog" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                More Articles
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Related Content Section */}
      <aside className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Explore More</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/blog"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Technology Blog</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Read more articles on AI engineering, software architecture, and technology leadership.
            </p>
          </Link>
          
          {post.tags?.some(tag => ['AI', 'Machine Learning', 'AutoGen', 'MCP'].includes(tag)) && (
            <Link
              to="/ai-projects"
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">AI Projects</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore hands-on AI engineering projects and live demonstrations.
              </p>
            </Link>
          )}
          
          <Link
            to="/"
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">About & Experience</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn about my background, skills, and professional experience.
            </p>
          </Link>
        </div>
      </aside>

      {/* Comments Section */}
      <div className="mt-12">
        <Giscus />
      </div>
    </article>
  );
} 