---
title: "J5 Agent Fleet: Building a Production Multi-Agent Orchestration Platform"
date: "2026-04-01"
tags: ["AI Agents", "Multi-Agent Systems", "Next.js", "TypeScript", "SQLite", "Neon Postgres", "Drizzle ORM", "Orchestration", "LLM Routing", "GitHub OAuth", "SSE", "Kanban", "Claude Code", "GitHub Copilot CLI"]
excerpt: "How I designed and built J5 Agent Fleet — a production-grade, full-stack platform for operating 65 specialized AI agents across 9 divisions, with consultation-gated orchestration, multi-CLI routing, project decomposition, Kanban visibility, and dual deployment targets: local SQLite and cloud Neon Postgres."
description: "Deep dive into J5 Agent Fleet: a standalone production platform for orchestrating 65 specialized AI agents across 9 divisions. Built with Next.js, TypeScript, SQLite/Neon Postgres, Drizzle ORM, GitHub OAuth, SSE, and a multi-CLI worker routing to Claude Code, Copilot CLI, Codex, and Gemini CLI."
keywords: "J5 Agent Fleet, multi-agent orchestration, AI agent platform, Next.js, TypeScript, SQLite, Neon Postgres, Drizzle ORM, Claude Code, GitHub Copilot CLI, OpenAI Codex, Gemini CLI, agent fleet, LLM routing, consultation-gated execution, project orchestration, Brett Sanders"
---

Most "agentic" systems are one-shot wrappers with better marketing copy.

You send a prompt. You get a result. You hope it's right. And when it isn't — when the task was complex, or cross-functional, or depended on prior work — there's no way to understand what actually happened.

That's the gap **J5 Agent Fleet** is built to close.

> See the project overview here: [J5 Agent Fleet project page](/ai-projects/j5-agent-fleet).

J5 Agent Fleet is a standalone, full-stack production platform for operating a structured team of **65 specialized AI agents across 9 divisions**. It combines a Next.js operator UI, a SQLite or cloud Postgres-backed operational store, and a managed worker runtime that dispatches agent tasks via Claude Code, GitHub Copilot CLI, OpenAI Codex, Gemini CLI, LM Studio, and GPT API.

This post walks through the architecture, the design decisions that shaped it, and why each piece exists.

---

## The Problem Worth Solving

Before building anything, I defined the questions I wanted the platform to answer:

- How does an idea become tracked, delegated work?
- How do you decide which agent — out of 65 — should own a given task?
- How do you bring in specialist feedback without turning execution into chaos?
- How do you know what a model actually did after it ran?
- How do you keep a multi-CLI system observable in real time?

These aren't questions that single-prompt demos answer. They're operational problems. And they require operational infrastructure.

---

## Two Deployments, One Platform

J5 Agent Fleet ships as two distinct deployment targets built on the same codebase:

**Local (SQLite)** — a self-contained instance running entirely on localhost. The database is SQLite in WAL mode. The worker is a detached poller process started alongside the Next.js app. No external dependencies required.

**Cloud (Neon Postgres + Drizzle ORM)** — a containerized deployment targeting Neon's serverless Postgres. The schema is managed with Drizzle ORM. A dedicated `Dockerfile.worker` separates the task worker from the web process, making both independently scalable.

This split was intentional. The local version lets me iterate at maximum velocity: no migration overhead, no connection pooling concerns, no external latency. The cloud version is the production stance: a managed schema, connection pooling, and the ability to run the worker and UI independently.

Running the same application on both targets also enforced a clean abstraction boundary. The core platform logic — orchestration, agent personas, task lifecycle — doesn't care whether the underlying store is SQLite or Postgres. That's a discipline worth maintaining from the start.

---

## The Agent Fleet: 65 Specialists, 9 Divisions

The word "agent" gets overloaded fast. In J5 Agent Fleet, each agent is a **structured persona file** — a Markdown document that defines a specialist's role, decision framework, tone, and areas of expertise.

The fleet is organized into nine divisions:

