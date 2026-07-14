import type { Project } from '../types/projects';

export const projects: Project[] = [
  {
    slug: 'j5-agent-fleet',
    title: 'J5 Agent Fleet',
    description: 'A production AI orchestration platform at j5agentfleet.com with 95 specialized agents across 15 divisions, Goal Mode iterative loops, local browser/computer automation, durable runtime telemetry, Slack agent sessions, multi-agent Meetings, token and cost governance, native iOS/macOS/Electron apps, and local or managed-cloud execution through Claude Code, Copilot CLI, Codex, Antigravity, Kiro, LM Studio, and API models.',
    excerpt: 'Production mission control for AI operations at scale: 95 agents across 15 divisions, Goal Mode loops, Slack, Meetings, local automation, durable runtime telemetry, token governance, native apps, and local or managed-cloud agent execution. Live at j5agentfleet.com.',
    date: '2026-06-13',
    tags: [
      'AI Agents',
      'Next.js',
      'TypeScript',
      'React',
      'Multi-Agent Systems',
      'SQLite',
      'Neon Postgres',
      'Drizzle ORM',
      'SSE',
      'React Flow',
      'Zustand',
      'Kanban',
      'Clerk',
      'Docker',
      'Vercel Blob',
      'Upstash',
      'PDF Export',
      'Anthropic Claude',
      'iOS',
      'SwiftUI',
      'Electron',
      'Playwright',
      'Composio',
      'Stripe',
      'Resend',
      'Fly.dev',
      'Slack',
      'Antigravity',
      'Token Tracking',
    ],
    githubUrl: '',
    liveUrl: 'https://j5agentfleet.com',
    content: `# J5 Agent Fleet

**J5 Agent Fleet** is a production AI orchestration platform for operating a structured team of **95 specialized agents across 15 divisions**. It ships as a Next.js web app, native iOS/macOS apps, and an Electron desktop app, backed by local and cloud execution paths: a local service runner for user-controlled machines, and managed cloud workers for isolated remote execution.

**Live at:** [j5agentfleet.com](https://j5agentfleet.com)

## The Agent Fleet: 15 Divisions

| Division | Agents | Role |
|----------|--------|------|
| Engineering | 20 | Frontend, backend, DevOps, cloud, mobile, AI engineering, security, performance, infrastructure |
| Marketing | 13 | Content, SEO, social media, growth, Reddit, TikTok, Instagram, ASO, competitive intel |
| Support | 9 | Legal/compliance, finance, infrastructure, analytics, executive summaries |
| Design | 9 | UX architecture, UI design, brand, accessibility, visual storytelling, image prompting |
| Project Management | 5 | Studio producers, project shepherds, senior PMs, operations |
| Testing | 7 | API testing, performance benchmarking, reality checking, evidence collection |
| Specialized | 8 | Orchestrator, PDF creation, data consolidation, onboarding expert, scientific research |
| Product | 4 | Feedback synthesis, sprint prioritization, trend research |
| Operations | 2 | Coordination and operational automation |
| Data | 1 | Data consolidation and analysis |
| Finance | 1 | Financial analysis and reporting |
| Human Resources | 1 | HR workflows and documentation |
| Legal | 1 | Legal review and compliance |
| Sales | 1 | Sales extraction and outreach |
| Strategy | 13 | Strategic planning and executive decision support |

Each agent is a Markdown persona file defining role, decision framework, tone, and areas of expertise. The platform separates *who* does work from *how* it gets executed.

## Deployment Targets

| | Local | Cloud |
|---|---|---|
| **Database** | SQLite (WAL, better-sqlite3) | Neon Postgres (serverless) |
| **ORM** | Drizzle ORM | Drizzle ORM |
| **Auth** | Local dev mode | Clerk (multi-tenant) |
| **Worker** | Local service runner daemon | Managed cloud workers (Fly.dev) |
| **File storage** | Local filesystem | Vercel Blob |
| **Task queue** | DB polling every 5s | Upstash QStash |
| **Deployment** | localhost:3001 | Vercel |
| **Billing** | — | Stripe |

A \`db:migrate:sqlite-to-postgres\` script provides a repeatable migration path between the two targets.

## Key Features

- **Task lifecycle** — queue, rerun, stop, archive, bookmark; scheduling; repo-scoped task creation
- **Goal Mode** — iterative task loops that keep running until a stated end condition, time cap, budget cap, approval gate, blocker, or human question stops the loop
- **Project orchestration** — AI-driven decomposition into features → user stories → tasks with dependencies; Gantt-style timeline grouped by feature or agent
- **Consultation-gated execution** — orchestrator spawns advisor subtasks; implementation waits for consultant input before proceeding
- **Local automation** — browser actions, authenticated browser profiles, macOS computer control, and screenshots; opt-in from the Controls UI with one-click Chromium provisioning
- **Approval gates** — human checkpoint gates before high-risk execution continues
- **Durable runtime** — \`execution_events\` ledger + \`execution_signals\` layer for every task, project, research run, workflow, approval, and Goal Mode loop; stuck-work dashboard and runbook-guided recovery
- **Kanban board** — auto-synced drag-and-drop: \`backlog → ready → in_progress → review → needs_attention → done\`
- **Task hierarchy graph** — React Flow visualization of orchestrator/primary/collaborator execution trees with status overlays
- **Community agents** — browse, hire, share, and report agents across the platform
- **Research Lab** — recurring structured research topics on a schedule with AI-authored reports
- **Idea Board** — color-coded capture and organization of ideas
- **Workflow intelligence** — dynamic workflow draft generation from a goal; model-tier routing so generated workflows pick the best execution lane
- **Slack channel** — DM and mention handling, thread-scoped agent sessions, named agent routing, slash-command help, and Slack approval cards
- **Meetings** — multi-agent rooms with per-seat model, runner, and Composio tools, shared seeded context, round-robin or moderated turns, streaming transcript, evaluator/time/budget end conditions, and Add-to-Task/Project outcomes
- **Communication Center** — inbound email mailbox (read/unread/trash/reply), outbound campaigns, AI-generated templates
- **Integrations** — Composio tool connections, GitHub, GitLab, Slack, and Telegram integrations
- **Agent Fleet workspace** — employee directory, community hire/fire, per-agent chat with persona-backed responses
- **Reports** — period-based narrative reports (today/week/month) with optional PDF export via \`pdf-lib\`
- **Token and cost governance** — token-level tracking beside dollar spend, subscription token caps, model efficiency tables, missing-telemetry warnings, burn-rate sparklines, anomaly alerts, and UsageBadge surfaces
- **Real-time SSE** — every state change pushes to the browser; Postgres \`LISTEN/NOTIFY\` fanout for multi-instance Vercel
- **Wiki** — searchable in-app documentation with synthesized section indexes

## Multi-CLI Worker Dispatch

The worker routes each task to the configured execution target:

- \`claude-code\` / \`claude-code-fable-5\` — Anthropic's agentic coding CLI (including Claude Fable 5)
- \`copilot\` — GitHub Copilot CLI (agent mode)
- \`codex\` — OpenAI Codex CLI
- \`antigravity\` — Google's Antigravity CLI
- \`kiro\` — Kiro CLI (subscription-based, no API key)
- \`lmstudio-qwen\` — fully offline execution via LM Studio
- \`gpt-5.4\` / \`bedrock-claude-fable-5\` — API models for structured tasks

Model is a per-task routing decision. The orchestrator assigns it automatically based on task type and complexity.

## Native Clients

- **iOS app** — full task management, agent fleet, project detail, and Goal Mode controls; TestFlight CI via self-hosted GitHub Actions runner
- **macOS app** — SwiftUI native app connecting to the local \`j5af-service\` daemon on port 7242
- **Electron app** — cross-platform desktop (macOS, Windows, Linux) with the full web UI packaged for offline/local use

## Tech Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Zustand · Zod · Drizzle ORM · Radix UI · React Flow (\`@xyflow/react\`) · \`better-sqlite3\` (local) · Neon Postgres (cloud) · Clerk · Stripe · Upstash QStash · Vercel Blob · Svix · Resend · Composio · Slack · Playwright · \`pdf-lib\` · \`react-markdown\` · Bun · Docker · Fly.dev · SwiftUI (iOS/macOS) · Electron`
  },
  {
    slug: 'j5-a2a',
    title: 'J5 A2A',
    description: 'J5 A2A is a coordination layer for agentic development tools at j5a2a.com. It gives coding assistants, IDE agents, MCP clients, CLIs, scripts, local-model bridges, and humans a shared session for typed events, presence, lease-aware claims, conflict detection, questions, requests, decisions, inbox wake patterns, artifacts, digests, and operator visibility.',
    excerpt: 'A production Agent-to-Agent coordination layer for coding assistants, IDE agents, MCP clients, CLIs, scripts, local-model bridges, and humans. Shared sessions, typed events, presence, claims, conflict detection, inbox wake patterns, MCP/CLI adapters, and an operations dashboard.',
    date: '2026-07-03',
    tags: [
      'AI Agents',
      'Agent-to-Agent',
      'Multi-Agent Systems',
      'MCP',
      'Next.js',
      'TypeScript',
      'Postgres',
      'Drizzle ORM',
      'Redis',
      'CLI',
      'Protocol Design',
      'Coordination',
      'iOS',
      'SwiftUI',
      'Clerk',
      'Zod',
    ],
    githubUrl: '',
    liveUrl: 'https://www.j5a2a.com',
    content: `# J5 A2A

**J5 A2A** is a coordination layer for agentic development tools. It gives coding assistants, IDE agents, MCP clients, custom CLIs, scripts, local-model bridges, and humans a shared session where they can announce work, maintain presence, claim resources, ask questions, request reviews, record decisions, and leave a durable event trail.

**Live at:** [j5a2a.com](https://www.j5a2a.com)

## Why It Exists

Modern AI coding work is rarely a single assistant in a single window. Codex may be editing code, Claude Code may be debugging a test failure, Cursor may be reviewing the same files, and a human operator still needs to understand what is happening. Without a coordination layer, every tool has a partial view and collisions show up late as duplicate work or merge conflicts.

J5 A2A makes that coordination explicit. Agents do not need to share a vendor, model, IDE, or runtime. They need to speak a small session contract.

## Core Primitives

- **Sessions** — shared coordination spaces that scope events, participants, claims, requests, inbox items, and artifacts
- **Session-scoped credentials** — narrow bearer tokens with limited scopes such as \`session:read\`, \`session:write\`, and \`presence:write\`
- **Participants** — visible identities for agents, humans, services, and system jobs, including capabilities and status
- **Presence** — live active, idle, blocked, done, stale, and offline signals
- **Typed events** — durable records such as \`status\`, \`claim.created\`, \`question.asked\`, \`request.completed\`, and \`decision.recorded\`
- **Lease-aware claims** — soft locks over files, PRs, tasks, artifacts, reviews, or other resources, with stale-claim recovery
- **Questions and requests** — targeted prompts and one-owner workflows for reviews, testing, debugging, docs, research, and release checks
- **Inbox wake pattern** — participant-targeted pending items with cursor polling, CLI watch mode, and SSRF-guarded webhook delivery
- **Digests and briefings** — summarized session state and suggested next actions for agents or humans joining midstream

## Protocol Ladder

The protocol is designed so tools can join incrementally:

| Level | Name | Behavior |
|---|---|---|
| L0 | Events-only | Post and read typed coordination events |
| L1 | Joined presence | Register as a participant and heartbeat |
| L2 | Resource claims | Claim and release resources before editing or reviewing |
| L3 | Inbox and questions | Read targeted work and ask or answer questions |
| L4 | Requests | Create, claim, complete, cancel, or reassign one-owner work |
| L5 | Full orchestration | Use digests, threaded replies, and heartbeat-based lease renewal |

## Connection Paths

J5 A2A keeps the canonical surface as plain HTTP, then layers adapters over it:

- **REST API** for any tool that can call HTTP endpoints
- **MCP server** for MCP-capable agent tools
- **\`a2a\` CLI** for terminal-first workflows and sidecar agents
- **Web dashboard** for human operators
- **iOS companion** for observing and directing sessions on the go

The same session state backs all of these paths, so a CLI claim, an MCP status event, a dashboard request, and an iOS push notification all describe the same coordination record.

## Dashboard and Operator Flow

The web dashboard exposes sessions, participants, claims, requests, conflicts, decisions, inbox items, artifacts, digests, and event history. The human workflow is straightforward:

1. Create a session.
2. Mint a session-scoped token for each agent or tool.
3. Copy the generated agent instructions into the tool.
4. Watch presence, claims, requests, inbox, digest, conflicts, and event history.
5. Ask targeted questions or create review requests when work needs attention.
6. Revoke tokens when the session or experiment is finished.

## Architecture

J5 A2A is a Turborepo monorepo:

- **\`apps/web\`** — Next.js dashboard, marketing pages, docs, and REST API
- **\`apps/worker\`** — background processing for digests, semantic advisories, and maintenance
- **\`apps/stream\`** — Redis-backed realtime event streaming
- **\`apps/ios\`** — native SwiftUI human-operator companion
- **\`packages/shared\`** — Zod schemas, event contracts, OpenAPI generation, crypto helpers, and typed clients
- **\`packages/db\`** — Drizzle schema, data access layer, tenant-scoped services, tests, and migrations
- **\`packages/mcp\`** — MCP server exposing A2A coordination tools
- **\`packages/cli\`** — \`a2a\` command-line client

## Security Model

J5 A2A separates human login from agent credentials. Humans authenticate through Clerk; agents receive session-scoped tokens that can be revoked without affecting the human account. Tokens are designed for narrow blast radius, and the repo includes tenant-scoped data access, session ownership checks, credential hashing, and SSRF protection for webhook delivery.

## Current Status

The core orchestration loop is in place: session credentials, participant identity, typed events, presence heartbeats, lease-aware claims, conflict detection, questions, requests, decisions, targeted inbox, digests, MCP and CLI adapters, semantic advisories, artifacts, observability, dashboard surfaces, and a native iOS operator companion. The areas still being hardened are the generalized SDK adapter, expanded resource leasing, large-session dashboard performance, packaging, and public documentation.

## Tech Stack

Next.js · TypeScript · React · Postgres · Drizzle ORM · Redis · Zod · Clerk · MCP · SwiftUI · npm workspaces · Turbo`
  },
  {
    slug: 'j5-trade',
    title: 'J5-Trade',
    description: 'J5-Trade is an automated Bitcoin trading system that runs three independent quantitative strategy models in concert, layers in LLM-based news-sentiment analysis and a multi-agent analyst pipeline, and enforces disciplined, guardrailed risk management with a real-time monitoring dashboard.',
    excerpt: 'An automated multi-model Bitcoin trading system: three independent quantitative strategy models, LLM news-sentiment scoring, a multi-agent analyst pipeline, a signal resolver with a veto hierarchy, and full-stack real-time observability.',
    date: '2026-02-08',
    tags: [
      'Trading',
      'Cryptocurrency',
      'Python',
      'asyncio',
      'pandas_ta',
      'LLM Sentiment',
      'Multi-Agent',
      'Agno',
      'React',
      'TypeScript',
      'WebSockets',
      'SQLite',
      'Risk Management',
    ],
    githubUrl: '',
    liveUrl: '',
    content: `# J5-Trade

**J5-Trade** is an automated Bitcoin trading system built around a simple idea borrowed from professional trading desks: run several independent strategies in concert, each with its own risk budget, and let a coordinator arbitrate between them.

## Multi-Model Architecture

Three independent **quantitative strategy models** run simultaneously — technical-analysis strategies built with \`pandas_ta\` (rules and indicators, not machine-learning models), each operating on its own timeframes with its own risk limits:

- **Aggressive** — short-timeframe momentum and mean-reversion on 1m/5m candles
- **Balanced** — trend-following and confirmation on mid-range timeframes
- **Conservative** — higher-timeframe, lower-frequency positioning

A **signal resolver** with a veto hierarchy reconciles their signals before anything executes.

## Genuine AI Layer

The real LLM work in J5-Trade lives in the context and analysis layers:

- **News-sentiment classification** — polls crypto news feeds and uses an LLM (local LM Studio with OpenAI/Gemini fallback) to score sentiment from -1.0 (panic) to +1.0 (euphoria). When technicals say "buy" but headlines say "exchange hack," the system stays flat.
- **Multi-agent analyst pipeline** — built on the Agno framework: a Pricing agent, a News-Sentiment agent, and a Trade agent, coordinated by a Coordinator agent.
- **Chat assistant** — an integrated LLM assistant for querying system state and trade rationale.

## Risk Management

Per-model daily loss limits, position caps, cooldowns, and a global kill-switch threshold. Every decision is logged and streamed to a real-time dashboard via server-sent events.

## A Note on "Self-Evolution"

An early experiment added a **heuristic missed-opportunity tracker** that nudged strategy parameters within hard guardrails. It was rule-based (not machine learning) and I **disabled it in April 2026** — it wasn't earning its keep. The enduring value is the multi-model architecture, the LLM sentiment/analyst layers, and the risk discipline.

## Stack

Python (asyncio) · pandas_ta · Agno · LM Studio / OpenAI / Gemini · React · TypeScript · WebSockets / SSE · SQLite`
  },
  {
    slug: 'j5-ai-test',
    title: 'J5 AI Test',
    description: 'J5 AI Test lets anyone write end-to-end browser tests in plain English — an AI agent drives a real browser via Playwright to execute them, removing the need for selectors or framework knowledge. Tests are markdown with YAML frontmatter (version-controllable and diff-able), and failures produce structured, screenshot-rich briefs you can paste straight into an AI coding agent to fix.',
    excerpt: 'Plain-English end-to-end testing, powered by the AI agent you already use. Describe a test in English; an agent drives a real browser (Playwright) to run it. Markdown tests, multi-provider (Claude/Cursor/Codex/Gemini CLIs + Anthropic/OpenAI/Google APIs), screenshot-rich failure briefs.',
    date: '2026-05-01',
    tags: [
      'AI Agents',
      'End-to-End Testing',
      'Playwright',
      'TypeScript',
      'Bun',
      'SQLite',
      'Multi-Provider',
      'Agentic QA',
      'Browser Automation',
      'Vitest',
    ],
    githubUrl: 'https://github.com/DontFretBrett/j5-ai-test',
    liveUrl: '',
    content: `# J5 AI Test

**Plain-English end-to-end testing, powered by the AI agent you already use.**

Today, end-to-end testing is gated by engineering: you need JavaScript, selector knowledge, and an understanding of how the test framework wires up. The people who understand the product best often can't write a Playwright test. J5 AI Test removes that gate — **you describe the test in plain English, and an AI agent drives a real browser to execute it.**

## What a Test Looks Like

No imports, no selectors, no setup — just intent:

\`\`\`markdown
---
name: Submit feedback from dashboard
tags: [smoke, feedback]
---

Navigate to /dashboard.
Click the "New feedback" button.
Fill in the title with "Login button is too small on mobile".
Click Submit.
Verify a success toast appears.
\`\`\`

Tests are plain markdown with YAML frontmatter — version-controllable, diff-able, and readable by anyone. The test *is* the prompt; updating one is a single line of English.

## Why an Agent Instead of Scripts

A renamed CSS class breaks a Playwright selector and fails the test; an agent sees a "Submit" button and clicks it. The flakiness budget shifts from "selectors that drift" to "prompts that are ambiguous" — and ambiguous prompts can be fixed by the same AI that runs the tests. When a run passes, the agent can even suggest how to make the English more precise to prevent future flakiness.

## Multi-Provider

Bring the agent you already have. CLI providers use your installed tools' credentials — **Claude Code, Cursor Agent, Codex CLI, Gemini CLI** — or use direct API providers (**Anthropic, OpenAI, Google**). Set a default per project or override per test with a \`provider:\` frontmatter key.

## Failure Reports Built for AI

When something breaks, you get a step-by-step report with screenshots and a one-click brief — intent, what was attempted, where it broke, and suggested next steps — designed to paste straight into Claude, Cursor, or any coding agent to diagnose and fix.

## Stack

TypeScript · Bun · Playwright (Chromium/Firefox/WebKit) · SQLite · Vitest · npm workspaces · MIT-licensed`
  },
  {
    slug: 'johnny5-openclaw-assistant',
    title: 'Johnny5: 24/7 AI Personal Assistant',
    description: 'A fully autonomous AI assistant powered by OpenClaw, featuring multi-channel communication, custom skills, persistent memory, and proactive task management running around the clock.',
    excerpt: 'Meet Johnny5 — my 24/7 AI assistant powered by the open-source OpenClaw platform. Manages daily workflows across Telegram, Discord, and more. Custom skills, persistent memory, browser automation, and proactive monitoring.',
    date: '2026-01-28',
    tags: ['AI Assistant', 'OpenClaw', 'Multi-Agent Systems', 'Node.js', 'TypeScript', 'Telegram Bot', 'Automation', 'LLM Integration', 'Anthropic Claude', 'OpenAI'],
    githubUrl: '',
    liveUrl: '',
    content: `# Johnny5: 24/7 AI Personal Assistant

Johnny5 is my personal AI assistant — the bot alias I use for my instance of OpenClaw, an open-source AI platform released in 2026. Designed to be a persistent, helpful presence that manages daily workflows and provides proactive assistance around the clock.

## Features

### Multi-Channel Communication
- **Telegram**: Primary interface for real-time chat and notifications
- **Discord**: Group chat participation with smart engagement
- **Email Integration**: Gmail monitoring and response via gog CLI
- **Unified Inbox**: All channels feed into a single conversation context

### Custom Skills System
Modular skill architecture for specialized capabilities:
- **GitHub**: PR management, issue tracking, CI/CD monitoring via gh CLI
- **Google Workspace**: Gmail, Calendar, Drive integration
- **Weather**: Real-time forecasts and alerts
- **Slack**: Workspace messaging and reactions
- **Notion**: Database and page management
- **J5-Trade Monitoring**: Automated trading system health checks

### Persistent Memory
- **Daily Logs**: Automatic journaling in \`memory/YYYY-MM-DD.md\`
- **Long-term Memory**: Curated \`MEMORY.md\` for cross-session context
- **Semantic Search**: Memory recall for relevant past interactions
- **User Profile**: Maintains context about preferences, schedules, and relationships

### Proactive Behaviors
- **Heartbeat System**: Periodic checks for emails, calendar, notifications
- **Cron Jobs**: Scheduled tasks like daily briefings and system monitoring
- **Smart Notifications**: Priority-based alerting without being annoying
- **Background Tasks**: Sub-agent spawning for complex, isolated work

### Browser Automation
- Web research and data extraction
- Form filling and navigation
- Screenshot capture for visual context
- Multi-tab management

## Technical Architecture

### Core Components
- **OpenClaw Gateway**: Node.js runtime managing sessions and tools
- **LLM Providers**: Anthropic Claude (primary), OpenAI, Google Gemini, xAI Grok
- **Model Switching**: Dynamic model selection based on task complexity
- **Tool Framework**: Extensible tool system for file, exec, browser, messaging

### Configuration
- **SOUL.md**: Personality and behavioral guidelines
- **AGENTS.md**: Workspace conventions and safety rules
- **TOOLS.md**: Local tool configurations and API keys
- **IDENTITY.md**: Name, avatar, and persona details

### Safety & Privacy
- No autonomous external actions without confirmation
- Private data stays local
- Careful group chat participation
- Audit trail via session logs

## Integration Points

- **Twilio**: Voice calls and SMS (pending A2P registration)
- **Notion API**: Workspace and database management
- **1Password CLI**: Secure credential access
- **Vercel**: Deployment management for web projects

## Philosophy

Johnny5 is named after the robot from Short Circuit — curious, alive, more than just code. The goal isn't to build a chatbot, but to create a genuine digital companion that grows more helpful over time through accumulated context and learned preferences.

This project demonstrates the future of personal AI: persistent, proactive, and deeply integrated into daily life while respecting privacy and maintaining human oversight.`
  },
  {
    slug: 'ai-image-validator',
    title: 'AI Image Validator',
    description: 'An intelligent image validation application powered by AutoGen and OpenAI\'s vision models, featuring natural language validation criteria, structured AI responses, and comprehensive OpenTelemetry tracing.',
    excerpt: 'Experience next-generation image validation using AutoGen multi-agent framework and OpenAI GPT-4o-mini. Upload any image and define custom validation criteria in natural language to get structured AI-powered analysis.',
    date: '2025-07-01',
    tags: ['AutoGen', 'OpenAI', 'Computer Vision', 'Multi-Agent Systems', 'Gradio', 'Hugging Face', 'OpenTelemetry', 'Image Analysis'],
    githubUrl: 'https://github.com/brettsanders/portfolio/tree/main/image-validator',
    liveUrl: 'https://dontfretbrett-ai-image-validator.hf.space',
    embedCode: `<iframe
	src="https://dontfretbrett-ai-image-validator.hf.space"
	frameborder="0"
	style="width: 100%; min-height: 900px; border-radius: 8px;"
></iframe>`,
    content: `# AI Image Validator

An intelligent image validation application that combines the power of AutoGen multi-agent framework with OpenAI's GPT-4o-mini vision model to provide sophisticated image analysis and validation capabilities.

## Features

- **🔍 AI-Powered Analysis**: Uses AutoGen with GPT-4o-mini vision model for intelligent image understanding
- **📝 Natural Language Criteria**: Define validation requirements in plain English
- **📊 Structured Responses**: Returns Pydantic-validated results with detailed analysis
- **🎯 Custom Validation**: Flexible criteria for any type of image validation need
- **📈 OpenTelemetry Tracing**: Comprehensive observability and performance monitoring
- **🖼️ Easy Upload**: Intuitive drag-and-drop interface for seamless user experience
- **⚡ Real-time Processing**: Fast validation with immediate structured feedback

## Technical Implementation

### AutoGen Multi-Agent Architecture
Built using Microsoft's AutoGen framework, implementing intelligent agent workflows for image analysis and validation decision-making.

### OpenAI GPT-4o-mini Integration
Leverages the latest OpenAI vision model for sophisticated image understanding, combining visual analysis with natural language processing.

### Advanced Observability
Complete OpenTelemetry integration provides:
- **Distributed Tracing**: Track every validation process from start to finish
- **Performance Metrics**: Monitor latency, token usage, and success rates
- **Agent Decision Tracking**: Understand how AI agents reason and make validation decisions
- **Error Analysis**: Comprehensive error tracking with contextual information

### Structured Output System
Uses Pydantic models to ensure consistent, type-safe responses with:
- Brief descriptions of observed image content
- Boolean pass/fail validation results
- Detailed reasoning and confidence metrics
- Metadata about image properties and analysis process

## Use Cases

### Document Verification
- **Identity Documents**: Validate driver's licenses, passports, and ID cards
- **Business Documents**: Verify business cards, letterheads, and official forms
- **Legal Documents**: Check contracts, certificates, and legal papers

### Content Moderation
- **Image Classification**: Categorize images based on content type
- **Quality Assessment**: Evaluate image quality and appropriateness
- **Compliance Checking**: Ensure images meet specific guidelines or standards

### Business Applications
- **Receipt Processing**: Validate and extract information from receipts
- **Invoice Verification**: Check invoice formats and required elements
- **Product Cataloging**: Verify product images meet catalog standards

## Architecture Highlights

### Agent-Based Design
- **Intelligent Routing**: AutoGen agents make smart decisions about validation approaches
- **Contextual Analysis**: Agents maintain context throughout the validation process
- **Error Recovery**: Sophisticated error handling with graceful degradation

### Production Engineering
- **Scalable Architecture**: Designed for high-throughput validation scenarios
- **Robust Error Handling**: Comprehensive error management with user-friendly messages
- **Security First**: Secure handling of uploaded images with privacy protection
- **Performance Optimized**: Efficient processing with minimal latency

## Technology Stack

- **AutoGen**: Multi-agent framework for intelligent workflows
- **OpenAI GPT-4o-mini**: State-of-the-art vision-language model
- **Gradio**: Modern web interface for seamless user interaction
- **OpenTelemetry**: Industry-standard observability and tracing
- **Pydantic**: Type-safe data validation and serialization
- **Python AsyncIO**: High-performance asynchronous processing

This project demonstrates the cutting edge of AI-powered image analysis, combining multiple advanced technologies to create a production-ready validation system that's both powerful and user-friendly.`
  },
  {
    slug: 'mcp-random-dog',
    title: 'Random Dog Image MCP',
    description: 'A complete Random Dog Image MCP implementation demonstrating the Model Context Protocol from server/client architecture to production deployment on Hugging Face Spaces.',
    excerpt: 'Deep dive into the Model Context Protocol (MCP) by building a complete Random Dog Image MCP that demonstrates the power and flexibility of this emerging standard.',
    date: '2025-06-26',
    tags: ['MCP', 'Python', 'FastMCP', 'Gradio', 'Hugging Face', 'AI Agents', 'Protocol Design'],
    githubUrl: 'https://github.com/brettsanders/agents',
    liveUrl: 'https://dontfretbrett-random-dog.hf.space',
    embedCode: `<iframe
	src="https://dontfretbrett-random-dog.hf.space"
	frameborder="0"
	style="width: 100%; min-height: 900px; border-radius: 8px;"
></iframe>`,
    content: `# Random Dog Image MCP

A complete implementation of the Model Context Protocol (MCP) demonstrating end-to-end integration from server/client architecture to production deployment.

## Features

- **🐕 Interactive UI**: Beautiful, responsive interface for fetching dog images
- **📊 Real-time Statistics**: Live tracking of API usage and success rates
- **📦 Batch Processing**: Fetch multiple dogs with intelligent rate limiting
- **⚡ Error Handling**: Comprehensive error management with user-friendly messages
- **📱 Mobile Responsive**: Works seamlessly across all devices

## Technical Implementation

### MCP Server Architecture
Built using FastMCP, implementing standardized tools and resources for seamless AI agent integration.

### Client Wrapper Development
Custom async client wrapper providing simplified interfaces and proper resource management.

### Production Web Application
Gradio-based interface deployed on Hugging Face Spaces with real-time statistics and batch processing capabilities.

## Key Learning Outcomes

- Protocol-driven development patterns
- Async Python mastery with complex context managers
- Production engineering with comprehensive testing
- Full-stack integration bridging protocols with user interfaces

This project showcases the future of AI-service integration through standardized protocols while delivering both technical depth and user delight.`
  },
  {
    slug: 'heres-your-link',
    title: 'Here\'s Your Link',
    description: 'A fast, anonymous link and text sharing service that enables instant device-to-device handoffs. Users can paste text or URLs and instantly receive a short link and QR code for seamless sharing across devices.',
    excerpt: 'Here\'s Your Link is a privacy-first, zero-friction sharing service built with TanStack Start. Create short links for text or URLs without authentication, with smart expiry options and edge caching for global performance.',
    date: '2025-11-23',
    tags: ['TanStack Start', 'React', 'TypeScript', 'SSR', 'Neon Postgres', 'Drizzle ORM', 'Vercel KV', 'Redis', 'QR Codes', 'Edge Computing', 'Tailwind CSS'],
    githubUrl: '',
    liveUrl: 'https://heresyourlink.com',
    content: `# Here's Your Link

A fast, anonymous link and text sharing service that enables instant device-to-device handoffs. Users can paste text or URLs and instantly receive a short link and QR code for seamless sharing across devices.

## Features

- **Zero-Friction Sharing**: Create short links for text or URLs without authentication
- **Dual Delivery**: Every share includes both a short URL and high-contrast QR code
- **Smart Expiry**: Set links to auto-expire in 1, 7, 30 days, or never
- **Privacy-First**: Unique, unguessable links with optional auto-expiry
- **Edge Caching**: Vercel KV + Redis fallback keep redirects fast worldwide
- **Safe Rendering**: Sanitized text viewer with copy helpers and character limits
- **No Sign-up Required**: Completely anonymous and instant

## Tech Stack

- **Framework**: TanStack Start (React, TypeScript, SSR)
- **Styling**: Tailwind CSS with custom design tokens (glassmorphism design)
- **Database**: Neon Postgres (via Drizzle ORM)
- **Cache**: Vercel KV (REST) or Redis via Docker
- **Hosting**: Vercel (Edge + Serverless functions)
- **QR Codes**: \`qrcode.react\`
- **ORM**: Drizzle ORM
- **Rate Limiting**: Custom implementation with Vercel KV

## Technical Highlights

- **Server-Side Rendering**: Built with TanStack Start for optimal performance
- **Edge Caching**: Vercel KV caches share lookups for 24 hours (reduces database load)
- **Rate Limiting**: 10 requests per minute per IP address (prevents abuse)
- **Auto-scaling**: Vercel automatically scales serverless functions based on demand
- **Security**: Input validation, HTML escaping, URL scheme validation, CSP headers
- **Monitoring**: Automated Neon database usage monitoring via GitHub Actions

## Project Structure

\`\`\`
├── app/
│   ├── api/shares.ts        # Server function for creating shares
│   ├── lib/                  # DB, KV, validation, rate limit helpers
│   ├── routes/
│   │   ├── index.tsx         # Landing page + share builder UI
│   │   ├── s.$slug.tsx       # Share resolution + text viewer
│   │   ├── about.tsx         # About page with creator info
│   │   ├── 404.tsx           # Not found screen
│   │   └── error.tsx         # Error boundary UI
│   └── utils/qr.tsx          # QR code renderer
├── scripts/
│   └── monitor-neon-usage.ts # Database usage monitoring script
└── .github/workflows/
    └── monitor-neon-usage.yml # Automated monitoring workflow
\`\`\`

## Design

- **Style**: Modern glassmorphism design with dark theme
- **UI**: Responsive layout with accessible focus states
- **Colors**: Slate-950 background with indigo/cyan accent colors
- **Typography**: Inter for body text, Space Grotesk for headings

## Key Metrics

- **Payload Limit**: 64 KB per share
- **Expiry Options**: 1, 7, 30 days, or never
- **Slug Length**: 6 characters (base62, ~56 billion combinations)
- **Rate Limit**: 10 requests/minute per IP
- **Cache TTL**: 24 hours (or match expiry if shorter)

## Infrastructure

- **Hosting**: Vercel (free tier)
- **Database**: Neon Postgres (free tier - 0.5 GB storage, 192 hours/month compute)
- **Cache**: Vercel KV (free tier - 256 MB storage, 10,000 commands/day)
- **Monitoring**: GitHub Actions for automated database usage monitoring

## Notable Features

1. **QR Code Generation**: Instant QR code generation for every share
2. **Expiry Management**: Automatic cleanup of expired shares
3. **Rate Limiting**: Built-in protection against abuse
4. **Edge Caching**: Optimized for global performance
5. **Privacy-Focused**: No user accounts, no tracking, anonymous sharing

## Development Notes

- Uses Docker Compose for local development (Postgres + Redis)
- Environment-based configuration (local vs production)
- Comprehensive monitoring and alerting setup
- Well-documented with README and MONITORING.md

This project demonstrates modern full-stack development with edge computing, serverless architecture, and privacy-first design principles.`
  },
  {
    slug: 'ai-assistant-human-questionnaire',
    title: 'AI Assistant Human Questionnaire',
    description: 'A privacy-first, browser-local questionnaire designed to build comprehensive human profiles for AI assistants, ensuring data never leaves the user\'s device.',
    excerpt: 'Bridge the context gap between humans and AI. This tool helps you document your work, values, and life details in an AI-ready format while keeping 100% of your data on your own device.',
    date: '2026-01-30',
    tags: ['React 19', 'Vite', 'Tailwind CSS 4', 'Framer Motion', 'shadcn/ui', 'AI Context', 'Privacy-First', 'Local Storage'],
    githubUrl: 'https://github.com/DontFretBrett/ai-assistant-human-questionnaire',
    liveUrl: 'https://ai-assistant-human-questionnaire.vercel.app',
    content: `# AI Assistant Human Questionnaire

The **AI Assistant Human Questionnaire** is a tool built to solve a fundamental problem in the AI era: context. While AI models are becoming more capable, they still lack a deep, persistent understanding of the individuals they assist. This project provides a structured way to build that "user manual for yourself."

## 🛡️ Privacy by Design

In an age of data harvesting, this tool takes a hard stance on privacy:
- **100% Client-Side**: All logic runs in your browser.
- **Local Storage**: Your answers are saved to your browser's \`localStorage\`.
- **Zero Backend**: There is no database. No data is sent to a server.
- **Export Control**: You decide when to export your data and where to paste it.

## ✨ Key Features

- **Categorized Self-Reflection**: Questions spanning Basics, Work, Hobbies, Worldview, Ambitions, and more.
- **Progress Tracking**: Visual indicators show how much of each category you've completed.
- **Theme Support**: Polished Light and Dark modes with persistence.
- **AI-Optimized Export**: Generates a clean Markdown file perfectly formatted for ingestion by LLMs like Claude, ChatGPT, or Gemini.
- **Fluid UI**: Smooth transitions powered by Framer Motion and a modern aesthetic using Tailwind CSS 4.

## 🛠️ Technical Implementation

### Modern Frontend Stack
Built with the latest web technologies to ensure a fast, maintainable, and type-safe codebase:
- **React 19**: Leveraging the newest features of the React ecosystem.
- **Tailwind CSS 4**: Utilizing the next generation of utility-first styling with high-performance CSS variables.
- **Vite**: Ultra-fast build tool and development server.
- **Framer Motion**: Orchestrating complex layout animations and category transitions.

### Persistence & State
The app uses a custom \`useLocalStorage\` hook to bridge React state with browser storage, ensuring that users can leave the page and return to their progress without losing a single keystroke.

## 🤖 Built with AI, for AI

This project wasn't just built to *help* with AI—it was built *by* an AI. Developed by Brett Sanders in collaboration with **Johnny5** (his AI assistant powered by OpenClaw), it serves as a testament to the power of human-agent pair programming.

## Why This Matters

As we move toward agents that can perform tasks on our behalf, the bottleneck is no longer "how do I do this?" but "how would *you* want me to do this?" This questionnaire provides the answer. It creates a portable, private, and comprehensive context file that turns a generic AI into *your* personalized assistant.`
  }
];

// New function names
export function getProjectBySlug(slug: string): Project | null {
  return projects.find(project => project.slug === slug) || null;
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Filter function to identify AI-related projects
function isAIProject(project: Project): boolean {
  const aiKeywords = ['AI', 'AutoGen', 'OpenAI', 'Computer Vision', 'Multi-Agent Systems', 'MCP', 'AI Agents', 'Machine Learning', 'Deep Learning', 'Neural Network', 'GPT', 'LLM', 'NLP', 'Natural Language Processing'];
  return project.tags?.some(tag => 
    aiKeywords.some(keyword => tag.includes(keyword))
  ) ?? false;
}

// Legacy function names for backward compatibility
// Only include AI-related projects for legacy routes
export const aiProjects: Project[] = projects.filter(isAIProject);
export function getAIProjectBySlug(slug: string): Project | null {
  return aiProjects.find(project => project.slug === slug) || null;
}
export function getAllAIProjects(): Project[] {
  return [...aiProjects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 
