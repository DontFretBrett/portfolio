import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getAIProjectBySlug } from '../data/aiProjects';
import { formatDate } from '../utils/blog';

export default function AIProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getAIProjectBySlug(slug) : null;

  useEffect(() => {
    // Load Gradio script if embed code is present
    if (project?.embedCode && project.embedCode.includes('gradio')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://gradio.s3-us-west-2.amazonaws.com/5.34.2/gradio.js';
      document.head.appendChild(script);

      return () => {
        // Cleanup script when component unmounts
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [project?.embedCode]);
  
  if (!slug) {
    return <Navigate to="/ai-projects" replace />;
  }

  if (!project) {
    return <Navigate to="/ai-projects" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - AI Projects - Brett Sanders</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.tags?.join(', ')} />
        
        <meta property="og:title" content={`${project.title} - Brett Sanders`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="article" />
        
        <link rel="canonical" href={`https://www.brettsanders.com/ai-projects/${project.slug}`} />
      </Helmet>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link 
          to="/ai-projects"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to AI Projects
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <header className="p-4 md:p-8 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-4">
              <Calendar size={20} className="mr-2" />
              <time dateTime={project.date}>
                {formatDate(project.date)}
              </time>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {project.description}
            </p>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            
          </header>

          {/* Embedded Application */}
          {project.embedCode && (
            <section className="p-4 md:p-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Interactive Demo</h2>
              <div className="w-full bg-gray-50 rounded-lg p-2 md:p-4">
                <div className="w-full flex justify-center">
                  <div 
                    className="w-full max-w-full [&>iframe]:w-full [&>iframe]:max-w-full [&>iframe]:h-auto [&>iframe]:min-h-[600px] md:[&>iframe]:min-h-[900px]"
                    dangerouslySetInnerHTML={{ __html: project.embedCode }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">
                🚀 Live demo powered by Hugging Face Spaces
              </p>
            </section>
          )}

                               {/* Project Content */}
          <section className="p-4 md:p-8">
             <div className="prose prose-lg prose-gray max-w-none">
               <ReactMarkdown
                 remarkPlugins={[remarkGfm]}
                 rehypePlugins={[rehypeHighlight, rehypeRaw]}
                 components={{
                   h1: ({ children }) => (
                     <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                       {children}
                     </h1>
                   ),
                   h2: ({ children }) => (
                     <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                       {children}
                     </h2>
                   ),
                   h3: ({ children }) => (
                     <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                       {children}
                     </h3>
                   ),
                   h4: ({ children }) => (
                     <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                       {children}
                     </h4>
                   ),
                   p: ({ children }) => (
                     <p className="text-gray-700 leading-relaxed mb-4">
                       {children}
                     </p>
                   ),
                   ul: ({ children }) => (
                     <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                       {children}
                     </ul>
                   ),
                   ol: ({ children }) => (
                     <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                       {children}
                     </ol>
                   ),
                   li: ({ children }) => (
                     <li className="text-gray-700">{children}</li>
                   ),
                   blockquote: ({ children }) => (
                     <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
                       {children}
                     </blockquote>
                   ),
                   code: ({ children, ...props }) => {
                     const inline = !props.className;
                     return inline ? (
                       <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm">
                         {children}
                       </code>
                     ) : (
                       <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto max-w-full">
                         {children}
                       </code>
                     );
                   },
                   pre: ({ children }) => (
                     <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 max-w-full">
                       {children}
                     </pre>
                   ),
                   a: ({ href, children }) => (
                     <a
                       href={href}
                       className="text-blue-600 hover:text-blue-800 underline"
                       target="_blank"
                       rel="noopener noreferrer"
                     >
                       {children}
                     </a>
                   ),
                   strong: ({ children }) => (
                     <strong className="font-semibold text-gray-900">{children}</strong>
                   ),
                   em: ({ children }) => (
                     <em className="italic text-gray-700">{children}</em>
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