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
    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      
      <audio 
        controls 
        className="w-full h-12 rounded-lg"
        preload="metadata"
        style={{
          outline: 'none',
          backgroundColor: '#f8fafc',
        }}
      >
        <source src={src} type={mimeType} />
        Your browser does not support the audio element. 
        <a href={src} className="text-blue-600 dark:text-blue-400 hover:underline">
          Download the podcast
        </a>
      </audio>
      
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        💡 This podcast was generated using Google's NotebookLM AI to create an engaging discussion 
        between two AI hosts about the themes covered in this article.
      </div>
    </div>
  );
} 