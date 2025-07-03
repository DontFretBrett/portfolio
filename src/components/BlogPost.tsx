import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { BlogPost } from '../types/blog';
import { Clock, Calendar, Tag } from 'lucide-react';
import GiscusComments from './Giscus';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 overflow-hidden dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Tag className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-700 dark:text-gray-300">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                    {children}
                  </code>
                );
              }
              // For code blocks, just return the code element with proper styling
              return (
                <code className={`${className || ''} text-sm font-mono block`}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <div className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-x-auto mb-6 max-w-full">
                <pre className="p-4 text-sm leading-relaxed text-gray-900 dark:text-gray-100 font-mono">
                  {children}
                </pre>
              </div>
            ),
            a: ({ href, children }) => (
              <Link
                to={href || '#'}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                {children}
              </Link>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      
      {/* Comments Section */}
      <GiscusComments term={post.slug} />
    </article>
  );
} 