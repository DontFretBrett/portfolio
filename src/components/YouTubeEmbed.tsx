import { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  description?: string;
  className?: string;
  autoplay?: boolean;
  startTime?: number;
  enablePrivacyMode?: boolean;
}

export default function YouTubeEmbed({ 
  videoId, 
  title, 
  description, 
  className = "",
  autoplay = false,
  startTime = 0,
  enablePrivacyMode = true
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Use privacy-enhanced mode by default (youtube-nocookie.com)
  const baseUrl = enablePrivacyMode 
    ? "https://www.youtube-nocookie.com" 
    : "https://www.youtube.com";

  // Build query parameters
  const params = new URLSearchParams({
    ...(autoplay && { autoplay: '1' }),
    ...(startTime > 0 && { start: startTime.toString() }),
    // Enable captions by default for accessibility
    cc_load_policy: '1',
    // Disable related videos from other channels 
    rel: '0',
    // Enable modest branding
    modestbranding: '1'
  });

  const embedUrl = `${baseUrl}/embed/${videoId}?${params.toString()}`;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center ${className}`}>
        <div className="text-gray-600 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-lg font-medium mb-2">Video Unavailable</p>
          <p className="text-sm">Sorry, this video could not be loaded.</p>
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Watch on YouTube
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      )}

      {/* YouTube iframe with accessibility and performance optimizations */}
      <iframe
        src={embedUrl}
        title={`YouTube video: ${title}`}
        className="w-full h-full"
        style={{ aspectRatio: '16/9', minHeight: '315px' }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
        // Accessibility attributes
        aria-label={`Video player for ${title}${description ? `: ${description}` : ''}`}
      />
      
      {/* Optional description for screen readers */}
      {description && (
        <div className="sr-only">
          {description}
        </div>
      )}
    </div>
  );
}