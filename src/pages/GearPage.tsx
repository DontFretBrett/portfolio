import { Helmet } from 'react-helmet-async';
import Gear from '../components/Gear';
import { gearItems, gearCategories } from '../data/gear';

// Consistent dateModified to avoid SSR hydration issues
const dateModified = "2025-01-10";

export default function GearPage() {
  return (
    <>
      <Helmet>
        <title>My Gear & Tech Recommendations - Brett Sanders</title>
        <meta name="description" content="Discover the tools and equipment I use for software development, productivity, and content creation. Genuine recommendations from my personal experience including keyboards, mice, monitors, and more." />
        <meta name="keywords" content="Software Development Gear, Programming Equipment, Tech Recommendations, Developer Tools, Productivity Setup, Coding Keyboard, Development Mouse, Brett Sanders Gear" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://amazon.com" />
        <link rel="dns-prefetch" href="https://amazon.com" />
        <link rel="preconnect" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="My Gear & Tech Recommendations - Brett Sanders" />
        <meta property="og:description" content="Discover the tools and equipment I use for software development, productivity, and content creation. Genuine recommendations from my personal experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.brettsanders.com/gear" />
        <meta property="og:image" content="https://www.brettsanders.com/me.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Gear & Tech Recommendations - Brett Sanders" />
        <meta name="twitter:description" content="Discover the tools and equipment I use for software development, productivity, and content creation." />
        <meta name="twitter:image" content="https://www.brettsanders.com/me.webp" />
        
        <link rel="canonical" href="https://www.brettsanders.com/gear" />
        
        {/* Structured Data for ItemList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Brett Sanders' Gear & Tech Recommendations",
            "description": "A curated list of tools and equipment used for software development, productivity, and content creation",
            "url": "https://www.brettsanders.com/gear",
            "author": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com"
            },
            "numberOfItems": gearItems.length,
            "itemListElement": gearItems.map((item, index) => {
              // Build offers object conditionally
              const offers: {
                "@type": string;
                priceCurrency: string;
                availability: string;
                price?: string;
                url?: string;
              } = {
                "@type": "Offer",
                "priceCurrency": "USD",
                "availability": item.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
              };
              
              // Only include price if it exists and is not empty
              if (item.price && item.price.trim() !== '') {
                offers.price = item.price.replace('$', '');
              }
              
              // Only include URL if it exists and is not empty
              if (item.affiliateUrl && item.affiliateUrl.trim() !== '') {
                offers.url = item.affiliateUrl;
              }
              
              return {
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": item.name,
                  "description": item.description,
                  "category": item.category,
                  "offers": offers,
                  "aggregateRating": item.rating ? {
                    "@type": "AggregateRating",
                    "ratingValue": item.rating,
                    "ratingCount": 1,
                    "reviewCount": 1
                  } : undefined,
                  "review": {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Brett Sanders"
                    },
                    "reviewRating": item.rating ? {
                      "@type": "Rating",
                      "ratingValue": item.rating,
                      "bestRating": 5,
                      "worstRating": 1
                    } : undefined,
                    "reviewBody": item.description
                  }
                }
              };
            })
          })}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What gear does Brett Sanders use for coding?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Brett Sanders uses professional-grade equipment for software development including the Logitech MX Keys S wireless keyboard, which provides excellent typing experience for long coding sessions with smart illumination and programmable keys."
                }
              },
              {
                "@type": "Question",
                "name": "Are these affiliate links?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, some links on this page are affiliate links. When you purchase through these links, I may earn a commission at no extra cost to you. I only recommend products I personally use and believe in."
                }
              },
              {
                "@type": "Question",
                "name": "How does Brett Sanders choose which gear to recommend?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "I only recommend gear that I personally use in my daily work as a Software Engineering Director. Each recommendation is based on real-world experience in software development, team leadership, and content creation."
                }
              }
            ]
          })}
        </script>
        
        {/* WebPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "My Gear & Tech Recommendations",
            "url": "https://www.brettsanders.com/gear",
            "description": "Discover the tools and equipment I use for software development, productivity, and content creation. Genuine recommendations from my personal experience.",
            "author": {
              "@type": "Person",
              "name": "Brett Sanders",
              "url": "https://www.brettsanders.com"
            },
            "publisher": {
              "@type": "Person",
              "name": "Brett Sanders"
            },
            "inLanguage": "en-US",
            "datePublished": "2025-01-10",
            "dateModified": dateModified,
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.brettsanders.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Gear",
                  "item": "https://www.brettsanders.com/gear"
                }
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Gear Recommendations",
              "numberOfItems": gearItems.length
            }
          })}
        </script>
      </Helmet>
      
      <main className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              My Gear
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              The tools and equipment that power my daily work in software development, team leadership, and content creation. These are genuine recommendations based on real-world experience.
            </p>
          </div>
        </section>

        {/* Gear Component */}
        <Gear items={gearItems} categories={gearCategories} showCategories={true} />
        
        {/* Additional Info Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Why These Recommendations?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    🎯 Personal Experience
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Every item on this list is something I use daily in my work as a Software Engineering Director. 
                    I've tested these tools through countless hours of coding, meetings, and content creation.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    🔧 Professional Standards
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    As someone who leads engineering teams and builds complex systems, I need tools that can handle 
                    demanding workflows while maintaining reliability and performance.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    💡 Continuous Evaluation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    I regularly evaluate new tools and technologies. This list is updated as I discover better 
                    solutions or when my workflow requirements change.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    🤝 Community Value
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Beyond personal use, I consider how these tools can benefit other developers and creators in 
                    our community. Quality, accessibility, and value are key factors in my recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 