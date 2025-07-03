import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Tag } from 'lucide-react';
import { getAllAIProjects } from '../data/aiProjects';
import { formatDate } from '../utils/blog';

export default function AIProjectsPage() {
  const projects = getAllAIProjects();

  return (
    <>
      <Helmet>
        <title>AI Projects - Brett Sanders</title>
        <meta name="description" content="Explore Brett Sanders' AI projects including MCP implementations, AI agents, and innovative applications using cutting-edge AI technologies." />
        <meta name="keywords" content="AI Projects, Model Context Protocol, MCP, AI Agents, Machine Learning, Python, Gradio, Hugging Face" />
        
        <meta property="og:title" content="AI Projects - Brett Sanders" />
        <meta property="og:description" content="Explore AI projects and experiments by Brett Sanders, featuring MCP implementations and innovative AI applications." />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href="https://www.brettsanders.com/ai-projects" />
      </Helmet>

      <main className="container mx-auto px-4 py-8 max-w-4xl dark:bg-gray-900 min-h-screen transition-colors duration-200">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-200">AI Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200">
            Exploring the frontiers of artificial intelligence through hands-on projects, protocol implementations, and innovative applications.
          </p>
        </header>

        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Link to={`/ai-projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3 transition-colors duration-200">
                      <Calendar size={16} className="mr-2" />
                      <time dateTime={project.date}>
                        {formatDate(project.date)}
                      </time>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-200">
                  {project.excerpt}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors duration-200"
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-start">
                  <Link
                    to={`/ai-projects/${project.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                  >
                    View Project
                    <ExternalLink size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-200">No projects available yet. Check back soon!</p>
          </div>
        )}
      </main>
    </>
  );
} 