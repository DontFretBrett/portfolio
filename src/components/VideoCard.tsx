import YouTubeEmbed from './YouTubeEmbed';
import { type MusicVideo } from '../data/musicData';

interface VideoCardProps {
  video: MusicVideo;
  isListView?: boolean;
}

export default function VideoCard({ video, isListView = false }: VideoCardProps) {
  return (
    <div className="inline-block w-full" style={{ verticalAlign: 'top' }}>
      <article
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${isListView ? 'flex' : ''}`}
        style={{ willChange: 'transform' }}
      >
        {/* Video Embed */}
        <div className={isListView ? 'w-1/2 flex-shrink-0' : 'w-full'}>
          <YouTubeEmbed
            videoId={video.youtubeId}
            title={video.title}
            description={video.description}
            className="h-64"
            enablePrivacyMode={true}
          />
        </div>
        
        {/* Content */}
        <div className={`p-6 ${isListView ? 'w-1/2' : ''}`}>
          <header className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {video.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <time dateTime={video.publishedDate}>
                {new Date(video.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </time>
              {video.duration && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {video.duration}
                </span>
              )}
            </div>
          </header>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {video.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {video.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* External Link */}
          <a
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            Watch on YouTube
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </article>
    </div>
  );
}