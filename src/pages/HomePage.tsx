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
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "name": "AWS Certified Solutions Architect",
                "credentialCategory": "Professional Certification"
              },
              {
                "@type": "EducationalOccupationalCredential", 
                "name": "SAFe Certified Agile Framework Practitioner",
                "credentialCategory": "Professional Certification"
              }
            ],
            "award": [
              "Technology Leadership Excellence",
              "Full Stack Development Expertise",
              "AI Engineering Innovation"
            ]
          })}
        </script>
        
        {/* FAQ Schema for AI Overview Optimization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Brett Sanders' expertise in software engineering?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Brett Sanders is a Software Engineering Director with 15+ years of experience in the financial sector. He specializes in full stack development, AWS cloud services, team leadership, and cutting-edge AI engineering including AI agents, Model Context Protocol (MCP), and frameworks like AutoGen, LangGraph, and CrewAI."
                }
              },
              {
                "@type": "Question",
                "name": "What AI technologies does Brett Sanders work with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Brett Sanders works with advanced AI frameworks including OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and Anthropic's Model Context Protocol (MCP). He builds AI agents and autonomous systems, combining machine learning with practical software engineering to create production-ready AI applications."
                }
              },
              {
                "@type": "Question",
                "name": "What programming languages and technologies does Brett Sanders use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Brett Sanders is proficient in a wide range of technologies including SQL Server, Node.js, C# .NET, Angular, React, TypeScript, Python, AWS and Azure cloud services, and modern AI frameworks. He focuses on building maintainable, scalable systems with emphasis on performance and reliability."
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
            ]
          })}
        </script>
      </Helmet>
      
      <main className="bg-gray-50 dark:bg-gray-900">
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