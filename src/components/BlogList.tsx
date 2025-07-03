import { Link } from 'react-router-dom';
import type { BlogPost } from '../types/blog';
import { formatDate } from '../utils/blog';
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-200">Blog</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-200">
          Insights on AI engineering, software development, and technology leadership from Brett Sanders
        </p>
      </header>

      <section className="space-y-8" itemScope itemType="https://schema.org/Blog">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-200"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <header className="mb-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-200" itemProp="headline">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  itemProp="url"
                >
                  {post.title}
                </Link>
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={post.date} itemProp="datePublished">
                    {formatDate(post.date)}
                  </time>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span itemProp="timeRequired" content={`PT${post.readingTime}M`}>
                    {post.readingTime} min read
                  </span>
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" aria-hidden="true" />
                    <div className="flex gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full transition-colors duration-200"
                          itemProp="keywords"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-gray-500 dark:text-gray-400 text-xs transition-colors duration-200">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </header>

            <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 overflow-hidden transition-colors duration-200" itemProp="description">
              {post.excerpt}
            </div>

            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
              aria-label={`Read full article: ${post.title}`}
            >
              Read "{post.title}"
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            {/* Hidden metadata for search engines */}
            <div className="hidden">
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">Brett Sanders</span>
              </span>
              <span itemProp="publisher" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">Brett Sanders</span>
              </span>
            </div>
          </article>
        ))}
      </section>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors duration-200">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
} 