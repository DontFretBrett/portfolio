import { motion } from 'framer-motion';

export default function Skills() {
  const skillCategories = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      ),
      title: 'Database Technologies',
      skills: 'SQL Server, SQL, SSMS, SSRS, ETL, Entity Framework, ADO.NET, AWS RDS, DynamoDB',
      itemProp: 'knowsAbout'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
          <line x1="6" x2="6" y1="6" y2="6"/>
          <line x1="6" x2="6" y1="18" y2="18"/>
        </svg>
      ),
      title: 'Server-Side Development',
      skills: 'Node.js, Express, C# .NET (Framework/Core), ASP.NET, MVC, Microservices, SOA, IIS, RESTful APIs, PowerShell, Gulp',
      itemProp: 'knowsAbout'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
      ),
      title: 'Front-End Development',
      skills: 'React, Vite, Angular 6-17, Angular Forms Reactive/Template-Driven, SPA, JavaScript, TypeScript, CSS/SASS Grid/Flexbox, CSS Variables, HTML, Foundation/Bootstrap CSS, Media Queries, Responsiveness, Razor syntax',
      itemProp: 'knowsAbout'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Development Tools',
      skills: 'Visual Studio, VS Code, TeamCity CI, Octopus CD, Postman, Artifactory, Proget, TFS/Git, GitHub, Azure DevOps, npm, nuget, TS Lint, Miro, Figma, Invision, AirTable, Slack, Teams, Discord, Confluence, Discourse',
      itemProp: 'knowsAbout'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
          <path d="M14.5 6A2.5 2.5 0 0 1 17 8.5c0 .38-.07.74-.22 1.07a3 3 0 0 1 .95 5.53 2.5 2.5 0 0 1-1.32 4.24 2.5 2.5 0 0 1-1.98 3A2.5 2.5 0 0 1 12 19.5V8.5A2.5 2.5 0 0 1 14.5 6Z"/>
        </svg>
      ),
      title: 'AI Agents & Automation',
      skills: 'OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, Model Context Protocol (MCP), FastMCP, Gradio, Python async programming, Multi-agent systems, Agent workflows, Protocol design, AI automation, Anthropic Claude, OpenAI GPT, Prompt engineering',
      itemProp: 'knowsAbout'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
        </svg>
      ),
      title: 'Cloud & Deployment',
      skills: 'AWS Console, IAM, S3, EC2, EBS, Lambda, Azure VM, SQL, App Services, Storage, Virtual Network, SSL, Hugging Face Spaces, Docker, CI/CD pipelines, Infrastructure as Code, Vercel, Terraform',
      itemProp: 'knowsAbout'
    }
  ];

  return (
    <motion.section 
      id="skills"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="py-16 bg-gray-50 dark:bg-gray-900"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-gray-100">Technical Skills & Expertise</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-200 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-blue-600 dark:text-blue-400" aria-hidden="true">
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{category.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed" itemProp={category.itemProp}>
                {category.skills}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}