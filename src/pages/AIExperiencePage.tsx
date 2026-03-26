import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Brain,
  ExternalLink,
  Award,
  TrendingUp,
  Zap,
  ChevronRight,
  Terminal,
  Globe,
  Cpu,
  BookOpen,
  Rocket,
  Clock,
  Layers,
  Wrench,
  Target,
  Sparkles,
  MessageSquare,
  Bot,
  Network,
  LayoutDashboard,
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { SimpleBrandIcon } from '../components/SimpleBrandIcon';

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

const heroStats = [
  { icon: <Clock size={22} />, value: 2000, suffix: '+', label: 'Hours of AI Study', color: 'from-purple-500 to-violet-500' },
  { icon: <Layers size={22} />, value: 6, suffix: '', label: 'Agent Frameworks', color: 'from-blue-500 to-cyan-500' },
  { icon: <Rocket size={22} />, value: 9, suffix: '+', label: 'AI Projects Shipped', color: 'from-green-500 to-emerald-500' },
  { icon: <Clock size={22} />, value: 39, suffix: ' mo', label: 'Since ChatGPT Launch', color: 'from-orange-500 to-red-500' },
];

const journeyPhases = [
  {
    title: 'Immediate Adoption',
    subtitle: 'Day-one experimentation with ChatGPT and GPT-3.5',
    color: 'blue',
    highlights: [
      'Started using ChatGPT within days of launch — recognized the paradigm shift immediately',
      'Explored prompt engineering patterns, chain-of-thought reasoning, and system prompts',
      'Began integrating LLM-powered workflows into daily engineering leadership work',
      'Started dedicated 10–15 hr/week AI self-study habit that continues today',
    ],
  },
  {
    title: 'Deep Exploration',
    subtitle: 'API integration, multi-model evaluation, and applied AI',
    color: 'purple',
    highlights: [
      'Built first production integrations with OpenAI API and Claude API',
      'Evaluated and compared GPT-4, Claude, Gemini, and open-source models',
      'Studied RAG architectures, vector databases (Qdrant), and embedding strategies',
      'Adopted AI-powered development tools: Cursor IDE, GitHub Copilot',
    ],
  },
  {
    title: 'Building Production AI',
    subtitle: 'Shipping autonomous agents and real-time trading systems',
    color: 'cyan',
    highlights: [
      'Built Johnny5 (personal AI assistant) powered by the open-source OpenClaw platform: daily newsletters, Mission Control for monitoring subagents and cron jobs, and vector memory',
      'Shipped J5 Agent Fleet — production Next.js operator console for OpenClaw: task and project orchestration, agent fleet workspace, Kanban, GitHub OAuth, costs dashboards, SSE live updates, and a detached worker for Claude Code, Codex, Copilot, and more',
      'Configured Johnny5 with cloud model providers and local LLMs, integrating across Telegram, Discord, and email',
      'Explored vector databases, semantic search, and long-term agent memory systems',
    ],
  },
  {
    title: 'Framework Research',
    subtitle: 'Systematic deep-dive into the most popular agent frameworks',
    color: 'green',
    highlights: [
      'Completed intensive 6-week Agentic AI Engineering course across all major frameworks',
      'Built 20+ projects spanning OpenAI Agents SDK, CrewAI, LangGraph, AutoGen, and MCP',
      'Mastered multi-agent orchestration patterns: handoffs, group chat, adversarial, and pipeline',
      'Implemented production MCP servers with FastMCP for standardized AI-tool integration',
    ],
  },
  {
    title: 'AI-Native Development',
    subtitle: 'Full-stack AI-assisted engineering with Claude Code, Codex, and agentic IDEs',
    color: 'orange',
    highlights: [
      'Adopted Claude Code and Codex CLI for end-to-end AI-assisted software development',
      'Built AI Image Validator using AutoGen + GPT-4o vision with OpenTelemetry tracing',
      'Created AI Assistant Human Questionnaire — privacy-first AI context builder',
      'Built J5-Trade: autonomous multi-agent crypto trading platform with 4-agent analysis system (Pricing, News Sentiment, Trade, and Coordinator agents)',
      'Actively shipping production code with agentic development workflows daily',
    ],
  },
];

