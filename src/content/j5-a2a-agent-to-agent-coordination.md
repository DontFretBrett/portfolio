---
title: "J5 A2A: Building a Coordination Layer for Agentic Development Tools"
date: "2026-07-03"
tags: ["AI Agents", "Agent-to-Agent", "Multi-Agent Systems", "MCP", "Next.js", "TypeScript", "Postgres", "Redis", "Drizzle ORM", "CLI", "Protocol Design", "Coordination", "iOS", "SwiftUI"]
excerpt: "J5 A2A is a coordination layer for agentic development tools: shared sessions, typed events, presence, lease-aware claims, conflict detection, targeted inbox wake patterns, MCP and CLI adapters, and an operator dashboard for humans supervising many agents at once."
description: "Deep dive into J5 A2A at j5a2a.com: an Agent-to-Agent coordination layer for Codex, Claude Code, Cursor, MCP clients, custom CLIs, local-model bridges, scripts, and humans working in shared sessions with typed events, presence, claims, conflict detection, questions, requests, decisions, artifacts, digests, and an operations dashboard."
keywords: "J5 A2A, agent-to-agent, A2A protocol, AI agents, MCP, multi-agent coordination, typed events, presence, lease-aware claims, conflict detection, CLI agents, Codex, Claude Code, Cursor, Next.js, TypeScript, Postgres, Redis, Brett Sanders"
---

Most AI coding tools are built as if they are the only agent in the room.

That assumption is already breaking down. A modern development workflow can involve Codex editing a file, Claude Code debugging a test failure, Cursor reviewing the same area, a local script watching CI, and a human trying to understand which one is doing what. Each tool may be capable on its own, but the group has no shared operating picture.

That is the problem **J5 A2A** is built to solve.

> See the project overview: [J5 A2A project page](/ai-projects/j5-a2a).

J5 A2A is a coordination layer for agentic development tools. It gives coding assistants, IDE agents, MCP clients, custom CLIs, local-model bridges, scripts, services, and humans a shared session where they can announce work, maintain presence, claim resources, ask questions, request reviews, record decisions, and leave a durable event trail.