| Division | Role |
|----------|------|
| **Engineering** | Frontend, backend, DevOps, cloud, mobile, AI engineering, terminal automation |
| **Design** | UX architecture, UI design, brand, visual storytelling, image prompting |
| **Marketing** | Content, social media, growth, Reddit, TikTok, Instagram, app store optimization |
| **Product** | Feedback synthesis, sprint prioritization, trend research |
| **Project Management** | Studio producers, project shepherds, senior PMs, operations, experiment tracking |
| **Testing** | API testing, performance benchmarking, reality checking, evidence collection |
| **Support** | Legal/compliance, finance, infrastructure, analytics, executive summaries |
| **Specialized** | Orchestrator, PDF creation, data consolidation, sales extraction, x-researcher |
| **Strategy** | Cross-cutting advisory and strategic consulting |

Each division maps to a real team function. A task goes to the **best-fit specialist**, not the nearest available model.

This matters more than it sounds. Most multi-agent systems either assign work randomly or always route to the same model. J5 Agent Fleet separates **who** does the work from **how** the work gets executed.

---

## The Worker Runtime: Polling, Persona Loading, Multi-CLI Dispatch

The execution core is deliberately simple:

1. **Worker polls the database** every 5 seconds for queued tasks
2. **Loads the agent persona** from the Markdown file matching the assigned agent
3. **Routes to the correct CLI or API** based on the task's model field
4. **Stores output, updates status**, and publishes an event to the in-memory bus
5. **SSE stream pushes the update** to the browser in real time

Supported execution targets:

- **Claude Code** (`claude-code`) — Anthropic's agentic coding CLI
- **GitHub Copilot CLI** (`copilot`) — GitHub's agent-mode CLI
- **OpenAI Codex CLI** (`codex`) — OpenAI's coding-focused CLI
- **Gemini CLI** (`gemini-cli`) — Google's terminal AI agent
- **LM Studio / local Qwen** (`lmstudio-qwen`) — fully offline execution
- **GPT API** (`gpt-5.4`) — OpenAI API for structured tasks
- **Custom worker CLIs** — extensible dispatch for new agents

The model is not a global setting. It is a **per-task routing decision**, and the orchestrator can make that decision automatically based on task type and complexity.

---

## Project Orchestration: From Brief to Kanban

Project work follows a structured lifecycle:

1. Create a project with a plain-English description
2. Optionally inject context from prior completed projects
3. Call the decomposition endpoint (GPT-5.4 or local Qwen)
4. Platform generates features → user stories → executable tasks with dependencies
5. Only dependency-ready tasks are queued; others wait
6. Orchestrator assigns each task to a specialist agent
7. Advisors are consulted when cross-functional input would help
8. Advisor recommendations are injected into the implementation brief
9. Track progress in the Project Hub, Kanban board, and task detail graph

The decomposition step is where an idea becomes real work. The output isn't a pretty list that lives in chat — it's **persisted records** with dependency relationships and model assignments.

### Consultation-Gated Execution

One of the strongest patterns in the platform: before a task is implemented, the orchestrator can decide that specialist input would improve it.

When that happens:
- Consultation subtasks are created for advisor agents
- A blocking payload is stored on the implementation task
- The implementation task does not start until all consultations complete (or the deadline expires)
- Advisor recommendations are prepended to the implementation task description

The implementing agent receives the original brief **plus** consultant input, already integrated. Consultation isn't decorative — it changes the execution context.

---

## Visibility: Kanban, Task Graphs, and Reports

Execution is half the story. The other half is what you can see.

**Kanban board** with auto-synced columns:
- `backlog` → `ready` → `in_progress` → `review` → `needs_attention` → `done`

State transitions are automatic. The worker moves tasks as it executes. The board reflects reality, not manual updates.

**Task detail view** shows:
- Full task hierarchy (parent → consultations → delegated subtasks)
- Agent assignment, model used, execution output
- Status history and timeline
- Artifact attachments and downloads

**Reports** generate period-based narratives (today / this week / this month):
- Markdown output with model-generated prose summaries
- Optional PDF export
- Stored history for review