const frameworkCards = [
  {
    name: 'OpenAI Agents SDK',
    icon: <Bot size={24} />,
    color: 'cyan',
    depth: 'Deep',
    description: 'Multi-agent handoff pipelines, deep research agents, tool calling with side effects, multi-model routing across GPT-4o, DeepSeek, and Ollama.',
    projects: ['Deep Research Agent', 'Email Notification Agent', 'Multi-Model Router'],
  },
  {
    name: 'CrewAI',
    icon: <Network size={24} />,
    color: 'purple',
    depth: 'Hands On',
    description: 'Role-based agent teams simulating real-world workflows — engineering, finance, debate, and code review — with knowledge base integration.',
    projects: ['Engineering Team Crew', 'Stock Picker', 'Debate Crew', 'Financial Researcher', 'Coder Crew'],
  },
  {
    name: 'LangGraph',
    icon: <Layers size={24} />,
    color: 'green',
    depth: 'Hands On',
    description: 'Stateful autonomous agents with Playwright browser automation, memory checkpointing, evaluator loops, and human-in-the-loop escalation.',
    projects: ['Sidekick Autonomous Agent', 'Stateful Conversation Graph'],
  },
  {
    name: 'AutoGen',
    icon: <Cpu size={24} />,
    color: 'orange',
    depth: 'Hands On',
    description: 'Distributed actor-model agent networks with 20+ autonomous agents, group chat pipelines, and asynchronous message routing.',
    projects: ['Distributed Entrepreneur Network', 'AgentChat Pipelines', 'AI Image Validator'],
  },
  {
    name: 'Model Context Protocol',
    icon: <Globe size={24} />,
    color: 'pink',
    depth: 'Deep',
    description: 'Built production MCP servers for market data, account management, memory persistence, and push notifications — consumed by OpenAI Agents SDK clients.',
    projects: ['Trading Floor Simulation', 'MCP Server Implementations', 'Memory & Push Tools', 'Random Dog MCP'],
  },
  {
    name: 'Claude & Anthropic',
    icon: <MessageSquare size={24} />,
    color: 'blue',
    depth: 'Daily',
    description: 'Primary LLM provider for OpenClaw automations and daily AI development. Daily use of Claude Code for agentic software development and code generation.',
    projects: ['J5 Agent Fleet', 'Johnny5 (OpenClaw)', 'Claude Code Workflows', 'This Portfolio'],
  },
];

const productionProjects = [
  {
    title: 'J5 Agent Fleet',
    subtitle: 'OpenClaw / Johnny5 operations console',
    period: '2026–Present',
    color: 'cyan',
    description: 'Production-grade operator UI and runtime for OpenClaw agents: task lifecycle with worker execution (Claude Code, Codex, Copilot, Gemini CLI, and more), Agent Fleet workspace with directory and chat, project orchestration with Kanban, per-project chat and attachments, GitHub-linked repository catalog, period reports with PDF export, costs and usage dashboards, QMD/MCP docs indexing, gateway WebSocket ingestion into SQLite, and live updates over SSE.',
    tags: ['Next.js', 'TypeScript', 'SQLite', 'SSE', 'GitHub OAuth', 'OpenClaw', 'Worker runtime'],
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: 'J5-Trade',
    subtitle: 'Autonomous Multi-Agent Crypto Trading Platform',
    period: '2026–Present',
    color: 'blue',
    description: 'Production-grade autonomous cryptocurrency trading system featuring AI-generated trade summaries, an integrated chat assistant, and a 4-agent analysis system: a Pricing Agent, News Sentiment Agent, Trade Agent, and a Coordinator Agent that manages the other three. Includes real-time monitoring dashboard and signal resolver with veto hierarchy.',
    tags: ['Python asyncio', 'SQLite', 'WebSockets', 'TypeScript', '4-Agent System', 'AI Chat Assistant'],
    icon: <TrendingUp size={20} />,
  },
  {
    title: 'Johnny5',
    subtitle: '24/7 AI Assistant powered by OpenClaw',
    period: '2026–Present',
    color: 'purple',
    description: 'Personal AI assistant (Johnny5) powered by the open-source OpenClaw platform. Multi-channel communication across Telegram, Discord, and email. Mission Control dashboard for monitoring subagents, cron jobs, and vector memory. Integrated with cloud model providers and local LLMs, with workflows that helped build J5-Trade.',
    tags: ['AI Newsletters', 'Mission Control', 'Qdrant', 'Local LLMs', 'Claude API', 'Telegram', 'Discord'],
    icon: <Brain size={20} />,
  },
  {
    title: 'AI Image Validator',
    subtitle: 'AutoGen + GPT-4o Vision Pipeline',
    period: '2025',
    color: 'green',
    description: 'Multi-agent image validation using AutoGen framework and GPT-4o-mini vision model with natural language criteria, structured outputs, and full OpenTelemetry tracing.',
    tags: ['AutoGen', 'GPT-4o', 'Gradio', 'OpenTelemetry', 'Pydantic'],
    icon: <Zap size={20} />,
  },
  {
    title: 'Trading Floor Simulation',
    subtitle: 'MCP-Powered Multi-Agent Trading',
    period: '2025',
    color: 'orange',
    description: 'Capstone project: Gradio-powered trading floor with multiple AI trader agents backed by different LLMs, MCP market data server, and real-time P&L dashboard.',
    tags: ['MCP', 'OpenAI SDK', 'Gradio', 'SQLite', 'Plotly'],
    icon: <Rocket size={20} />,
  },
];

