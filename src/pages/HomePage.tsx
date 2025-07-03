import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Summary from '../components/Summary';
import Skills from '../components/Skills';

// Lazy load larger components
const Experience = lazy(() => import('../components/Experience'));
const Certifications = lazy(() => import('../components/Certifications'));

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Brett Sanders - Engineering Leader & Full Stack Software Engineer</title>
        <meta name="description" content="Brett Sanders - Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership. Based in San Diego." />
        <meta name="keywords" content="Software Engineering Director, Full Stack Developer, AWS Certified, SAFe Agile, San Diego, Technology Leader, Node.js, React, TypeScript, AI Engineering" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Brett Sanders - Engineering Leader & Full Stack Software Engineer" />
        <meta property="og:description" content="Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.brettsanders.com" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brett Sanders - Engineering Leader & Full Stack Software Engineer" />
        <meta name="twitter:description" content="Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership." />
        
        <link rel="canonical" href="https://www.brettsanders.com" />
        
        {/* Structured Data for Person */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Brett Sanders",
            "jobTitle": "Software Engineering Director",
            "description": "Technology leader with 15+ years of experience in financial sector. Expertise in full stack development, AWS, and team leadership.",
            "url": "https://www.brettsanders.com",
            "image": "https://www.brettsanders.com/me.jpeg",
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
              "AI Engineering"
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
            }
          })}
        </script>
      </Helmet>
      
      <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Summary />
        <Skills />
        <Suspense fallback={
          <div className="p-16 text-center bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        }>
          <Certifications />
          <Experience />
        </Suspense>
      </main>
    </>
  );
} 