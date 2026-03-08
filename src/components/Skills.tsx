import { motion } from 'framer-motion';
import { Database, Server, Globe, Wrench, Bot, Cpu, Cloud, LucideIcon } from 'lucide-react';

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 flex-shrink-0" aria-hidden="true">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-linear-to-r from-purple-500/30 to-transparent ml-2" />
    </div>
  );
}

const colorMap: Record<string, { border: string; icon: string; tag: string }> = {
  blue:   { border: 'border-blue-500/30',   icon: 'text-blue-400',   tag: 'bg-blue-500/20   text-blue-300   border border-blue-500/30' },
  green:  { border: 'border-green-500/30',  icon: 'text-green-400',  tag: 'bg-green-500/20  text-green-300  border border-green-500/30' },
  cyan:   { border: 'border-cyan-500/30',   icon: 'text-cyan-400',   tag: 'bg-cyan-500/20   text-cyan-300   border border-cyan-500/30' },
  orange: { border: 'border-orange-500/30', icon: 'text-orange-400', tag: 'bg-orange-500/20 text-orange-300 border border-orange-500/30' },
  purple: { border: 'border-purple-500/30', icon: 'text-purple-400', tag: 'bg-purple-500/20 text-purple-300 border border-purple-500/30' },
  pink:   { border: 'border-pink-500/30',   icon: 'text-pink-400',   tag: 'bg-pink-500/20   text-pink-300   border border-pink-500/30' },
};

interface SkillCategory {
  icon: LucideIcon;
  title: string;
  color: string;
  skills: string[];
  itemProp: string;
}

const skillCategories: SkillCategory[] = [
  {
    icon: Database,
    title: 'Database Technologies',
    color: 'blue',
    skills: ['SQL Server', 'SQL', 'SSMS', 'SSRS', 'ETL', 'Entity Framework', 'ADO.NET', 'AWS RDS', 'DynamoDB'],
    itemProp: 'knowsAbout',
  },
  {
    icon: Server,
    title: 'Server-Side Development',
    color: 'green',
    skills: ['Node.js', 'Express', 'C# .NET', 'ASP.NET', 'MVC', 'Microservices', 'SOA', 'IIS', 'RESTful APIs', 'PowerShell', 'Gulp'],
    itemProp: 'knowsAbout',
  },
  {
    icon: Globe,
    title: 'Front-End Development',
    color: 'cyan',
    skills: ['React', 'Vite', 'Angular', 'SPA', 'JavaScript', 'TypeScript', 'CSS/SASS', 'Flexbox', 'CSS Grid', 'HTML', 'Bootstrap', 'Razor'],
    itemProp: 'knowsAbout',
  },
  {
    icon: Wrench,
    title: 'Development Tools',
    color: 'orange',
    skills: ['VS Code', 'Visual Studio', 'TeamCity CI', 'Octopus CD', 'Postman', 'Git', 'GitHub', 'Azure DevOps', 'Figma', 'Miro', 'Confluence'],
    itemProp: 'knowsAbout',
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    color: 'purple',
    skills: ['OpenAI Agents SDK', 'CrewAI', 'LangGraph', 'AutoGen', 'MCP', 'OpenClaw', 'Claude', 'GPT', 'Gemini', 'Prompt Engineering', 'RAG', 'Multi-agent Systems'],
    itemProp: 'knowsAbout',
  },
  {
    icon: Cpu,
    title: 'AI Development Tools',
    color: 'pink',
    skills: ['Cursor IDE', 'Windsurf IDE', 'Claude Code', 'Codex CLI', 'GitHub Copilot', 'FastMCP', 'Python AsyncIO', 'WebSockets', 'Gradio', 'SQLite'],
    itemProp: 'knowsAbout',
  },
  {
    icon: Cloud,
    title: 'Cloud & Deployment',
    color: 'blue',
    skills: ['AWS', 'IAM', 'S3', 'EC2', 'Lambda', 'Azure', 'Docker', 'CI/CD', 'Terraform', 'Vercel', 'Infrastructure as Code'],
    itemProp: 'knowsAbout',
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-16 bg-gray-950"
      style={{ contentVisibility: 'auto' }}
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader icon={<Globe size={20} />} title="Technical Skills & Expertise" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const c = colorMap[category.color] ?? colorMap.blue;
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className={`bg-gray-900 rounded-2xl p-6 border ${c.border} hover:border-opacity-60 transition-all duration-200`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={c.icon} aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-base font-semibold text-white">{category.title}</h3>
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  itemProp={category.itemProp}
                  aria-label={`${category.title} skills`}
                >
                  {category.skills.map((skill) => (
                    <span key={skill} className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.tag}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
