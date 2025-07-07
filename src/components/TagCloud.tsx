import { memo, useState } from 'react';
import type { BlogPost } from '@types/blog';

interface TagCloudProps {
  posts: BlogPost[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}

interface TagWithCount {
  tag: string;
  count: number;
}

export default memo(function TagCloud({ posts, selectedTags, onTagToggle, className = '' }: TagCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    if (post.tags) {
      post.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {});

  const sortedTags: TagWithCount[] = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  if (sortedTags.length === 0) {
    return null;
  }

  const getTagSize = (count: number, maxCount: number): string => {
    const ratio = count / maxCount;
    if (ratio >= 0.8) return 'text-lg';
    if (ratio >= 0.6) return 'text-base';
    if (ratio >= 0.4) return 'text-sm';
    return 'text-xs';
  };

  const maxCount = Math.max(...sortedTags.map(t => t.count));

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-controls="tag-cloud-content"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tag Cloud</h2>
          {selectedTags.length > 0 && (
            <>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded-full">
                {selectedTags.length} selected
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectedTags.forEach(tag => onTagToggle(tag));
                }}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
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
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 pt-4">
          <div className="flex flex-wrap gap-2">
            {sortedTags.map(({ tag, count }) => {
              const isSelected = selectedTags.includes(tag);
              const sizeClass = getTagSize(count, maxCount);
              
              return (
                <button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full font-medium transition-all duration-200
                    ${sizeClass}
                    ${isSelected 
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }
                  `}
                  aria-label={`Filter by ${tag} (${count} posts)`}
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
                  onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
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