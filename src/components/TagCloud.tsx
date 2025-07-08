import { memo, useState, useMemo, useCallback } from 'react';
import { Cloud } from 'lucide-react';
import type { BlogPost } from '../types/blog';
import { trackBlogInteraction } from '../utils/analytics';

interface TagCloudProps {
  posts: BlogPost[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll?: () => void;
  className?: string;
  onError?: (error: Error) => void;
}

interface TagWithCount {
  tag: string;
  count: number;
}

const getTagSize = (count: number, maxCount: number): string => {
  const ratio = count / maxCount;
  if (ratio > 0.8) return 'text-lg';
  if (ratio > 0.6) return 'text-base';
  if (ratio > 0.4) return 'text-sm';
  return 'text-xs';
};

const TagCloud = memo(function TagCloud({ posts, selectedTags, onTagToggle, onClearAll, className = '', onError }: TagCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Memoize expensive computations
  const tagCounts = useMemo(() => {
    if (!posts || posts.length === 0) {
      return {};
    }
    try {
      return posts.reduce<Record<string, number>>((acc, post) => {
        if (post.tags) {
          post.tags.forEach(tag => {
            acc[tag] = (acc[tag] || 0) + 1;
          });
        }
        return acc;
      }, {});
    } catch (error) {
      if (import.meta.env.DEV) {
        // In development, throw to aid debugging
        throw error;
      } else {
        // In production, log and optionally call onError
        console.error('Error computing tagCounts:', error);
        onError?.(error as Error);
        return {};
      }
    }
  }, [posts, onError]);

  const sortedTags: TagWithCount[] = useMemo(() => {
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [tagCounts]);

  // Memoize callback functions
  const handleTagToggle = useCallback((tag: string) => {
    trackBlogInteraction('Tag Click', tag);
    onTagToggle(tag);
  }, [onTagToggle]);

  const handleClearAll = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClearAll) {
      onClearAll();
      trackBlogInteraction('Tag Click', 'Clear All');
    } else {
      // Fallback: capture current selected tags to avoid race conditions
      const tagsToToggle = [...selectedTags];
      tagsToToggle.forEach(tag => handleTagToggle(tag));
    }
  }, [selectedTags, handleTagToggle, onClearAll]);

  // Early returns after all hooks
  if (!posts || posts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No posts available for tag filtering
      </div>
    );
  }

  if (sortedTags.length === 0) {
    return null;
  }

  const maxCount = Math.max(...sortedTags.map(t => t.count));

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}
      role="group"
      aria-labelledby="tag-cloud-heading"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-controls="tag-cloud-content"
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} tag cloud with ${sortedTags.length} tags`}
      >
        <div className="flex items-center gap-3">
          <h2 id="tag-cloud-heading" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Cloud className="w-5 h-5" aria-hidden="true" />
            Tag Cloud
          </h2>
          {selectedTags.length > 0 && (
            <>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded-full">
                {selectedTags.length} selected
              </span>
              <button
                onClick={handleClearAll}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                aria-label="Clear all selected tags"
              >
                Clear
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {sortedTags.length} tags
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div 
        id="tag-cloud-content"
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[80vh] sm:max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'
        } overflow-y-auto overflow-x-hidden`}
      >
        <div className="p-6 pt-4">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 w-full min-w-0">
            {sortedTags.map(({ tag, count }) => {
              const isSelected = selectedTags.includes(tag);
              const sizeClass = getTagSize(count, maxCount);
              
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full font-medium transition-all duration-200
                    ${sizeClass}
                    ${isSelected 
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                    }
                    whitespace-nowrap max-w-full truncate min-w-0 flex-shrink
                  `}
                  aria-label={`${isSelected ? 'Remove' : 'Add'} ${tag} filter (${count} posts)`}
                  aria-pressed={isSelected}
                >
                  {tag}
                  <span className="ml-1 text-xs opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
                </span>
                <button
                  onClick={handleClearAll}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label="Clear all selected tags"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

TagCloud.displayName = 'TagCloud';
export default TagCloud;