import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag, User } from 'lucide-react';
import TagCloud from './TagCloud';
import type { BlogPost } from '../types/blog';
import { formatDate } from '../utils/blog';

interface BlogListProps {
  posts: BlogPost[];
  allPosts?: BlogPost[];
  selectedTags?: string[];
  onTagToggle?: (tag: string) => void;
  onClearAllTags?: () => void;
}

export default function BlogList({ posts, allPosts, selectedTags, onTagToggle, onClearAllTags }: BlogListProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 dark:bg-gray-900 min-h-screen">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Technology Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Insights on <Link to="/ai-projects" className="text-blue-600 dark:text-blue-400 hover:underline">AI engineering</Link>, 
          software architecture, leadership, and the latest in technology innovation.
        </p>
      </header>

      {allPosts && selectedTags && onTagToggle && (
        <div className="mb-8">
          <TagCloud 
            posts={allPosts}
            selectedTags={selectedTags}
            onTagToggle={onTagToggle}
            {...(onClearAllTags && { onClearAll: onClearAllTags })}
          />
        </div>
      )}

      <section className="space-y-8" itemScope itemType="https://schema.org/Blog">
        {posts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-200 border border-gray-100 dark:border-gray-700 p-6"
            itemScope 
            itemType="https://schema.org/BlogPosting"
          >
            <header className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3" itemProp="headline">
                <Link 
                  to={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <time dateTime={post.date} itemProp="datePublished">
                    {formatDate(post.date)}
                  </time>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  <Link 
                    to="/" 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <span itemProp="name">Brett Sanders</span>
                  </Link>
                </div>
                
                {post.readingTime && (
                  <div className="flex items-center gap-2">
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" aria-hidden="true" />
                  <div className="flex gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                        itemProp="keywords"
                        title={`View more posts about ${tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </header>

            <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 overflow-hidden" itemProp="description">
              {post.excerpt}
            </div>

            <footer className="flex items-center justify-between">
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                aria-label={`Read full article: ${post.title}`}
              >
                Read full article
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              {/* Contextual internal links based on content */}
              {post.tags?.includes('AI') && (
                <Link
                  to="/ai-projects"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  View AI Projects →
                </Link>
              )}
            </footer>

            {/* Hidden metadata for search engines */}
            <div className="hidden">
              <span itemProp="publisher" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">Brett Sanders</span>
              </span>
              <meta itemProp="dateModified" content={post.date} />
              <meta itemProp="wordCount" content={String(post.content?.split(' ').length || 0)} />
            </div>
          </article>
        ))}
      </section>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            In the meantime, explore my <Link to="/ai-projects" className="text-blue-600 dark:text-blue-400 hover:underline">AI projects</Link> or 
            learn more <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">about my experience</Link>.
          </p>
        </div>
      )}

      {/* Related content navigation */}
      {posts.length > 0 && (
        <aside className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Explore More</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/ai-projects"
              className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">AI Projects</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore hands-on AI engineering projects featuring AutoGen, MCP, and cutting-edge frameworks.
              </p>
            </Link>
            <Link
              to="/"
              className="block p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">About Brett Sanders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn about my experience as a Software Engineering Director and technology leader.
              </p>
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
} 