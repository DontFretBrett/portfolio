import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Summary from '../components/Summary';
import Skills from '../components/Skills';

// Lazy load larger components with better performance
const Experience = lazy(() => import('../components/Experience'));
const Certifications = lazy(() => import('../components/Certifications'));

// Enhanced loading component with better UX
function ComponentLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <section className="p-16 text-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">{message}</p>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Brett Sanders - Engineering Leader & Full Stack Software Engineer</title>
        <meta name="description" content="Brett Sanders - Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership. Based in San Diego." />
        <meta name="keywords" content="Software Engineering Director, Full Stack Developer, AWS Certified, SAFe Agile, San Diego, Technology Leader, Node.js, React, TypeScript, AI Engineering" />
        
        {/* Performance optimizations */}
        <link rel="preload" href="/me.webp" as="image" type="image/webp" />
        <link rel="preload" href="/me-128.jpg" as="image" type="image/jpeg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.analytics.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Brett Sanders - Engineering Leader & Full Stack Software Engineer" />
        <meta property="og:description" content="Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.brettsanders.com" />
        <meta property="og:image" content="https://www.brettsanders.com/me-128.jpg" />
        <meta property="og:image:width" content="128" />
        <meta property="og:image:height" content="128" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brett Sanders - Engineering Leader & Full Stack Software Engineer" />
        <meta name="twitter:description" content="Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership." />
        <meta name="twitter:image" content="https://www.brettsanders.com/me-128.jpg" />
        
        <link rel="canonical" href="https://www.brettsanders.com" />
        
        {/* Enhanced Structured Data for Person */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Brett Sanders",
            "jobTitle": "Software Engineering Director",
            "description": "Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership.",
            "url": "https://www.brettsanders.com",
            "image": "https://www.brettsanders.com/me.webp",
            "sameAs": [
              "https://www.linkedin.com/in/imbrett/",
              "https://github.com/DontFretBrett",
              "https://x.com/WontFretBrett"
            ],
            "knowsAbout": [
              "Software Engineering",
              "Full Stack Development",
              "AWS",
              "Node.js",
              "React",
              "TypeScript",
              "Team Leadership",
              "AI Engineering",
              "AI Agents",
              "Model Context Protocol",
              "AutoGen Framework",
              "LangGraph",
              "CrewAI",
              "OpenAI",
              "Machine Learning",
              "System Architecture",
              "DevOps",
              "Agile Methodologies",
              "Financial Technology"
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Truist Bank"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "San Diego",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": "Professional Development in Technology"
            },
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Software Engineering Director",
              "occupationLocation": {
                "@type": "City",
                "name": "San Diego, CA"
              },
              "estimatedSalary": {
                "@type": "MonetaryAmountDistribution",
                "name": "base",
                "currency": "USD"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.brettsanders.com"
            }
          })}
        </script>
        
        {/* FAQ Schema for better search results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Brett Sanders' expertise?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Brett Sanders is a Software Engineering Director with expertise in full stack development, AWS cloud services, team leadership, and AI engineering. He has 15+ years of experience in the financial sector building scalable technology solutions."
                }
              },
              {
                "@type": "Question",
                "name": "What AI technologies does Brett Sanders work with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Brett Sanders specializes in AI agents and autonomous systems, working with cutting-edge frameworks like OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and Anthropic's Model Context Protocol (MCP)."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of leadership experience does Brett Sanders have?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Brett Sanders has extensive leadership experience as a Software Engineering Director, leading teams from concept to completion on time and under budget. He is passionate about mentoring, fostering high-performing teams, and sharing knowledge through technical blog posts and AI project demonstrations."
                }
              }
            ]
          })}
        </script>
        
        {/* Enhanced WebSite Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Brett Sanders - Engineering Leader Portfolio",
            "url": "https://www.brettsanders.com",
            "description": "Portfolio and blog of Brett Sanders, Software Engineering Director specializing in AI agents, full stack development, and technology leadership",
            "author": {
              "@type": "Person",
              "name": "Brett Sanders"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.brettsanders.com/blog?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "mainEntity": {
              "@type": "Person",
              "name": "Brett Sanders"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Software Engineering"
              },
              {
                "@type": "Thing",
                "name": "AI Engineering"
              },
              {
                "@type": "Thing",
                "name": "Technology Leadership"
              },
              {
                "@type": "Thing",
                "name": "Full Stack Development"
              }
            ],
            "inLanguage": "en-US",
            "copyrightYear": new Date().getFullYear(),
            "publisher": {
              "@type": "Person",
              "name": "Brett Sanders"
            }
          })}
        </script>
      </Helmet>
      
      <main className="bg-gray-50 dark:bg-gray-900">
        {/* Above-the-fold content loads immediately */}
        <Summary />
        <Skills />
        
        {/* Below-the-fold content with performance optimization */}
        <div className="below-fold-section">
          <Suspense fallback={<ComponentLoader message="Loading certifications..." />}>
            <Certifications />
          </Suspense>
          <Suspense fallback={<ComponentLoader message="Loading experience..." />}>
            <Experience />
          </Suspense>
        </div>
      </main>
    </>
  );
} 