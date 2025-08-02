import { Helmet } from 'react-helmet-async';
import { useState, useMemo } from 'react';
import VideoCard from '../components/VideoCard';
import { musicVideos, musicCategories } from '../data/musicData';

export default function MusicPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isGridView, setIsGridView] = useState(true);

  // Derive dateModified from most recent video publish date to avoid manual updates
  const dateModified = useMemo(() => {
    const sortedDates = musicVideos
      .map(video => video.publishedDate)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    return sortedDates[0] || "2025-01-15";
  }, []);

  // Filter videos based on selected category
  const filteredVideos = useMemo(() => {
    if (selectedCategory === "All") return musicVideos;
    return musicVideos.filter(video => 
      video.tags.includes(selectedCategory) || video.genre === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Music Videos Created with AI - Brett Sanders</title>
        <meta name="description" content="Explore my music collection featuring AI-generated videos. Creative visual storytelling through artificial intelligence paired with electronic, EDM, indie, and pop tracks." />
        <meta name="keywords" content="AI Video, AI Generated Videos, Music Videos, Electronic Music, EDM, Indie Music, Pop Music, AI Visuals, Creative Technology, Brett Sanders Music" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Music Videos Created with AI - Brett Sanders" />
        <meta property="og:description" content="Explore my music collection featuring AI-generated videos. Creative visual storytelling through artificial intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.brettsanders.com/music" />
        <meta property="og:image" content="https://www.brettsanders.com/me.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Music Videos Created with AI - Brett Sanders" />
        <meta name="twitter:description" content="Explore my music collection featuring AI-generated videos and creative visual storytelling." />
        <meta name="twitter:image" content="https://www.brettsanders.com/me.webp" />
        
        <link rel="canonical" href="https://www.brettsanders.com/music" />
        
        {/* Structured Data for Creative Works */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Brett Sanders' Music Video Collection",
            "description": "A collection of music tracks featuring AI-generated videos showcasing creative visual storytelling through artificial intelligence",
            "url": "https://www.brettsanders.com/music",
            "author": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com",
              "sameAs": ["https://github.com/brettsanders", "https://linkedin.com/in/brett-sanders"]
            },
            "numberOfItems": musicVideos.length,
            "itemListElement": musicVideos.map((video, index) => ({
              "@type": "ListItem", 
              "position": index + 1,
              "item": {
                "@type": "MusicComposition",
                "name": video.title,
                "description": video.description,
                "genre": video.genre,
                "datePublished": video.publishedDate,
                "creator": {
                  "@type": "Person",
                  "name": "Brett Sanders"
                },
                "url": `https://www.youtube.com/watch?v=${video.youtubeId}`,
                "keywords": video.tags.join(", ")
              }
            })),
            "dateModified": dateModified,
            "inLanguage": "en-US"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Music Videos Created with AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Exploring the creative possibilities of AI-generated video content paired with original music. 
              These videos showcase innovative visual storytelling and cutting-edge AI video generation techniques.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{musicVideos.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">AI Videos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{musicCategories.length - 1}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Genres</div>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {musicCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">View:</span>
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded cursor-pointer ${isGridView ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                aria-label="Grid view"
                aria-pressed={isGridView}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded cursor-pointer ${!isGridView ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                aria-label="List view"
                aria-pressed={!isGridView}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Grid/List */}
          {filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">No videos found for the selected category.</p>
            </div>
          ) : (
            <div className={`gap-8 ${isGridView ? 'grid grid-cols-1 lg:grid-cols-2' : 'space-y-8'}`}>
              {filteredVideos.map((video) => (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  isListView={!isGridView}
                />
              ))}
            </div>
          )}

          {/* About Section */}
          <div className="mt-24 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              About AI Video Creation
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto">
                These videos represent my exploration into the creative potential of artificial intelligence in visual storytelling. 
                Using cutting-edge AI video generation tools and techniques, I create compelling visual narratives that complement 
                my music across various genres. Each video showcases different aspects of AI-powered creativity, from dynamic 
                visual effects to innovative cinematography and artistic expression.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

