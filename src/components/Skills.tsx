import { motion } from 'framer-motion';
import { Database, Server, Layout, Wrench, Cloud } from 'lucide-react';

const skillCategories = [
  {
    icon: <Database />,
    title: 'Database',
    skills: 'SQL Server, SQL, SSMS, SSRS, ETL, Entity Framework, ADO.NET, AWS RDS, DynamoDB'
  },
  {
    icon: <Server />,
    title: 'Server Side',
    skills: 'Node, Express, C# .NET (Framework/Core), ASP.NET, MVC, Microservices, SOA, IIS, RESTful APIs, PowerShell, Gulp'
  },
  {
    icon: <Layout />,
    title: 'Client Side',
    skills: 'React, Vite, Angular 6-17, Angular Forms Reactive/Template-Driven, SPA, JavaScript, TypeScript, CSS/SASS Grid/Flexbox, CSS Variables, HTML, Foundation/Bootstrap CSS, Media Queries, Responsiveness, Razor syntax'
  },
  {
    icon: <Wrench />,
    title: 'Tools',
    skills: 'Visual Studio, VS Code, TeamCity CI, Octopus CD, Postman, Artifactory, Proget, TFS/Git, GitHub, Azure DevOps, npm, nuget, TS Lint, Miro, Figma, Invision, AirTable, Slack, Teams, Discord, Confluence, Discourse'
  },
  {
    icon: <Cloud />,
    title: 'Cloud & AI',
    skills: 'AWS Console, IAM, S3, EC2, EBS, Lambda, Azure VM, SQL, App Services, Storage, Virtual Network, SSL, OpenAI ChatGPT APIs, Microsoft Copilot, Google Gemini, Anthropic Claude, Cursor IDE, Midjourney, Prompt engineering'
  }
];

export default function Skills() {
  return (
    <motion.section 
      id="skills"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="py-16 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-blue-600">{category.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{category.skills}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}