const aiToolkit = [
  {
    icon: <Brain size={20} />,
    label: 'LLM Providers',
    color: 'purple',
    skills: ['Claude (Anthropic)', 'GPT-4o (OpenAI)', 'Gemini (Google)', 'Grok (xAI)', 'DeepSeek', 'Ollama (Local)'],
  },
  {
    icon: <Network size={20} />,
    label: 'Agent Frameworks',
    color: 'blue',
    skills: ['OpenAI Agents SDK', 'CrewAI', 'LangGraph', 'AutoGen', 'MCP (FastMCP)', 'n8n'],
  },
  {
    icon: <Wrench size={20} />,
    label: 'AI Development Tools',
    color: 'cyan',
    skills: ['Cursor IDE', 'Claude Code', 'Codex CLI', 'GitHub Copilot', 'Windsurf', 'Hugging Face'],
  },
  {
    icon: <Layers size={20} />,
    label: 'AI Infrastructure',
    color: 'green',
    skills: ['Qdrant (Vector DB)', 'RAG Pipelines', 'Embedding Models', 'OpenTelemetry', 'Gradio', 'Prompt Engineering'],
  },
  {
    icon: <Terminal size={20} />,
    label: 'Languages & Runtimes',
    color: 'orange',
    skills: ['Python', 'TypeScript', 'Node.js', 'Python asyncio', 'Pydantic', 'FastAPI'],
  },
  {
    icon: <Globe size={20} />,
    label: 'Deployment & Ops',
    color: 'pink',
    skills: ['Hugging Face Spaces', 'Vercel', 'Docker', 'AWS Lambda', 'GitHub Actions', 'Telegram/Discord Bots'],
  },
];

