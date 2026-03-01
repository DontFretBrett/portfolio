import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Briefcase,
  Code2,
  Brain,
  ExternalLink,
  Award,
  MapPin,
  Github,
  Linkedin,
  TrendingUp,
  Shield,
  Zap,
  Users,
  DollarSign,
  Activity,
  Star,
  ChevronRight,
  Terminal,
  Cloud,
  Database,
  Globe,
  Cpu,
  BookOpen,
  Play,
  Sparkles,
  X,
  ZoomIn,
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.8,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  useEffect(() => {
    spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest).toLocaleString() + suffix;
      }
    });
  }, [spring, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { icon: <TrendingUp size={22} />, value: 15, suffix: '+', label: 'Years Experience', color: 'from-blue-500 to-cyan-500' },
  { icon: <Users size={22} />, value: 20, suffix: '', label: 'Direct Reports', color: 'from-purple-500 to-pink-500' },
  { icon: <DollarSign size={22} />, value: 2, prefix: '$', suffix: 'M Saved', label: 'Cost Savings Delivered', color: 'from-green-500 to-emerald-500' },
  { icon: <Activity size={22} />, value: 99, suffix: '.9%', label: 'Uptime Maintained', color: 'from-orange-500 to-red-500' },
];

const timeline = [
  {
    period: 'Oct 2022 – Present',
    title: 'Software Engineering Director',
    company: 'Truist Bank (LightStream)',
    location: 'Remote / San Diego, CA',
    color: 'blue',
    highlights: [
      'Lead 4 delivery teams (20 direct reports) for 24/7 lending platform operations',
      'Saved ~$2M finding secure solution for deprecated web framework',
      'Launched State Farm partnership driving $74.3M+ in funded loans',
      'Achieved 100% ADA compliance (NVDA, Jaws, VoiceOver)',
      'Maintained 99.9% uptime for all customer-facing web experiences',
      'Led divisional rebrand: 250+ pages, 50+ email templates',
    ],
    tags: ['Leadership', 'Architecture', 'Angular', '.NET', 'AWS'],
  },
  {
    period: 'Nov 2020 – Oct 2022',
    title: 'Solutions Architect',
    company: 'Truist Bank (LightStream)',
    location: 'Remote',
    color: 'purple',
    highlights: [
      'Architected microservice-based distributed systems',
      'Built analytics infrastructure and comprehensive technical docs',
      'Led strategic technical initiatives across multiple teams',
    ],
    tags: ['Microservices', 'AWS', 'Architecture', 'CI/CD'],
  },
  {
    period: 'Sept 2019 – Nov 2020',
    title: 'Application Development Manager',
    company: 'Truist Bank (LightStream)',
    location: 'San Diego, CA',
    color: 'cyan',
    highlights: [
      'Led development of platform features improving conversion rates',
      'Modernized dev practices and implemented security improvements',
      'Managed full-stack delivery team end-to-end',
    ],
    tags: ['Team Lead', 'Angular', 'C# .NET', 'Security'],
  },
  {
    period: 'June 2016 – Sept 2019',
    title: 'Sr. Software Engineer – Team Lead',
    company: 'SunTrust Bank (LightStream)',
    location: 'San Diego, CA',
    color: 'green',
    highlights: [
      'Spearheaded complete website rebuild with modern CMS',
      'Established component libraries and accessibility standards',
      'Optimized frontend performance across lending platform',
    ],
    tags: ['React', 'Angular', 'CMS', 'Accessibility'],
  },
  {
    period: 'Nov 2011 – June 2016',
    title: 'Senior Software Engineer',
    company: 'US Bank – SBA Division',
    location: 'San Diego, CA',
    color: 'yellow',
    highlights: [
      'Developed and maintained lending platforms using .NET',
      'Implemented database migrations and automated reporting',
      'Significantly reduced operational costs through automation',
    ],
    tags: ['C# .NET', 'SQL Server', 'SSRS', 'ASP.NET'],
  },
  {
    period: 'June 2008 – Oct 2011',
    title: 'Programmer Analyst – Process Improvement',
    company: 'US Bank – Manufactured Housing Finance',
    location: 'San Diego, CA',
    color: 'pink',
    highlights: [
      'Implemented automation solutions enhancing operational efficiency',
      'Contributed to record-breaking performance metrics',
      'Built process improvement tools from the ground up',
    ],
    tags: ['Automation', 'SQL', '.NET', 'Process Improvement'],
  },
];

