interface PodcastPlayerProps {
  src: string;
  title?: string;
  description?: string;
}

// Function to get MIME type from file extension
function getMimeType(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'mp3':
      return 'audio/mpeg';
    case 'wav':
      return 'audio/wav';
    case 'ogg':
      return 'audio/ogg';
    case 'm4a':
      return 'audio/mp4';
    default:
      return 'audio/mpeg'; // Default fallback
  }
}

export default function PodcastPlayer({ 
  src, 
  title = "🎧 Podcast on this article",
  description = "Created with NotebookLM - An AI discussion about the key themes from this blog post"
}: PodcastPlayerProps) {
  const mimeType = getMimeType(src);

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200/60 dark:border-blue-800/30">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 616 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 715 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h3>
            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full whitespace-nowrap">
              AI Generated
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-tight">
            {description}
          </p>
        </div>
      </div>
      
      <audio 
        controls 
        className="w-full h-10 rounded-md"
        preload="metadata"
        style={{
          outline: 'none',
          filter: 'contrast(0.9) brightness(0.98)',
        }}
      >
        <source src={src} type={mimeType} />
        Your browser does not support the audio element. 
        <a href={src} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
          Download the podcast
        </a>
      </audio>
    </div>
  );
} 