const enterpriseValue = [
  {
    icon: <Target size={20} />,
    title: 'Framework-Agnostic',
    description: 'Deep hands-on experience across most popular agent frameworks means I can evaluate, select, and implement the right tool for any enterprise AI initiative — not locked into a single vendor.',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    icon: <Rocket size={20} />,
    title: 'Ships Production AI',
    description: 'Not just prototypes — I build and operate production AI systems running 24/7. From autonomous trading to persistent AI assistants with real users and real stakes.',
    color: 'from-purple-600 to-violet-600',
  },
  {
    icon: <Layers size={20} />,
    title: 'Full-Stack + AI',
    description: '15+ years of enterprise software engineering combined with deep AI expertise. I bridge the gap between AI research and production-grade software delivery teams.',
    color: 'from-green-600 to-emerald-600',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'AI-Native Leadership',
    description: 'Currently leading engineering teams at a major bank while simultaneously building AI projects. I understand both the technical execution and organizational change management required.',
    color: 'from-orange-600 to-red-600',
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

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIExperiencePage() {
  return (
    <>
      <Helmet>
        <title>AI Experience – Brett Sanders</title>
        <meta name="description" content="Brett Sanders' AI experience: 2,000+ hours of hands-on study, hands-on experience with 6 agent frameworks, and 9+ production AI projects shipped since ChatGPT launched in November 2022." />
        <link rel="canonical" href="https://www.brettsanders.com/ai" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-linear-to-br from-gray-900 via-slate-900 to-gray-800 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <Breadcrumbs items={[{ label: 'AI Experience', isLast: true }]} className="mb-8 text-gray-400" />

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
                  className="w-28 h-28 rounded-full ring-4 ring-purple-500/40 object-cover shadow-2xl shadow-purple-500/20"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">AI Experience</h1>
              <p className="text-xl text-purple-300 font-medium mb-1">Brett Sanders</p>
              <p className="text-base text-gray-400 mb-4">Relentless AI practitioner since day one. 10–15 hours a week, every week, since ChatGPT launched.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                <a href="https://linkedin.com/in/imbrett/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-purple-400 transition-colors">
                  <SimpleBrandIcon brand="linkedin" size={15} /><span>LinkedIn</span>
                </a>
                <a href="https://github.com/DontFretBrett" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-300 hover:text-purple-400 transition-colors">
                  <SimpleBrandIcon brand="github" size={15} /><span>GitHub</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Stats row ─────────────────────────────────────────────────── */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {heroStats.map((s, i) => (
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
                  <AnimatedCounter value={s.value} suffix={s.suffix ?? ''} />
                </div>
                <div className="text-xs text-gray-400 mt-1 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <main className="bg-gray-950 min-h-screen">

        {/* ── Executive Summary ───────────────────────────────────────────── */}
        <section className="container mx-auto px-4 py-16 max-w-6xl">
          <SectionHeader icon={<Brain size={20} />} title="Executive Summary" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8"
          >
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              Since ChatGPT launched on <strong className="text-white">November 30, 2022</strong>, I have dedicated{' '}
              <strong className="text-white">10–15 hours every single week</strong> to hands-on AI experimentation, study, and building.
              This isn't casual interest — it's an aggressive, sustained investment that has produced real, working AI systems.
              I've shipped <strong className="text-white">production autonomous agents</strong>, gained hands-on experience with{' '}
              <strong className="text-white">most of the popular agentic AI frameworks</strong>, and I bring{' '}
              <strong className="text-white">15+ years of enterprise engineering leadership</strong> to bridge the gap between
              AI capabilities and production-grade software delivery.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Agentic AI Engineering', 'Multi-Agent Systems', 'Production AI', 'LLM Integration', 'RAG & Vector DBs', 'AI-Assisted Development'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── AI Journey Timeline ─────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<TrendingUp size={20} />} title="AI Learning Journey" />
          <p className="text-gray-400 text-sm mb-8 -mt-4">
            39 months of relentless experimentation — from day-one ChatGPT adoption to shipping production AI systems daily.
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-6 top-0 bottom-0 w-px bg-linear-to-b from-blue-500 via-purple-500 to-orange-500 opacity-30" />

            <div className="space-y-6">
              {journeyPhases.map((phase, i) => {
                const c = colorMap[phase.color] ?? colorMap.blue;
                return (
                  <motion.div key={phase.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0 flex flex-col items-center z-10">
                      <div className={`w-4 h-4 rounded-full ${c.dot} shadow-lg ring-4 ring-gray-950`} />
                    </div>

                    {/* Card */}
                    <div className="flex-1 -mt-1">
                      <div className={`bg-gray-900 border ${c.border} border-opacity-40 rounded-2xl p-5 hover:border-opacity-70 transition-all duration-300`}>
                        <h3 className="text-base md:text-lg font-bold text-white">{phase.title}</h3>
                        <p className={`text-sm ${c.text} mb-3 opacity-80`}>{phase.subtitle}</p>
                        <ul className="space-y-1.5">
                          {phase.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-sm text-gray-400">
                              <ChevronRight size={14} className={`${c.text} mt-0.5 flex-shrink-0`} />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Framework Deep Dives ────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Layers size={20} />} title="Agent Framework Experience" />
          <p className="text-gray-400 text-sm mb-8 -mt-4">
            Hands-on, project-based experience with most of the popular agentic AI frameworks — not tutorials, real working systems.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {frameworkCards.map((fw, i) => {
              const c = colorMap[fw.color] ?? colorMap.blue;
              return (
                <motion.div key={fw.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`bg-gray-900 border ${c.border} border-opacity-40 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.bg} ${c.text}`}>
                      {fw.icon}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${c.tag}`}>{fw.depth}</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{fw.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{fw.description}</p>
                  <div>
                    <p className={`text-xs font-semibold ${c.text} mb-2 uppercase tracking-wider`}>Projects Built</p>
                    <div className="flex flex-wrap gap-1.5">
                      {fw.projects.map((p) => (
                        <span key={p} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">{p}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Production AI Projects ──────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Zap size={20} />} title="Production AI Projects" />
          <p className="text-gray-400 text-sm mb-8 -mt-4">
            Real systems running in production — not demos, not proofs-of-concept.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {productionProjects.map((p, i) => {
              const c = colorMap[p.color] ?? colorMap.blue;
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`bg-gray-900 border ${c.border} border-opacity-40 rounded-2xl p-6 hover:border-opacity-70 transition-all duration-300 flex flex-col`}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.bg} ${c.text} flex-shrink-0`}>
                      {p.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white text-lg">{p.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.tag} flex-shrink-0`}>{p.period}</span>
                      </div>
                      <p className={`text-sm font-medium ${c.text}`}>{p.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{p.description}</p>
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

        {/* ── AI Toolkit ──────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Wrench size={20} />} title="AI Toolkit" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiToolkit.map((group, i) => (
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

        {/* ── Why This Matters for Enterprise ─────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Target size={20} />} title="Why This Matters for Enterprise" />
          <div className="grid md:grid-cols-2 gap-5">
            {enterpriseValue.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative overflow-hidden bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors group"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${item.color} flex items-center justify-center text-white mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── AI Education ───────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <SectionHeader icon={<Award size={20} />} title="AI Education" />
          <div className="space-y-5">
            {/* Completed certification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="bg-gray-900 border border-purple-500/40 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                  <Award size={28} className="text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-purple-400 font-mono">2025 · Udemy / Ed Donner</p>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-xs font-semibold">Completed</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    The Complete Agentic AI Engineering Course
                    <a href="https://www.udemy.com/certificate/UC-816bd9d7-4ad1-4bef-b670-782fabc9ec94/"
                      target="_blank" rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Comprehensive 6-week course covering the most popular agentic AI frameworks: OpenAI Agents SDK, CrewAI,
                    LangGraph, AutoGen, and MCP. Built 20+ hands-on projects from multi-agent research pipelines to
                    distributed trading floor simulations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Currently studying */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-900 border border-cyan-500/40 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={28} className="text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-cyan-400 font-mono">2026 · Udemy / Ed Donner</p>
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-semibold">In Progress</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    AI Builder: Create Agents, Voice Agents &amp; Automations in n8n
                    <a href="https://www.udemy.com/course/ai-builder-with-n8n-create-agents-voice-agents/"
                      target="_blank" rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    3-week intensive on building production AI agents with n8n. Covers autonomous business agents with OpenAI and open-source models,
                    real-time Voice Agents with ElevenLabs and Twilio, Agentic RAG with Supabase, and a capstone multi-agent Go-To-Market system
                    using MCP with self-hosted n8n and Ollama.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900 border border-cyan-500/40 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={28} className="text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs text-cyan-400 font-mono">2026 · Udemy / Ed Donner</p>
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-semibold">In Progress</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    AI Engineer Production Track: Deploy LLMs &amp; Agents at Scale
                    <a href="https://www.udemy.com/course/generative-and-agentic-ai-in-production/"
                      target="_blank" rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    4-week production deployment course shipping enterprise-grade AI across Vercel, AWS, GCP, and Azure. Covers SaaS apps with Next.js and Clerk,
                    AI platform engineering with Bedrock, Lambda, Terraform, and CI/CD, multi-agent systems with Aurora Serverless, SQS, and LangFuse observability,
                    plus MCP-powered Researcher and Cybersecurity Analyst agents.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── The Bottom Line ─────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-purple-400" />
              The Bottom Line
            </h3>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg">
              I don't dabble in AI — I <strong className="text-white">live in it</strong>. Every week for 39 months I've been
              building, breaking, and shipping AI systems. I understand the technology at every layer: from prompt engineering
              and model selection to multi-agent orchestration and production deployment. Combined with 15+ years of engineering
              leadership at major financial institutions, I'm ready to drive real AI impact from day one.
            </p>
          </motion.div>
        </section>

        {/* ── Footer CTA ───────────────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-16 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-linear-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 p-8 text-center"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600/5 to-cyan-600/5" />
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Ready to Build AI Together</h3>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <a href="https://linkedin.com/in/imbrett/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
                <SimpleBrandIcon brand="linkedin" size={16} /> Connect on LinkedIn
              </a>
              <a href="https://github.com/DontFretBrett" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2.5 rounded-full transition-colors">
                <SimpleBrandIcon brand="github" size={16} /> GitHub
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
      <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 flex-shrink-0">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-linear-to-r from-purple-500/30 to-transparent ml-2" />
    </div>
  );
}