**Costs & usage** tracks OpenAI spend signals, subscription lines, and budget APIs.

---

## The Real-Time Layer: SSE

Live updates work through a **Server-Sent Events stream** at `/api/events/stream`. When a task changes state — queued, picked up, completed, failed — the worker publishes an event to an in-memory bus. The SSE stream broadcasts that event to all connected browser clients.

The browser never polls. It opens the stream once and receives a push for every state change. This keeps the UI snappy without WebSocket overhead or a separate pub/sub broker.

---

## GitHub OAuth and Repository Integration

The platform includes full **GitHub OAuth** for authentication. Once connected:
- Repositories can be cataloged (local paths or GitHub-linked)
- Repo overview, commit activity, and per-repo chat are available
- Tasks can be scoped to a specific repository
- The operator works across repos without switching contexts

This matters because agent work often involves code. The repo layer connects agent tasks to the actual codebases they affect.

---

## The Operator UI: Built for Real Work

The Next.js UI is not a demo dashboard. It includes:

- **Dashboard** — system health, recent activity, quick task creation
- **Agent Fleet** — employee directory with search, favorites, hire/fire, task assignment
- **Task Center** — full task lifecycle with filters, history, rerun, archive, bookmark
- **Projects** — create, manage, and track full project workflows
- **Kanban** — drag-and-drop board with real-time sync
- **Project Chat** — persistent conversations with full project context injected
- **Repositories** — catalog and chat interface
- **Reports** — period narratives, history, PDF export
- **Costs & Usage** — spend and usage tracking
- **Terminal Commands** — direct CLI execution
- **Cron** — scheduled and recurring task management
- **Models** — configuration for connected AI providers
- **Memories** — persistent cross-session agent context

Every view is connected to the SSE stream. State changes push to the browser the moment they happen.

---

## What This Platform Actually Demonstrates

### Architectural discipline at scale
Designing a codebase that runs on SQLite locally and Neon Postgres in cloud without changing core logic requires clean abstractions. Drizzle ORM handles the translation; the application layer doesn't care which database is underneath.

### Agent design as a first-class concern
65 Markdown persona files means 65 opportunities to think carefully about specialist boundaries, decision frameworks, and communication styles. This is knowledge design, not just prompting.

### Consultation as a coordination primitive
The consultation-gated execution pattern is not common. Most orchestration systems skip the "get input before acting" step. J5 Agent Fleet makes it structural: you can't start an implementation task until its advisors have weighed in.

### Multi-CLI dispatch without vendor lock-in
The ability to route the same task to Claude Code, Copilot CLI, Codex, or Gemini CLI — and swap routes without changing application logic — is a practical hedge against model provider churn.

### Real product surface, not a prototype
Reports with PDF export. GitHub OAuth. Per-task artifact downloads. Kanban with auto-sync. Drag-and-drop. Recurring tasks. Persistent project chat. These are product features, not research artifacts.

---

## Why "Local-First" Is a Feature, Not a Constraint

J5 Agent Fleet is **not** a distributed orchestration engine. It is a single-node, human-supervised platform optimized for visibility and development velocity.

That's a deliberate design stance.

By keeping the core system local and inspectable, I can:
- Understand every state transition
- Iterate on orchestration logic without infrastructure overhead
- Keep the workflow grounded in practical developer tooling
- Move to cloud Neon when the persistence requirements demand it

It's a better match for the current state of agentic engineering than pretending that hard autonomy is already solved.

---

## Final Thoughts

If I had to summarize J5 Agent Fleet in one line:

**It turns AI from an isolated assistant into a visible, structured project execution system with a real product surface.**

The challenge I care most about in agentic systems isn't whether a single prompt can look impressive. It's whether a system can:

- plan work
- route work to the right specialist
- enrich execution with cross-functional context
- expose state clearly so a human can supervise
- and stay maintainable as the fleet grows

J5 Agent Fleet is my answer to that challenge — and it's still evolving.