const skillGroups = [
  {
    icon: <Brain size={20} />,
    label: 'AI & Agents',
    color: 'purple',
    skills: ['OpenAI Agents SDK', 'CrewAI', 'LangGraph', 'AutoGen', 'MCP', 'Claude API', 'GPT-4', 'Gemini', 'RAG Systems', 'Prompt Engineering'],
  },
  {
    icon: <Globe size={20} />,
    label: 'Frontend',
    color: 'blue',
    skills: ['React 19', 'TypeScript', 'Angular 6–17', 'Vite', 'Tailwind CSS', 'Framer Motion', 'HTML5/CSS3', 'Accessibility'],
  },
  {
    icon: <Terminal size={20} />,
    label: 'Backend',
    color: 'green',
    skills: ['Node.js', 'Python', 'C# .NET', 'ASP.NET MVC', 'Express', 'RESTful APIs', 'Microservices', 'WebSockets'],
  },
  {
    icon: <Cloud size={20} />,
    label: 'Cloud & DevOps',
    color: 'cyan',
    skills: ['AWS (IAM, S3, EC2, Lambda, RDS)', 'Azure', 'Docker', 'Vercel', 'TeamCity', 'Octopus CD', 'GitHub Actions', 'Terraform'],
  },
  {
    icon: <Database size={20} />,
    label: 'Data',
    color: 'orange',
    skills: ['SQL Server', 'PostgreSQL', 'SQLite', 'DynamoDB', 'Qdrant (Vector DB)', 'ETL', 'SSRS', 'Entity Framework'],
  },
  {
    icon: <Cpu size={20} />,
    label: 'AI Dev Tools',
    color: 'pink',
    skills: ['Cursor IDE', 'Claude Code', 'Codex CLI', 'Hugging Face', 'Gradio', 'Python asyncio', 'OpenClaw', 'Windsurf'],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string; tag: string }> = {
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500',   text: 'text-blue-400',   dot: 'bg-blue-500',   tag: 'bg-blue-500/20 text-blue-300' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500', text: 'text-purple-400', dot: 'bg-purple-500', tag: 'bg-purple-500/20 text-purple-300' },
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500',   text: 'text-cyan-400',   dot: 'bg-cyan-500',   tag: 'bg-cyan-500/20 text-cyan-300' },
  green:  { bg: 'bg-green-500/10',  border: 'border-green-500',  text: 'text-green-400',  dot: 'bg-green-500',  tag: 'bg-green-500/20 text-green-300' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-400', dot: 'bg-yellow-500', tag: 'bg-yellow-500/20 text-yellow-300' },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500',   text: 'text-pink-400',   dot: 'bg-pink-500',   tag: 'bg-pink-500/20 text-pink-300' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500', text: 'text-orange-400', dot: 'bg-orange-500', tag: 'bg-orange-500/20 text-orange-300' },
};

const skillColorMap: Record<string, string> = {
  purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  blue:   'bg-blue-500/20   text-blue-300   border border-blue-500/30',
  green:  'bg-green-500/20  text-green-300  border border-green-500/30',
  cyan:   'bg-cyan-500/20   text-cyan-300   border border-cyan-500/30',
  orange: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  pink:   'bg-pink-500/20   text-pink-300   border border-pink-500/30',
};

const certifications = [
  { year: '2025', title: 'The Complete Agentic AI Engineering Course', org: 'Udemy / Ed Donner', icon: <Brain size={16} />, color: 'purple', url: 'https://www.udemy.com/certificate/UC-816bd9d7-4ad1-4bef-b670-782fabc9ec94/' },
  { year: '2023', title: 'AWS Certified Cloud Practitioner', org: 'Amazon Web Services', icon: <Cloud size={16} />, color: 'orange' },
  { year: '2023', title: 'AWS Technical Essentials', org: 'Amazon Web Services', icon: <Cloud size={16} />, color: 'orange' },
  { year: '2023', title: 'Developing on AWS', org: 'Amazon Web Services', icon: <Cloud size={16} />, color: 'orange' },
  { year: '2023', title: 'Advanced Developing on AWS', org: 'Amazon Web Services', icon: <Cloud size={16} />, color: 'orange' },
  { year: '2023', title: 'Architecting on AWS', org: 'Amazon Web Services', icon: <Cloud size={16} />, color: 'orange' },
  { year: '2023', title: 'Developing Serverless on AWS', org: 'Amazon Web Services', icon: <Cloud size={16} />, color: 'orange' },
  { year: '2021', title: 'Certified SAFe 5 Practitioner', org: 'Scaled Agile Inc.', icon: <Shield size={16} />, color: 'green' },
  { year: '2021', title: 'Accessibility for Web Design', org: 'LinkedIn Learning', icon: <Star size={16} />, color: 'blue' },
];

const projects = [
  {
    title: 'J5-Trade',
    subtitle: 'Autonomous Multi-Model Crypto Trading Platform',
    period: '2024–Present',
    color: 'blue',
    description: 'Production-grade autonomous cryptocurrency trading system for BTC-USD on Coinbase Advanced Trade with 3 independent AI-driven trading models, signal resolver with veto hierarchy, and real-time monitoring dashboard.',
    tags: ['Python asyncio', 'SQLite', 'WebSockets', 'TypeScript', 'Bun'],
    icon: <TrendingUp size={20} />,
  },
  {
    title: 'OpenClaw (Johnny5)',
    subtitle: '24/7 Autonomous AI Personal Assistant',
    period: '2024–Present',
    color: 'purple',
    description: 'Configured and extended a personal AI assistant with multi-channel communication (Telegram, Discord, iMessage). Developed custom skills for GitHub automation, Google Workspace, Slack. Persistent memory with Qdrant vector DB.',
    tags: ['Node.js', 'TypeScript', 'Qdrant', 'Telegram API', 'Discord API'],
    icon: <Brain size={20} />,
  },
  {
    title: 'MCP Random Dog',
    subtitle: 'Model Context Protocol Integration',
    period: '2025',
    color: 'green',
    description: 'Built a FastMCP server to demonstrate Model Context Protocol integrations, showcasing how AI agents can interact with external APIs in real-time through standardized tool interfaces.',
    tags: ['Python', 'FastMCP', 'Anthropic MCP', 'REST APIs'],
    icon: <Zap size={20} />,
  },
];

const courseWeeks = [
  {
    label: 'Foundations',
    color: 'blue',
    icon: <Terminal size={14} />,
    projects: [
      {
        title: 'Career Conversation Agent',
        description: 'Personal AI agent that answers questions about my career, skills, and experience using my LinkedIn profile and bio as context. Built with OpenAI + Gradio and deployed to Hugging Face Spaces.',
        tags: ['OpenAI', 'Gradio', 'Python', 'Hugging Face'],
      },
      {
        title: 'Multi-Tool Agent Labs',
        description: 'Built progressively complex agents: function calling, tool use, multi-step reasoning, and structured outputs. Explored tracing and observability.',
        tags: ['OpenAI API', 'Tool Calling', 'Tracing'],
      },
    ],
  },
  {
    label: 'OpenAI Agents SDK',
    color: 'cyan',
    icon: <Zap size={14} />,
    projects: [
      {
        title: 'Deep Research Agent',
        description: 'Multi-agent research pipeline: Planner breaks down queries, Search Agents retrieve web data, Research Manager synthesises findings, Writer Agent produces a polished report. Full OpenAI Agents SDK handoff pattern.',
        tags: ['OpenAI Agents SDK', 'WebSearchTool', 'Handoffs', 'Multi-agent'],
      },
      {
        title: 'Email Notification Agent',
        description: 'Autonomous agent that monitors tasks and fires push notifications via Pushover when key events occur. Demonstrates tool-calling with side effects.',
        tags: ['OpenAI SDK', 'Pushover API', 'Async Python'],
      },
      {
        title: 'Multi-Model Router',
        description: 'Explored routing requests across GPT-4o, GPT-4o-mini, DeepSeek, and Ollama local models — with tracing via OpenAI Dashboard.',
        tags: ['Multi-model', 'Routing', 'Ollama', 'DeepSeek'],
      },
    ],
  },
  {
    label: 'CrewAI',
    color: 'purple',
    icon: <Users size={14} />,
    projects: [
      {
        title: 'Engineering Team Crew',
        description: 'Simulated a full software engineering team — Product Manager, Architect, Developer, and QA Engineer agents collaborating to design and spec a feature end-to-end.',
        tags: ['CrewAI', 'Role-based Agents', 'Python'],
      },
      {
        title: 'Stock Picker Crew',
        description: 'Autonomous crew of financial analysts: Research Agent gathers company data, Analyst Agent evaluates fundamentals, Writer Agent produces an investment report with recommendations.',
        tags: ['CrewAI', 'Financial Analysis', 'Web Search'],
      },
      {
        title: 'Debate Crew',
        description: 'Two opposing AI agents argue both sides of a topic, moderated by a Judge agent that evaluates arguments and declares a winner. Demonstrates adversarial multi-agent patterns.',
        tags: ['CrewAI', 'Adversarial Agents', 'Reasoning'],
      },
      {
        title: 'Financial Researcher Crew',
        description: 'Multi-agent pipeline that researches companies, gathers real-time financial data, and synthesises structured research reports using knowledge base integration.',
        tags: ['CrewAI', 'Knowledge Base', 'Research Pipeline'],
      },
      {
        title: 'Coder Crew',
        description: 'Agents collaborating on code generation tasks: a Planner, Developer, and Code Reviewer agent work together to produce tested, documented code from a natural-language spec.',
        tags: ['CrewAI', 'Code Generation', 'Review Agent'],
      },
    ],
  },
  {
    label: 'LangGraph',
    color: 'green',
    icon: <Activity size={14} />,
    projects: [
      {
        title: 'Sidekick – Autonomous Agent',
        description: 'Full autonomous agent with Playwright browser tools, LangChain memory checkpointing (SQLite), an Evaluator loop that judges whether success criteria are met, and a human-in-the-loop escalation path.',
        tags: ['LangGraph', 'Playwright', 'MemorySaver', 'StateGraph'],
      },
      {
        title: 'Stateful Conversation Graph',
        description: 'Built progressively complex LangGraph graphs: linear chains, conditional branching, cycles, and persistent state across turns using TypedDict state objects and checkpointers.',
        tags: ['LangGraph', 'StateGraph', 'Conditional Edges', 'Python'],
      },
    ],
  },
  {
    label: 'AutoGen',
    color: 'orange',
    icon: <Cpu size={14} />,
    projects: [
      {
        title: 'Distributed Entrepreneur Network',
        description: 'Network of 20 autonomous agents, each with distinct personas (healthcare, education, fintech specialist, etc.), that asynchronously bounce business ideas off each other using AutoGen Core\'s actor model and message routing.',
        tags: ['AutoGen Core', 'Distributed Agents', 'Actor Model', 'Async'],
      },
      {
        title: 'AgentChat Pipelines',
        description: 'Built multi-agent conversation pipelines with AutoGen AgentChat: group chats, sequential handoffs, and termination conditions.',
        tags: ['AutoGen AgentChat', 'Group Chat', 'GPT-4o-mini'],
      },
    ],
  },
  {
    label: 'MCP – Model Context Protocol',
    color: 'pink',
    icon: <Globe size={14} />,
    projects: [
      {
        title: 'Trading Floor Simulation',
        description: 'Gradio-powered trading floor with multiple AI trader agents (each backed by a different LLM), MCP market data server, account management, real-time P&L dashboard, and structured logging. Capstone project of the course.',
        tags: ['MCP', 'OpenAI Agents SDK', 'Gradio', 'SQLite', 'Plotly'],
      },
      {
        title: 'MCP Server Implementations',
        description: 'Built custom MCP servers: a market data server streaming live prices, an accounts server managing trader positions, and a push notifications server — all consumed by OpenAI Agents SDK clients.',
        tags: ['FastMCP', 'MCP Servers', 'Python asyncio', 'WebSockets'],
      },
      {
        title: 'Memory & Push MCP Tools',
        description: 'Persistent memory MCP server giving agents long-term recall across sessions, plus a push notification tool allowing agents to alert the user via Pushover on task completion.',
        tags: ['MCP', 'Vector Memory', 'Pushover API'],
      },
    ],
  },
];

const selfStudyTopics = [
  {
    icon: <Brain size={20} />,
    label: 'Agentic AI Systems',
    color: 'purple',
    description: 'Building and studying autonomous AI agent architectures, multi-agent orchestration, and tool-use patterns.',
    topics: ['AI Agent Development', 'Agentic IDE Tools', 'n8n AI Agent Automation', 'Replit Agent', 'Multi-Agent Orchestration', 'Agent Dev School'],
  },
  {
    icon: <Sparkles size={20} />,
    label: 'Generative AI & Creative AI',
    color: 'pink',
    description: 'Exploring text-to-video, AI music generation, lip-sync synthesis, and creative AI applications.',
    topics: ['OpenAI Sora (Text-to-Video)', 'AI Music Video Generation', 'AI Lip-Sync Synthesis', 'AI Chord Generation', 'Diffusion Models', 'Creative AI Workflows'],
  },
  {
    icon: <Globe size={20} />,
    label: 'LLM Ecosystem & APIs',
    color: 'cyan',
    description: 'Deep study of large language model APIs, SDKs, AGI research, and the evolving AI compute landscape.',
    topics: ['OpenAI SDK for .NET', 'AGI Research & Levels', 'AI Compute Infrastructure', 'LLM API Integration', 'AI Engineering Best Practices', 'Model Evaluation & Selection'],
  },
  {
    icon: <TrendingUp size={20} />,
    label: 'AI Industry & Strategy',
    color: 'orange',
    description: 'Following AI industry leaders on workforce impact, U.S.-China AI competition, and the future of AI safety.',
    topics: ['Geoffrey Hinton (AI Safety)', 'Scale AI & AI Race Strategy', 'AI Workforce Transformation', 'OpenAI Compute Scaling', 'AI & Mass Unemployment Risk', 'AI Industry Leadership'],
  },
  {
    icon: <Code2 size={20} />,
    label: 'Modern Frontend & Full Stack',
    color: 'blue',
    description: 'Staying current with the latest framework releases, language features, and web platform capabilities.',
    topics: ['React 19 Features', 'Angular 20 Launch', 'TypeScript Innovations', 'Node.js TypeScript Support', 'GraphQL Fundamentals', 'Chrome DevTools Advances'],
  },
  {
    icon: <Cloud size={20} />,
    label: 'Cloud Architecture & DevOps',
    color: 'green',
    description: 'Studying cloud-native architectures, serverless patterns, and distributed database systems.',
    topics: ['AWS Aurora DSQL Deep Dive', 'AWS re:Invent 2024', 'Azure Portal Fundamentals', 'Serverless Architecture', 'VS Code & IDE Mastery', 'Developer Productivity Tools'],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ResumePage() {
  const [infographicOpen, setInfographicOpen] = useState(false);

  useEffect(() => {
    if (!infographicOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setInfographicOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [infographicOpen]);

  return (
    <>
      <Helmet>
        <title>Resume – Brett Sanders</title>
        <meta name="description" content="Resume of Brett Sanders – Software Engineering Director, AI/ML Practitioner, and Full Stack Developer with 15+ years of experience in financial services." />
        <link rel="canonical" href="https://www.brettsanders.com/resume" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-linear-to-br from-gray-900 via-slate-900 to-gray-800 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <Breadcrumbs items={[{ label: 'Resume', isLast: true }]} className="mb-8 text-gray-400" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <picture>
                <source srcSet="/me.webp" type="image/webp" />
                <img src="/me-128.jpg" alt="Brett Sanders" width={120} height={120}
                  className="w-28 h-28 rounded-full ring-4 ring-blue-500/40 object-cover shadow-2xl shadow-blue-500/20"
                />
              </picture>
            </motion.div>

            {/* Name + title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">Brett Sanders</h1>
              <p className="text-xl text-blue-300 font-medium mb-1">Software Engineering Director</p>
              <p className="text-base text-gray-400 mb-4">AI/ML Practitioner · Full Stack Engineer · AWS Certified · SAFe Agile</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                <a href="https://linkedin.com/in/imbrett/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-colors">
                  <Linkedin size={15} /><span>LinkedIn</span>
                </a>
                <a href="https://github.com/DontFretBrett" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-colors">
                  <Github size={15} /><span>GitHub</span>
                </a>
                <a href="https://www.brettsanders.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-blue-400 transition-colors">
                  <ExternalLink size={15} /><span>Portfolio</span>
                </a>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <MapPin size={15} /><span>San Diego, CA</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Stats row ─────────────────────────────────────────────────── */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm p-4 text-center"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${s.color} opacity-10`} />
                <div className={`mx-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center bg-linear-to-br ${s.color} text-white`}>
                  {s.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  <AnimatedCounter value={s.value} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} />
                </div>
                <div className="text-xs text-gray-400 mt-1 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <main className="bg-gray-950 min-h-screen">

        {/* ── Summary ───────────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <SectionHeader icon={<Briefcase size={20} />} title="Professional Summary" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8"
          >
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              Award-winning technology leader with <strong className="text-white">15+ years</strong> driving software engineering excellence
              in financial services. Deep expertise in full-stack development, cloud architecture, and emerging AI/ML technologies.
              Currently building autonomous AI agents, multi-model trading systems, and production AI assistants.
              Proven ability to lead cross-functional teams, delivering high-impact projects on time and under budget.
              Passionate about leveraging AI to transform business operations and fostering team growth.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['SAFe Agile Certified', 'AWS Certified', 'Full Stack Engineer', 'AI/ML Practitioner', 'Engineering Director', 'Agentic AI Engineering'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Infographic ──────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Award size={20} />} title="At a Glance" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative group rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/40 cursor-zoom-in"
            onClick={() => setInfographicOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="View infographic full size"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setInfographicOpen(true); }}
          >
            <img
              src="/infographic.png"
              alt="Brett Sanders – Engineering Leadership & Agentic AI Specialist infographic"
              width={2752}
              height={1536}
              className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.01]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium backdrop-blur-sm">
                <ZoomIn size={16} />
                Click to expand
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Infographic Lightbox ──────────────────────────────────────────── */}
        <AnimatePresence>
          {infographicOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setInfographicOpen(false)}
              aria-modal="true"
              role="dialog"
              aria-label="Infographic full size view"
            >
              <button
                className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                onClick={() => setInfographicOpen(false)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src="/infographic.png"
                alt="Brett Sanders – Engineering Leadership & Agentic AI Specialist infographic"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Achievement Infographic ───────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Award size={20} />} title="Career Impact" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AchievementCard
              icon={<DollarSign size={24} />}
              value="$2M"
              label="Cost Savings"
              detail="Found secure replacement for deprecated web framework"
              gradient="from-green-600 to-emerald-600"
            />
            <AchievementCard
              icon={<TrendingUp size={24} />}
              value="$74.3M+"
              label="Funded Loans"
              detail="State Farm partnership launch driving lending volume"
              gradient="from-blue-600 to-cyan-600"
            />
            <AchievementCard
              icon={<Shield size={24} />}
              value="99.9%"
              label="Platform Uptime"
              detail="Customer-facing lending platform reliability"
              gradient="from-purple-600 to-violet-600"
            />
            <AchievementCard
              icon={<Users size={24} />}
              value="20"
              label="Direct Reports"
              detail="4 engineering teams in 24/7 operation"
              gradient="from-orange-600 to-red-600"
            />
            <AchievementCard
              icon={<Star size={24} />}
              value="100%"
              label="ADA Compliance"
              detail="NVDA, Jaws, VoiceOver, Deque Axe DevTools"
              gradient="from-pink-600 to-rose-600"
            />
            <AchievementCard
              icon={<Globe size={24} />}
              value="250+"
              label="Pages Rebranded"
              detail="Divisional rebrand plus 50+ email templates"
              gradient="from-teal-600 to-cyan-600"
            />
          </div>
        </section>

        {/* ── Career Timeline ───────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Briefcase size={20} />} title="Career Timeline" />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30 md:-translate-x-px" />

            <div className="space-y-8">
              {timeline.map((job, i) => {
                const c = colorMap[job.color] ?? colorMap.blue;
                const isRight = i % 2 === 0;
                return (
                  <motion.div key={job.title + job.period}
                    initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0 flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-5 z-10">
                      <div className={`w-4 h-4 rounded-full ${c.dot} shadow-lg ring-4 ring-gray-950`} />
                    </div>

                    {/* Card */}
                    <div className={`ml-8 md:ml-0 ${isRight ? 'md:mr-[calc(50%+2rem)] md:ml-0 md:pr-0' : 'md:ml-[calc(50%+2rem)]'} flex-1`}>
                      <div className={`bg-gray-900 border ${c.border} border-opacity-40 rounded-2xl p-5 hover:border-opacity-70 transition-all duration-300 group`}>
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <p className={`text-xs font-mono ${c.text} mb-1`}>{job.period}</p>
                            <h3 className="text-base md:text-lg font-bold text-white">{job.title}</h3>
                            <p className="text-gray-400 text-sm">{job.company}</p>
                          </div>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin size={12} />{job.location}
                          </span>
                        </div>
                        <ul className="space-y-1.5 mb-4">
                          {job.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-sm text-gray-400">
                              <ChevronRight size={14} className={`${c.text} mt-0.5 flex-shrink-0`} />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5">
                          {job.tags.map((t) => (
                            <span key={t} className={`px-2 py-0.5 rounded-md text-xs font-medium ${c.tag}`}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Education node */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex items-start gap-6 md:gap-0"
              >
                <div className="relative flex-shrink-0 flex flex-col items-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-5 z-10">
                  <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-lg ring-4 ring-gray-950" />
                </div>
                <div className="ml-8 md:ml-0 md:mr-[calc(50%+2rem)] flex-1">
                  <div className="bg-gray-900 border border-yellow-500/40 rounded-2xl p-5">
                    <p className="text-xs font-mono text-yellow-400 mb-1">Age 12 · Self-Taught Origin</p>
                    <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                      <Terminal size={18} className="text-yellow-400" />
                      Self-Taught Software Engineer
                    </h3>
                    <p className="text-gray-400 text-sm">Started coding at age 12, before YouTube, Stack Overflow, or AI</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Skills Infographic ────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Code2 size={20} />} title="Technical Skills" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups.map((group, i) => (
              <motion.div key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors"
              >
                <div className={`flex items-center gap-2 mb-4 ${skillColorMap[group.color].includes('purple') ? 'text-purple-400' : skillColorMap[group.color].includes('blue') ? 'text-blue-400' : skillColorMap[group.color].includes('green') ? 'text-green-400' : skillColorMap[group.color].includes('cyan') ? 'text-cyan-400' : skillColorMap[group.color].includes('orange') ? 'text-orange-400' : 'text-pink-400'}`}>
                  {group.icon}
                  <h3 className="font-semibold text-white">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className={`px-2 py-1 rounded-md text-xs font-medium ${skillColorMap[group.color]}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Featured Projects ─────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Zap size={20} />} title="Featured AI Projects" />
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((p, i) => {
              const c = colorMap[p.color] ?? colorMap.blue;
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`bg-gray-900 border ${c.border} border-opacity-40 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c.bg} ${c.text}`}>
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-white text-lg">{p.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.tag}`}>{p.period}</span>
                    </div>
                    <p className={`text-sm font-medium ${c.text} mb-3`}>{p.subtitle}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">{t}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Agentic AI Course Projects ────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Brain size={20} />} title="Agentic AI Engineering – Course Projects" />
          <p className="text-gray-400 text-sm mb-8 -mt-4">
            Hands-on projects built across all 6 weeks of{' '}
            <a href="https://www.udemy.com/certificate/UC-816bd9d7-4ad1-4bef-b670-782fabc9ec94/"
              target="_blank" rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors">
              Ed Donner's Master Agentic AI Engineering Course
            </a>
            {' '}— covering every major agent framework.
          </p>
          <div className="space-y-6">
            {courseWeeks.map((week, wi) => (
              <motion.div key={week.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: wi * 0.06 }}
              >
                {/* Week header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${colorMap[week.color]?.bg} ${colorMap[week.color]?.text} border ${colorMap[week.color]?.border} border-opacity-40`}>
                    {week.icon}
                    <span>Week {wi + 1} – {week.label}</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>
                {/* Project cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-0">
                  {week.projects.map((p) => (
                    <div key={p.title}
                      className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
                    >
                      <h4 className="font-semibold text-white text-sm mb-1">{p.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span key={t} className={`px-1.5 py-0.5 rounded text-xs ${colorMap[week.color]?.tag}`}>{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Certifications ────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Award size={20} />} title="Certifications & Training" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert, i) => {
              const c = colorMap[cert.color] ?? colorMap.blue;
              return (
                <motion.div key={cert.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className={`bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors flex items-start gap-3`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${c.bg} ${c.text}`}>
                    {cert.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-mono ${c.text}`}>{cert.year}</span>
                      <span className="text-xs text-gray-500">{cert.org}</span>
                    </div>
                    {cert.url ? (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-medium text-white hover:text-blue-400 transition-colors line-clamp-2 flex items-center gap-1">
                        {cert.title}<ExternalLink size={11} className="flex-shrink-0" />
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white line-clamp-2">{cert.title}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Continuous Learning ──────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<BookOpen size={20} />} title="Continuous AI & Technology Study" />
          <p className="text-gray-400 text-sm mb-8 -mt-4">
            Self-directed study across AI, software engineering, and cloud topics — curated from 200+ hours of technical content.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selfStudyTopics.map((topic, i) => {
              const c = colorMap[topic.color] ?? colorMap.blue;
              return (
                <motion.div key={topic.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`bg-gray-900 border ${c.border} border-opacity-30 rounded-2xl p-5 hover:border-opacity-60 transition-all duration-300`}
                >
                  <div className={`flex items-center gap-2.5 mb-3`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.bg} ${c.text}`}>
                      {topic.icon}
                    </div>
                    <h3 className="font-semibold text-white text-sm">{topic.label}</h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{topic.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.topics.map((t) => (
                      <span key={t} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${c.tag}`}>
                        <Play size={8} className="flex-shrink-0" />
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Education ─────────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Terminal size={20} />} title="How I Learned" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-yellow-500/30 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
                <Terminal size={28} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-yellow-400 font-mono mb-1">Self-Taught · No Formal Degree</p>
                <h3 className="text-xl font-bold text-white mb-2">Built from Curiosity, Not a Classroom</h3>
                <p className="text-gray-400 leading-relaxed">
                  Started coding obsessively at age 12 — before YouTube tutorials, Stack Overflow, or AI assistants existed.
                  Everything learned through building real things: tools, games, and systems from scratch.
                  Turned that early passion into a 15+ year career at major financial institutions, rising from developer to director entirely on merit.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Footer CTA ───────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-8 text-center"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-600/5 to-purple-600/5" />
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Let's Build Something Great</h3>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a href="https://linkedin.com/in/imbrett/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
                <Linkedin size={16} /> Connect on LinkedIn
              </a>
              <a href="https://github.com/DontFretBrett" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
                <Github size={16} /> GitHub
              </a>
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 flex-shrink-0">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-linear-to-r from-blue-500/30 to-transparent ml-2" />
    </div>
  );
}

function AchievementCard({
  icon, value, label, detail, gradient,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  detail: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-colors group"
    >
      <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <div className={`text-3xl font-bold bg-linear-to-r ${gradient} bg-clip-text text-transparent mb-1`}>
        {value}
      </div>
      <div className="text-white font-semibold text-sm mb-1">{label}</div>
      <div className="text-gray-500 text-xs leading-snug">{detail}</div>
    </motion.div>
  );
}
