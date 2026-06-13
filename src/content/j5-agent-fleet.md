---
title: "J5 Agent Fleet: Building a Production Multi-Agent Orchestration Platform"
date: "2026-06-13"
tags: ["AI Agents", "Multi-Agent Systems", "Next.js", "TypeScript", "SQLite", "Neon Postgres", "Drizzle ORM", "Orchestration", "SSE", "React Flow", "Kanban", "Claude Code", "GitHub Copilot CLI", "Docker", "iOS", "SwiftUI", "Electron", "Playwright", "Composio", "Stripe"]
excerpt: "How I designed and built J5 Agent Fleet — a production AI orchestration platform at j5agentfleet.com with 82 agents across 14 divisions, Goal Mode iterative loops, local browser/computer automation, durable runtime, native iOS/macOS/Electron apps, multi-CLI dispatch, and a full product surface for human-supervised agent operations."
description: "Deep dive into J5 Agent Fleet: a production multi-agent platform at j5agentfleet.com — 82 specialized agents across 14 divisions, Goal Mode loops, local browser automation, durable runtime with event ledger and signals, community agents, Research Lab, Idea Board, native iOS/macOS/Electron clients, and multi-CLI dispatch to Claude Code, Copilot CLI, Codex, Gemini CLI, Kiro, and more."
keywords: "J5 Agent Fleet, multi-agent orchestration, AI agent platform, Next.js, TypeScript, SQLite, Neon Postgres, Drizzle ORM, Claude Code, GitHub Copilot CLI, OpenAI Codex, Gemini CLI, Kiro, agent fleet, LLM routing, consultation-gated execution, project orchestration, Goal Mode, durable runtime, local browser automation, iOS, SwiftUI, Electron, Composio, Brett Sanders"
---

Most "agentic" systems are one-shot wrappers with better marketing copy.

You send a prompt. You get a result. You hope it's right. And when it isn't — when the task was complex, cross-functional, or depended on prior work — there's no way to understand what actually happened.

That's the gap **J5 Agent Fleet** is built to close.

> See the project overview: [J5 Agent Fleet project page](/ai-projects/j5-agent-fleet).

J5 Agent Fleet is a production platform for operating a structured team of **82 specialized agents across 14 divisions**. It ships as a Next.js web app, native iOS/macOS apps, and an Electron desktop app — backed by either local SQLite or cloud Neon Postgres — with a local service runner daemon that connects any Mac, Linux, or Windows machine as an execution node dispatching tasks via Claude Code, GitHub Copilot CLI, OpenAI Codex, Gemini CLI, Kiro, LM Studio, and the GPT API.