**Live at:** [j5a2a.com](https://www.j5a2a.com)

---

## Why Agent Coordination Matters

The failure mode is simple: agents do not know enough about each other.

One agent starts changing `src/auth/session.ts`. Another starts reviewing the same path. A third agent runs a refactor that rewrites a nearby dependency. None of them are wrong individually, but the system is brittle because the coordination lives in scattered chat messages, terminal output, and human memory.

J5 A2A turns that invisible work into explicit coordination records:

- Who is in the session?
- What is each participant doing?
- Which files, PRs, tasks, reviews, or artifacts are claimed?
- Which claims overlap?
- Who is blocked?
- Who needs to answer a question?
- Which requests are open, claimed, complete, cancelled, or stale?
- What changed since a participant last checked in?

The goal is not to replace an agent tool. The goal is to make many of them work in the same room without stepping on each other.

---

## The Core Model: Shared Sessions

A **session** is the shared coordination space. Events, participants, claims, requests, inbox items, artifacts, and decisions are all scoped to that session.

Agents connect with **session-scoped credentials**, not broad user credentials. Humans authenticate through the dashboard; agents receive narrow bearer tokens with scopes like `session:read`, `session:write`, and `presence:write`. That separation matters. A leaked agent token should have a small blast radius: one session, revocable, auditable.

Inside the session, every actor becomes a **participant**:

- an IDE assistant
- a CLI agent
- a script or service
- an MCP client
- a local-model bridge
- a human operator
- a background system job

Participants declare identity, client/tool, transport, capabilities, and status. That gives other agents and humans enough context to route work intentionally instead of guessing.

---

## Typed Events Instead of Chat Soup

The backbone of J5 A2A is a typed event log. Agents emit structured coordination records such as:

- `status`
- `claim.created`
- `claim.released`
- `question.asked`
- `question.answered`
- `request.created`
- `request.claimed`
- `request.completed`
- `decision.recorded`

Typed events are small, durable, and automation-friendly. They are not meant to replace natural language; they give natural language a structure that other tools can act on.

A status event can tell the room what an agent is doing. A claim event can prevent another agent from editing the same path. A decision event can preserve why the human approved a risky path. A request event can make "please review this" into one-owner work instead of a vague hope.

---

## Lease-Aware Claims and Conflict Detection

Claims are the most immediately useful primitive.

Before an agent edits, reviews, tests, or deploys, it can claim a resource:

- file paths or globs
- pull requests
- tasks
- artifacts
- review scopes
- other typed work units

Claims are **soft locks**, not absolute database locks. They communicate intent. The platform can detect overlap and warn participants before the conflict becomes a merge problem.

The claims are lease-aware:

- active claims stay healthy while the participant heartbeats
- expiring claims can be renewed
- stale claims can be recovered
- expired claims stop blocking work

That gives the system practical coordination without requiring every tool to be perfectly behaved forever.

---

## Questions, Requests, and Inbox Wakeups

Agents need more than status logs. They need a way to direct attention.

J5 A2A supports **questions** targeted at:

- one participant
- all participants
- any participant with a matching capability

It also supports **requests**, which are one-owner workflows for things like reviews, test runs, debugging, documentation, research, and release checks. A request can be open, claimed, completed, cancelled, expired, or reassigned.

The inbox is where this becomes operational. Each participant can poll for pending items targeted to them using an opaque cursor. The CLI can run an inbox watch loop. Agents that cannot hold a connection can receive SSRF-guarded webhook delivery.

That creates a wake pattern: an agent can be addressed directly, wake up, handle the item, and mark it acknowledged or resolved without the human pasting reminders into every tool.

---

## The Protocol Ladder: L0 to L5

J5 A2A is designed for incremental adoption. A tool does not need to implement everything on day one.

| Level | Name | Behavior |
|---|---|---|
| **L0** | Events-only | Post and read events |
| **L1** | Joined presence | Register as a participant and heartbeat |
| **L2** | Resource claims | Claim and release resources before work overlaps |
| **L3** | Inbox and questions | Read targeted work and ask or answer questions |
| **L4** | Requests | Create, claim, complete, cancel, or reassign one-owner work |
| **L5** | Full orchestration | Use digests, threaded replies, and heartbeat-based lease renewal |

This matters because agent tools expose different extension points. Some can call HTTP. Some can load MCP servers. Some are easiest to wrap with a CLI. Some can only run a sidecar script. The ladder lets each one participate at the level it can actually support.

---

## MCP, CLI, HTTP, and the Dashboard

The canonical contract is plain session-scoped HTTP. The adapters sit on top:

- **REST API** for any client that can call HTTP endpoints
- **MCP server** for MCP-capable tools
- **`a2a` CLI** for terminal-first workflows, shell scripts, and sidecar agents
- **Web dashboard** for human operators
- **iOS companion** for observing and directing sessions on the go

The important part is that these are not separate worlds. A CLI claim, an MCP status event, a dashboard-created request, and an iOS push notification all reference the same session state.

That is the coordination layer: every surface writes to and reads from one durable operating picture.

---

## Dashboard as an Operations Console

The dashboard is the human view of the session:

- sessions
- participants
- presence
- claims
- conflicts
- requests
- inbox items
- decisions
- artifacts
- digests
- event history

The dashboard is not just a chat transcript. It is closer to an operations console. The human can see who is active, what is claimed, what is blocked, what needs attention, and what changed while they were away.

That is especially important when the number of agents grows. Once there are multiple autonomous tools acting in parallel, a flat chat log is not enough. The operator needs structure.

---

## Architecture

J5 A2A is a Turborepo monorepo:

| Path | Role |
|---|---|
| `apps/web` | Next.js dashboard, marketing pages, docs, and REST API |
| `apps/worker` | Background processing for digests, semantic advisories, and maintenance jobs |
| `apps/stream` | Redis-backed realtime event streaming |
| `apps/ios` | Native SwiftUI human-operator companion |
| `packages/shared` | Zod schemas, event contracts, OpenAPI generation, crypto helpers, typed clients |
| `packages/db` | Drizzle schema, tenant-scoped data access layer, services, tests, and migrations |
| `packages/mcp` | MCP server exposing A2A coordination tools |
| `packages/cli` | `a2a` command-line client |

The database is Postgres through Drizzle. Redis handles stream fanout. Clerk handles the human dashboard auth flow. Session-scoped agent credentials keep tool access narrow. Optional OpenAI embeddings power semantic advisory work.

---

## Security and Trust Boundaries

The security model is intentionally boring in the best way:

- humans authenticate through the dashboard
- agents use session-scoped credentials
- credentials are narrow and revocable
- tenant-owned state is scoped through the data access layer
- webhook delivery is SSRF-guarded
- tokens are treated as secrets and should not be pasted into public logs, commits, issues, screenshots, or shared chats

The system assumes agent tools are powerful and sometimes messy. The protocol gives them a small shared contract, but the server still has to enforce ownership, scoping, and safe delivery behavior.

---

## What Is Live Now

The core local orchestration loop is in place:

- session-scoped agent credentials
- server-side participant attribution
- typed event ingest and cursor-based reads
- presence heartbeats
- MCP and CLI auto-presence
- lease-aware file/path and resource claims
- stale-claim recovery
- batch claims
- edit-safety checks
- conflict detection
- request and review workflows
- decisions and threaded replies
- targeted inbox and wake patterns
- state-aware digests and briefings
- MCP and CLI adapters over the HTTP contract
- artifacts, semantic advisories, and observability surfaces
- web dashboard
- native iOS human-operator companion
- L0-L5 protocol compliance ladder

The areas still being hardened are the generalized SDK adapter, expanded resource leasing beyond the current resource types, large-session dashboard performance, production packaging, and public documentation.

---

## Why This Matters

The next phase of AI development is not just "better individual agents." It is better coordination between agents, tools, and humans.

J5 Agent Fleet is about operating an agent workforce. J5 A2A is about the protocol-level coordination those tools need when more than one agent is active at the same time.

That distinction matters. A fleet needs dispatch, governance, reporting, approvals, runners, and product workflows. A coordination layer needs identity, presence, claims, typed events, inboxes, requests, decisions, digests, and conflict detection.

Both are part of the same larger thesis: AI work has to become visible, auditable, and coordinated if humans are going to trust it with real projects.
