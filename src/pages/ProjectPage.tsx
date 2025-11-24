import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Tag, ArrowLeft, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getProjectBySlug } from '../data/aiProjects';
import { formatDate } from '../utils/blog';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : null;

  if (!slug) {
    return <Navigate to="/projects" replace />;
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Projects - Brett Sanders</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.tags?.join(', ')} />
        
        <meta property="og:title" content={`${project.title} - Brett Sanders`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="article" />
        
        <link rel="canonical" href={`https://www.brettsanders.com/projects/${project.slug}`} />
      </Helmet>

      <main className="container mx-auto px-4 py-8 max-w-6xl dark:bg-gray-900 min-h-screen">
        <Breadcrumbs 
          items={[
            { label: 'Projects', href: '/projects' },
            { label: project.title, isLast: true }
          ]}
          className="mb-6"
        />

        <Link 
          to="/projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <header className="p-4 md:p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {project.title}
              </h1>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 ml-4"
                >
                  Visit Live Site
                  <ExternalLink size={16} className="ml-2" />
                </a>
              )}
            </div>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
              <Calendar size={20} className="mr-2" />
              <time dateTime={project.date}>
                {formatDate(project.date)}
              </time>
            </div>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {project.description}
            </p>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Informational Note */}
          {project.slug === 'ai-image-validator' && (
            <div className="p-4 md:p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 dark:text-yellow-200">
                      This demo has been temporarily disabled to save on usage costs. Please contact me if you'd like to see it!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Embedded Application */}
          {project.embedCode && (
            <section className="p-4 md:p-8 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Interactive Demo</h2>
              <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg p-2 md:p-4">
                <div className="w-full flex justify-center">
                  <div 
                    className="w-full max-w-full [&>iframe]:w-full [&>iframe]:max-w-full [&>iframe]:h-auto [&>iframe]:min-h-[600px] md:[&>iframe]:min-h-[900px]"
                    dangerouslySetInnerHTML={{ __html: project.embedCode }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                  🚀 Live demo powered by Hugging Face Spaces
                </p>
              </div>
            </section>
          )}

          {/* Project Content */}
          <section className="p-4 md:p-8">
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700 dark:text-gray-300">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 italic text-gray-600 dark:text-gray-400 my-6">
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm border border-gray-200 dark:border-gray-700">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <div className="bg-white dark:bg-gray-950 p-4 rounded-lg overflow-x-auto max-w-full border border-gray-200 dark:border-gray-700">
                      <code className={className}>{children}</code>
                    </div>
                  );
                },
                pre: ({ children }) => (
                  <div className="bg-white dark:bg-gray-950 rounded-lg overflow-x-auto mb-6 max-w-full border border-gray-200 dark:border-gray-700">
                    <pre className="p-4 text-sm">{children}</pre>
                  </div>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
                ),
              }}
              >
                {project.content}
              </ReactMarkdown>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

