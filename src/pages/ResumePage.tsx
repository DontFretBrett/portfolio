import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Brain,
  ExternalLink,
  Award,
  Calendar
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ResumePage() {
  return (
    <>
      <Helmet>
        <title>Resume - Brett Sanders</title>
        <meta name="description" content="Professional resume of Brett Sanders - Software Engineering Director, AI/ML Practitioner, and Full Stack Developer with 13+ years of experience." />
        <meta name="keywords" content="Resume, Software Engineer, AI, Machine Learning, Full Stack, TypeScript, React, Python" />
        
        <meta property="og:title" content="Resume - Brett Sanders" />
        <meta property="og:description" content="Professional resume of Brett Sanders - Software Engineering Director and AI Practitioner." />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href="https://www.brettsanders.com/resume" />
      </Helmet>

      <main className="container mx-auto px-4 py-8 max-w-5xl dark:bg-gray-900 min-h-screen">
        <Breadcrumbs 
          items={[
            { label: 'Resume', isLast: true }
          ]}
          className="mb-6"
        />
        
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Brett Sanders
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Software Engineering Director | AI/ML Practitioner
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="https://linkedin.com/in/imbrett/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ExternalLink size={14} className="mr-1" />
              LinkedIn
            </a>
            <a href="https://github.com/DontFretBrett" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ExternalLink size={14} className="mr-1" />
              GitHub
            </a>
            <a href="https://www.brettsanders.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ExternalLink size={14} className="mr-1" />
              Portfolio
            </a>
            <a href="https://x.com/wontfretbrett" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <ExternalLink size={14} className="mr-1" />
              X/Twitter
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
              <Briefcase className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
              Professional Summary
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Award-winning technology leader with 13+ years driving software engineering excellence in financial services. 
              Deep expertise in full-stack development, cloud architecture, and emerging AI/ML technologies. Currently building 
              autonomous AI agents, multi-model trading systems, and production AI assistants. Proven ability to lead cross-functional 
              teams, delivering high-impact projects on time and under budget. Passionate about leveraging AI to transform business 
              operations, building maintainable systems, and fostering team growth.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">SAFe Agile Certified</span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">AWS Certified</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">Full Stack Engineer</span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">AI/ML Practitioner</span>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
              <Code2 className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
              Technical Skills
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                  <Brain className="mr-2 text-purple-600 dark:text-purple-400" size={18} />
                  AI & Machine Learning
                </h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>LLM Integration (OpenAI, Anthropic Claude, Google Gemini)</li>
                  <li>AI Agents (OpenAI Agents SDK, CrewAI, LangGraph, AutoGen)</li>
                  <li>Model Context Protocol (MCP)</li>
                  <li>RAG Systems & Vector Databases</li>
                  <li>Prompt Engineering</li>
                  <li>Hugging Face Ecosystem</li>
                  <li>Autonomous Trading Algorithms</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Languages & Frameworks</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>TypeScript, JavaScript, Python, C# .NET</li>
                  <li>React, Angular, Node.js</li>
                  <li>ASP.NET MVC, RESTful APIs</li>
                  <li>SQL Server, PostgreSQL, SQLite</li>
                  <li>AWS, Azure, Vercel, Docker</li>
                  <li>CI/CD (TeamCity, Octopus, GitHub Actions)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">AI Development Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['Cursor IDE', 'Windsurf IDE', 'Claude Code', 'OpenClaw', 'Codex CLI', 'VS Code + AI'].map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
              <Award className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
              Featured AI & ML Projects
            </h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">J5-Trade: Autonomous Multi-Model Crypto Trading Platform</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Personal Project | 2024-Present | Python, SQLite, TypeScript, Bun</p>
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  Built a production-grade autonomous cryptocurrency trading system for BTC-USD on Coinbase Advanced Trade.
                  Architected 3 independent AI-driven trading models with distinct strategies. Developed signal resolver 
                  with veto hierarchy and comprehensive risk management. Created real-time monitoring dashboard.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Python asyncio', 'SQLite', 'WebSockets', 'REST APIs', 'TypeScript', 'Bun'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">OpenClaw AI Assistant (Johnny5)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Personal Project | 2024-Present | Node.js, TypeScript</p>
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  Configured and extended a 24/7 autonomous AI assistant with multi-channel communication. 
                  Developed custom skills for weather, GitHub automation, Google Workspace, Slack, and iMessage. 
                  Implemented persistent memory system with Qdrant vector database.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'TypeScript', 'Telegram API', 'Discord API', 'Qdrant'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Agentic Engineering Certification</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Ed Donner's Master AI Agentic Engineering Course | 2024</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Completed intensive 6-week course building autonomous AI agents across multiple frameworks: 
                  OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and MCP (Model Context Protocol).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
              <Briefcase className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
              Professional Experience
            </h2>
            
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Truist Bank</h3>
                  <p className="text-gray-600 dark:text-gray-400">Software Engineering Director</p>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0">
                  <Calendar size={14} className="mr-2" />
                  June 2016 - Present
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="font-medium">Leading 4 delivery teams (20 direct reports) for 24/7 operation of LightStream division.</p>
                
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Saved ~$2 million</strong> finding a secure solution for deprecated web framework</li>
                  <li><strong>Launched State Farm partnership</strong> driving $74.3M+ in funded loans (Angular SPA, .NET, AWS)</li>
                  <li><strong>Achieved 100% ADA compliance</strong> using NVDA, Jaws, VoiceOver, Deque Axe DevTools</li>
                  <li><strong>Led divisional rebrand:</strong> 250+ pages, 50+ email templates migrated to Truist branding</li>
                  <li><strong>Maintained 99.9% uptime</strong> for customer-facing web experiences</li>
                  <li>Implemented security scanning pipeline (Veracode, Burp, Qualys) with CI/CD integration</li>
                  <li>Truist Cyber Security Champion member</li>
                </ul>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Areas of Ownership:</h4>
                  <p className="text-sm">Public website, analytics, accessibility, customer portal, authentication, loan applications, teammate sites, partner API integrations, customer correspondence, lending platform, web CMS.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
              <GraduationCap className="mr-3 text-blue-600 dark:text-blue-400" size={24} />
              Education & Certifications
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">California State University - San Marcos</h3>
                <p className="text-gray-700 dark:text-gray-300">Bachelor of Science in Computer Science</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Certifications</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                  <li>AWS Certified Cloud Practitioner</li>
                  <li>SAFe Agile Certified</li>
                  <li>AI Agentic Engineering (Ed Donner's Master Course)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p>
            Full resume available upon request. 
            <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
              Get in touch →
            </Link>
          </p>
        </footer>
      </main>
    </>
  );
}
