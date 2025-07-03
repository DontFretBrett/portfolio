import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { BlogPost } from '../types/blog';
import { formatDate } from '../utils/blog';
import { Clock, Calendar, Tag } from 'lucide-react';
import GiscusComments from './Giscus';

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 overflow-hidden dark:bg-gray-900 min-h-screen transition-colors duration-200">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-200">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-start gap-2 w-full sm:w-auto">
              <Tag className="w-4 h-4 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-2 min-w-0">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full whitespace-nowrap transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0 transition-colors duration-200">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4 transition-colors duration-200">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3 transition-colors duration-200">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3 transition-colors duration-200">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-200">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 transition-colors duration-200">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 transition-colors duration-200">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-700 dark:text-gray-300 transition-colors duration-200">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-6 transition-colors duration-200">
                {children}
              </blockquote>
            ),
            code: ({ children, ...props }) => {
              const inline = !props.className;
              return inline ? (
                <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm transition-colors duration-200">
                  {children}
                </code>
              ) : (
                <code className="block bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto max-w-full transition-colors duration-200">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto mb-6 max-w-full transition-colors duration-200">
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-gray-700 dark:text-gray-300 transition-colors duration-200">{children}</em>
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