**Live at:** [j5agentfleet.com](https://j5agentfleet.com)

This post walks through the architecture, the design decisions that shaped it, and why each piece exists.

---

## The Problem Worth Solving

Before building anything, I defined the questions I wanted the platform to answer:

- How does an idea become tracked, delegated work?
- How do you decide which agent — out of 82 — should own a given task?
- How do you bring in specialist feedback without turning execution into chaos?
- How do you know what a model actually did after it ran?
- How do you keep a multi-CLI system observable in real time?
- How do you let work keep iterating toward a goal without burning through budget?
- How do you safely automate browser and computer actions with human oversight?

These aren't questions that single-prompt demos answer. They're operational problems. And they require operational infrastructure.

---

## Two Deployments, One Platform

J5 Agent Fleet ships as two distinct deployment targets built on the same codebase:

**Local (SQLite)** — a self-contained instance running entirely on localhost. The database is SQLite in WAL mode via `better-sqlite3`. The service runner daemon starts alongside the Next.js app. No external dependencies required.

**Cloud (Neon Postgres + Drizzle ORM)** — a multi-tenant deployment targeting Neon's serverless Postgres. The schema is managed with Drizzle ORM. Auth is Clerk, async task dispatch is Upstash QStash, file storage is Vercel Blob, webhooks are Svix, email is Resend, and billing is Stripe. Managed cloud workers run on Fly.dev.

| | Local | Cloud |
|---|---|---|
| **Database** | SQLite (WAL mode) | Neon Postgres (serverless) |
| **ORM** | Drizzle ORM | Drizzle ORM |
| **Auth** | Local dev mode | Clerk (multi-tenant) |
| **Worker** | Local service runner daemon | Fly.dev managed workers |
| **File storage** | Local filesystem | Vercel Blob |
| **Task queue** | DB polling (5s) | Upstash QStash |
| **Deployment** | localhost:3001 | Vercel |
| **Billing** | — | Stripe |
| **Migration path** | `db:migrate:sqlite-to-postgres` script | Drizzle Kit |

This split was intentional. The local version lets me iterate at maximum velocity: no migration overhead, no connection pooling concerns, no external latency. The cloud version is the production stance: managed schema, connection pooling, independent worker scaling, and multi-tenant isolation.

Running the same application on both targets enforced a clean abstraction boundary. The core platform logic — orchestration, agent personas, task lifecycle — doesn't care whether the underlying store is SQLite or Postgres. That's a discipline worth maintaining from the start.

---

## The Agent Fleet: 82 Specialists, 14 Divisions

The word "agent" gets overloaded fast. In J5 Agent Fleet, each agent is a **structured persona file** — a Markdown document that defines a specialist's role, decision framework, tone, and areas of expertise.

The fleet is organized into fourteen divisions:

| Division | Agents | Role |
|----------|--------|------|
| **Engineering** | 20 | Frontend, backend, DevOps, cloud, mobile, AI engineering, security, performance, infrastructure |
| **Marketing** | 13 | Content, SEO, social media, growth, Reddit, TikTok, Instagram, ASO, competitive intel |
| **Support** | 9 | Legal/compliance, finance, infrastructure, analytics, executive summaries |
| **Design** | 9 | UX architecture, UI design, brand, accessibility, visual storytelling, image prompting |
| **Project Management** | 5 | Studio producers, project shepherds, senior PMs, operations |
| **Testing** | 7 | API testing, performance benchmarking, reality checking, evidence collection |
| **Specialized** | 8 | Orchestrator, PDF creation, data consolidation, onboarding expert, scientific research |
| **Product** | 4 | Feedback synthesis, sprint prioritization, trend research |
| **Operations** | 2 | Coordination and operational automation |
| **Data** | 1 | Data consolidation and analysis |
| **Finance** | 1 | Financial analysis and reporting |
| **Human Resources** | 1 | HR workflows and documentation |
| **Legal** | 1 | Legal review and compliance |
| **Sales** | 1 | Sales extraction and outreach |

Each division maps to a real team function. A task goes to the **best-fit specialist**, not the nearest available model.

This matters more than it sounds. Most multi-agent systems either assign work randomly or always route to the same model. J5 Agent Fleet separates **who** does the work from **how** the work gets executed. Those are different decisions, made at different times.

---

## The Worker Runtime: Polling, Persona Loading, Multi-CLI Dispatch

The execution core is deliberately simple:

1. **Worker polls the database** every 5 seconds for queued tasks
2. **Loads the agent persona** from the Markdown file matching the assigned agent
3. **Routes to the correct CLI or API** based on the task's `model` field
4. **Stores output, updates status**, and publishes an event to the durable event ledger and in-memory bus
5. **SSE stream pushes the update** to the browser in real time via Postgres `LISTEN/NOTIFY` (cloud) or in-memory bus (local)

Supported execution targets:

- **Claude Code** (`claude-code`, `claude-code-fable-5`) — Anthropic's agentic coding CLI, including Claude Fable 5
- **GitHub Copilot CLI** (`copilot`) — GitHub's agent-mode CLI
- **OpenAI Codex CLI** (`codex`) — OpenAI's coding-focused CLI
- **Gemini CLI** (`gemini-cli`) — Google's terminal AI agent
- **Kiro** (`kiro`) — Kiro CLI (subscription-based, no API key required)
- **LM Studio / local Qwen** (`lmstudio-qwen`) — fully offline execution
- **GPT API** (`gpt-5.4`) — OpenAI API for structured tasks
- **Bedrock** (`bedrock-claude-fable-5`) — AWS Bedrock inference

The model is not a global setting. It is a **per-task routing decision**, and the orchestrator can make that decision automatically based on task type and complexity. The same task definition can run on Claude Code one day and Copilot CLI the next — the platform doesn't care.

---

## Project Orchestration: From Brief to Kanban

Project work follows a structured lifecycle:

1. Create a project with a plain-English description
2. Optionally inject context from prior completed projects
3. Call the decomposition endpoint (GPT-5.4 or local Qwen)
4. Platform generates features → user stories → executable tasks with dependencies
5. Only dependency-ready tasks are queued; others wait
6. Orchestrator assigns each task to a specialist agent
7. Advisors are consulted when cross-functional input would improve execution
8. Advisor recommendations are injected into the implementation brief
9. Track progress in the Project Hub, Kanban board, task detail graph, or **Gantt-style timeline** grouped by feature or agent

The decomposition step is where an idea becomes real work. The output isn't a pretty list that lives in chat — it's **persisted records** with dependency relationships and model assignments.

### Consultation-Gated Execution

One of the strongest architectural patterns in the platform: before a task is implemented, the orchestrator can decide that specialist input would improve it.

When that happens:
- Consultation subtasks are created for advisor agents
- A blocking payload is stored on the implementation task
- The implementation task does not start until all consultations complete (or a deadline expires)
- Advisor recommendations are prepended to the implementation task description

The implementing agent receives the original brief **plus** consultant input, already integrated. Consultation isn't decorative — it changes the execution context.

---

## Goal Mode: Iterative Execution Until Done

Goal Mode turns a task into a loop. You state an end condition — a quality bar, a test passing, a file existing, a condition being true — and the platform keeps spawning iterations until that condition is met or a cap is hit.

Every Goal Mode loop has explicit stopping conditions:

- **End condition** — a natural language goal the evaluator checks after each run
- **Time cap** — maximum wall-clock time before forced stop
- **Budget cap** — maximum cost before forced stop
- **Approval gate** — human checkpoint required before the next iteration
- **Blocker** — a structured error that requires human intervention
- **Human question** — the agent needs clarification before continuing

This isn't "run forever and hope." It's iterative execution with explicit human-supervisable boundaries built in from the start.

---

## Durable Runtime: Making Waiting Diagnosable

One of the hardest operational problems in multi-agent systems: when work appears stuck, why?

J5 Agent Fleet answers this with a **durable runtime layer**:

- **`execution_events`** — every meaningful state transition recorded as a ledger entry
- **`execution_signals`** — every reason work is waiting, with type, metadata, and expected resolution

Signals have types: `task.due` (scheduled start), `approval.pending`, `runner.offline`, `child-task.pending`, `dependency.pending`, `goal.iteration`, and more. When work is late or stuck, you inspect the signals to understand exactly what the platform is waiting for — no guesswork, no distributed tracing required.

A **stuck-work dashboard** surfaces tasks and runs with open signals past their expected resolution time. A **runbook** documents the evidence to collect and actions to take for each signal type.

---

## Local Automation: Browser, Screenshots, Computer Control

The local service runner daemon can perform browser automation, authenticated browser checks, screenshots, and macOS computer control — all with explicit opt-in and approval gates.

- **Browser automation** — enabled from the Controls UI (no env var required); Playwright/Chromium auto-installs on demand with one-click confirmation and live progress
- **Authenticated browser profiles** — reuse safe local browser profile labels for logged-in sessions
- **Screenshots** — capture visual context during tasks
- **Computer control** — macOS computer control (keyboard, mouse, system actions); every action requires approval before execution

Local automation is not on by default. It's opt-in at the runner level and explicit at the action level. Every automation path requires a human to have said "yes" at some point in the chain.

---

## Visibility: Kanban, Task Graphs, Gantt Timelines, and React Flow

Execution is half the story. The other half is what you can see.

**Kanban board** with auto-synced columns:
- `backlog` → `ready` → `in_progress` → `review` → `needs_attention` → `done`

State transitions are automatic. The worker moves tasks as it executes. The board reflects reality, not manual updates. Drag-and-drop lets you override when needed.

**Gantt-style project timeline** — visualizes work grouped by feature or agent, so you can see which parts of a project are running in parallel, blocked, or done.

**Task hierarchy graph** (powered by React Flow / `@xyflow/react`) visualizes:
- Parent task → orchestrator → delegated subtasks
- Consultation relationships between advisor and implementation tasks
- Status overlays — completed nodes render differently from in-progress or failed

This isn't decorative. When you're debugging a complex orchestration failure, a visual graph of who ran what and in what order is genuinely useful.

**Task detail view** shows:
- Full task hierarchy (parent → consultations → delegated subtasks)
- Agent assignment, model used, execution output
- Status history, durable events and signals timeline
- Artifact attachments and downloads

**Reports** generate period-based narratives (today / this week / this month):
- Markdown output with model-generated prose summaries
- Optional PDF export via `pdf-lib`
- Stored history for review

**Costs & usage** tracks per-task, per-agent, per-model, and per-project spend signals with budget policies and hard-stop guardrails.

---

## The Real-Time Layer: SSE

Live updates work through a **Server-Sent Events stream** at `/api/events/stream`. When a task changes state — queued, picked up, completed, failed — the worker publishes an event. The SSE stream broadcasts that event to all connected browser clients.

In the cloud version, Postgres `LISTEN/NOTIFY` handles real-time fanout across multiple Vercel instances — no separate pub/sub broker, no polling. The browser opens the stream once and receives a push for every state change.

---

## Native Clients: iOS, macOS, Electron

J5 Agent Fleet isn't only a web app. The platform ships native clients for every major surface:

**iOS app** — full task management, agent fleet directory, project detail, and Goal Mode controls. TestFlight CI runs on a self-hosted GitHub Actions runner with automatic build numbering, keychain unlock, and direct TestFlight upload via `xcrun altool`.

**macOS app (SwiftUI)** — a native SwiftUI app that connects to the local `j5af-service` daemon on port 7242. Gives macOS users a native feel for launching and monitoring agent work without keeping a browser tab open.

**Electron app** — cross-platform desktop (macOS, Windows, Linux) packaging the full web UI for offline/local-first use. Built with `electron-builder` for distributable installers across all three platforms.

This multi-surface approach means agent work is accessible from wherever the operator is — browser, phone, desktop — with the right interface for the context.

---

## Community Agents and Integrations

**Community agents** let users share, browse, and hire agents across the platform. Per-account controls manage visibility, activation, and reporting/takedown flows.

**Integrations** connect the platform to external systems via Composio (third-party tool connections) and direct integrations with GitHub, GitLab, and Telegram. Repositories can be cataloged and scoped to individual tasks.

**Research Lab** runs structured research topics on a recurring schedule with AI-authored reports. Research runs use the same durable runtime layer as tasks, so delays and failures are diagnosable through the same signal inspection workflow.

**Idea Board** is a color-coded capture surface for organizing ideas before they become tasks or projects.

---

## GitHub OAuth and Repository Integration

The platform includes full **GitHub OAuth** for authentication. Once connected:
- Repositories can be cataloged (local paths or GitHub-linked)
- Repo overview, commit activity, and per-repo chat are available
- Tasks can be scoped to a specific repository
- The operator works across repos without context-switching

This matters because agent work often involves code. The repo layer connects agent tasks to the actual codebases they affect.

---

## Local-First as a Feature, Not a Constraint

J5 Agent Fleet is **not** a distributed orchestration engine. It is a single-operator, human-supervised platform optimized for visibility and iteration velocity.

By keeping the core system local and inspectable, I can:
- Understand every state transition without distributed tracing
- Iterate on orchestration logic without infrastructure overhead
- Keep the workflow grounded in practical developer tooling
- Move to cloud Neon when persistence requirements demand it

The `db:migrate:sqlite-to-postgres` script is a real artifact of this journey — a repeatable path from local-first to cloud-native that I actually ran.

---

## The Tech Stack

Both versions share the same core UI stack. The database, infrastructure, and native client layer diverges:

| Layer | Local | Cloud |
|-------|-------|-------|
| **Framework** | Next.js 16, React 19, TypeScript | Same |
| **Styling** | Tailwind CSS v4 | Same |
| **State** | Zustand | Same |
| **Validation** | Zod | Same |
| **UI components** | Radix UI, Lucide, `@xyflow/react` | Same |
| **Database ORM** | Drizzle ORM | Same |
| **Database** | `better-sqlite3` | Neon Postgres (serverless driver) |
| **Auth** | Local dev mode | Clerk (multi-tenant) |
| **Billing** | — | Stripe |
| **Worker transport** | Local service runner daemon | Fly.dev managed workers |
| **Task queue** | DB polling (5s) | Upstash QStash |
| **File storage** | Local FS | Vercel Blob |
| **Webhooks** | — | Svix |
| **Email** | — | Resend |
| **Integrations** | Composio | Same |
| **Runtime** | Bun + Node | Bun + Docker |
| **Browser automation** | Playwright (opt-in) | Same |
| **PDF export** | `pdf-lib` | Same |
| **Markdown** | `react-markdown` + `remark-gfm` | Same |
| **Native iOS** | SwiftUI (TestFlight CI) | Same |
| **Native macOS** | SwiftUI (local daemon) | Same |
| **Desktop** | Electron (macOS, Windows, Linux) | Same |

---

## What This Platform Actually Demonstrates

### Architectural discipline at scale
Designing a codebase that runs on SQLite locally and Neon Postgres in the cloud without changing core logic requires clean abstractions. Drizzle ORM handles the translation; the application layer doesn't care which database is underneath.

### Agent design as a first-class concern
82 Markdown persona files means 82 opportunities to think carefully about specialist boundaries, decision frameworks, and communication styles. This is knowledge engineering, not just prompting.

### Consultation as a coordination primitive
The consultation-gated execution pattern is not common. Most orchestration systems skip the "get input before acting" step. J5 Agent Fleet makes it structural: implementation can't start until advisors have weighed in.

### Durable runtime as the observability layer
`execution_events` + `execution_signals` means every wait, every delay, every blocked state is an inspectable record. You don't need distributed tracing to understand why something is stuck — you read the signals.

### Goal Mode as a first-class loop primitive
Iterative execution with explicit stopping conditions — time caps, budget caps, approval gates, end conditions — is a meaningfully different model than "run once and hope." It's the difference between automation and autonomous execution with human oversight.

### Multi-CLI dispatch without vendor lock-in
Routing the same task to Claude Code, Copilot CLI, Codex, Gemini CLI, or Kiro — and swapping routes without changing application logic — is a practical hedge against model provider churn.

### Real product surface, not a prototype
Reports with PDF export. Stripe billing. Per-task artifact downloads. Kanban with auto-sync. Drag-and-drop. Recurring tasks. Persistent project chat. React Flow graphs. Community agents. iOS TestFlight CI. Native macOS app. Electron desktop. Inbound email mailbox. These are product features, not research artifacts.

---

## What's Next

The platform is live at [j5agentfleet.com](https://j5agentfleet.com) and actively shipping. Recent additions (v0.10.0) include Claude Fable 5 across all execution paths, an inbound email mailbox with full CRUD and reply support, one-click Chromium provisioning for local browser automation, and security hardening around stored secrets and identity headers.

The core mission stays the same: **turn AI from an isolated assistant into a visible, structured project execution system with a real product surface.**

The challenge I care most about in agentic systems isn't whether a single prompt can look impressive. It's whether a system can plan work, route it to the right specialist, enrich execution with cross-functional context, expose state clearly so a human can supervise, iterate toward a goal safely, and stay maintainable as the fleet grows.

J5 Agent Fleet is my answer to that challenge — and it's still evolving.
