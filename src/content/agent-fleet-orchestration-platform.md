---
title: "Agent Fleet: Building a Local-First Multi-Agent Orchestration Platform"
date: "2026-03-17"
tags: ["AI", "Multi-Agent Systems", "Workflow Orchestration", "TypeScript", "Next.js", "SQLite", "Kanban", "LLM Routing", "Project Management"]
excerpt: "A deep dive into Agent Fleet, the orchestration platform inside BMC that turns plain-English project ideas into decomposed work, specialist delegation, consultation-driven execution, and transparent delivery tracking."
description: "How Brett Sanders built Agent Fleet, a local-first multi-agent orchestration platform using Next.js, TypeScript, SQLite, specialist markdown personas, consultation-gated execution, project context injection, and Kanban visibility."
keywords: "Agent Fleet, multi-agent orchestration, AI orchestration platform, Next.js, TypeScript, SQLite, kanban, LLM routing, project decomposition, agent consultations, Brett Sanders"
---

Most AI agent demos are optimized for the wrong thing.

They make a single task look magical, but they fall apart the moment you ask practical delivery questions:

- How does work get broken down?
- How are dependencies tracked?
- How do you decide which agent should own a task?
- How do you bring in specialist feedback without turning the whole workflow into chaos?
- How do you see what actually happened after the model finishes?

That frustration is what led me to build **Agent Fleet**, the orchestration platform inside BMC.

> Explore the project overview here: [Agent Fleet project page](/projects/agent-fleet-orchestration-platform).

The goal was not to build another “AI agents” demo. The goal was to build a **local-first execution system** that could take a project idea, decompose it into real work, delegate that work to specialist agents, inject context where it matters, and make the whole process visible through a real UI.

## The Product in One Sentence

**Agent Fleet is a local-first multi-agent orchestration platform with project planning, specialist delegation, consultation-gated execution, project chat context injection, and Kanban/task visibility built around a SQLite-backed worker loop.**

That sounds like a mouthful, so let’s break down the workflow.

## The Workflow: From Idea to Trackable Execution

The platform starts with a plain-English project description.

From there, the workflow looks like this:

1. Create a project in the UI
2. Optionally inject context from previous projects
3. Generate a decomposition into features, stories, and tasks
4. Queue only the work that is dependency-ready
5. Let the orchestrator delegate each task to a specialist
6. Request advisor consultations when cross-functional input would help
7. Inject those recommendations into the implementation brief
8. Track progress in the project hub, Kanban board, and task detail graph

That sequence matters because it turns AI work into something that feels much closer to **managed project execution** than prompt roulette.

## The Core Runtime: SQLite + Polling Worker

At the heart of Agent Fleet is a deliberately simple execution model.

The platform stores operational state in **SQLite** and runs a worker that polls for queued tasks on a short interval. When the worker starts, it opens the database in **WAL mode**, which is a great fit for a local system that needs responsive reads and writes while tasks are running.

That database is doing a lot of real work:

- projects
- features
- user stories
- tasks
- task dependencies
- task events
- task artifacts
- project conversations
- task conversations
- agent conversations

I like this architecture because it keeps the system understandable. You can inspect the state directly, reason about transitions, and avoid inventing a distributed platform before it’s necessary.

It’s important to be explicit about the tradeoff: this is **not** a distributed orchestration engine. It’s a **single-node, local-first** platform optimized for visibility and velocity.

## Project Decomposition: Turning Ideas into Features, Stories, and Tasks

One of the first things Agent Fleet does is convert a project brief into structured work.

When a new project is created, the system can call either:

- **GPT-5.4**
- **local Qwen through LM Studio**

to produce a decomposition of:

- features
- user stories
- implementation tasks

Those tasks are persisted immediately, with dependencies linked by title and complexity-based model assignment applied at creation time.

There’s a subtle design choice here that I really like: the system doesn’t just ask for “a plan.” It forces the output into a format the runtime can actually execute. That closes the gap between brainstorming and operation.

## Context Injection: Reusing Prior Project Knowledge

This is one of the most practical features in the whole system.

When creating a new project, Agent Fleet can pull in **context from previous projects**. Instead of only passing a fresh prompt, it builds an injected context section that includes:

- executive summaries
- task references
- shipped outputs
- project-level prompt context

That context is then appended to the new project’s decomposition input.

This is a much more useful pattern than generic memory. It gives the planner a curated snapshot of prior work that is already structured around delivery artifacts.

In other words: not “remember everything,” but **“reuse the parts of previous work that help this new project start smarter.”**

## The Persona System: Agents as Markdown

Another design decision I’m especially happy with is how the agent system is defined.

Instead of hiding agent logic inside code, Agent Fleet stores agent personas as **markdown files on disk**. Those persona files describe the role, goals, decision framework, and success criteria for each specialist.

Today the platform has **61 specialized agent definitions** organized under a **nine-division taxonomy**. That includes engineering, design, marketing, product, project management, testing, support, specialized roles, and an extensible category model for future divisions.

This matters because it separates:

- **orchestration logic**, which lives in the app and worker
- **specialist behavior**, which lives in the agent definitions

That makes the system easier to evolve. You can improve workflow mechanics without rewriting every specialist, and you can refine specialist behavior without changing core orchestration code.

## The Orchestrator: Choosing Owners and Advisors

The orchestrator is where Agent Fleet starts to feel like more than a task queue.

When an orchestrator-owned task starts, it first analyzes the work and decides:

- which agent should be the **primary owner**
- whether any **advisor agents** should be consulted first

That second part is important.

A lot of multi-agent systems either:

- throw lots of agents at a problem with weak structure, or
- reduce everything to one model and lose domain perspective

Agent Fleet takes a middle path. It keeps one clear owner, but it can pull in advisor input when cross-functional feedback will materially improve the result.

## Consultation-Gated Execution

This is one of the strongest technical patterns in the platform.

If the orchestrator decides a task would benefit from additional perspectives, it creates **consultation subtasks** for advisor agents and stores a blocking payload on the implementation task.

The implementation task does not begin immediately. Instead, the worker waits until:

- all consultations complete, or
- the consultation deadline expires

When that happens, the worker builds an **advisor consultation section** and prepends it to the implementation task description.

That means the implementing agent receives:

- the original task brief
- the orchestrator’s delegation rationale
- advisor recommendations injected directly into the prompt

This is such a useful pattern because it creates a real handoff.

The consultation phase isn’t decorative. It directly changes the implementation context.

Just as importantly, the platform doesn’t pretend this process is perfect. If the consultation window expires, execution still proceeds. That’s a pragmatic choice that keeps the system from stalling indefinitely.

## Model Routing: Planning and Execution Are Different Problems

Agent Fleet also treats model choice as a routing concern instead of a global setting.

Planning can use GPT-5.4 or local Qwen, while execution supports a broader set of models like:

- Copilot
- Codex
- Claude Code
- GPT-5.4
- LM Studio / local Qwen

The platform also applies simple model selection rules based on task complexity, which is exactly the kind of thing orchestration software should own.

This is one of the key differences between an agent playground and an orchestration platform:

- a playground asks “which model do you want?”
- an orchestration layer asks “which model is the right fit for this step?”

## Kanban Auto-Sync and Project Visibility

Execution is only half the story. The other half is visibility.

Agent Fleet exposes work through a real product surface:

- **Employee Directory**
- **Projects**
- **Task Center**
- **Project board**
- **Project activity feed**
- **Project chat**
- **Task detail graph**

The Kanban board uses explicit columns:

- `backlog`
- `ready`
- `in_progress`
- `needs_attention`
- `done`

Those columns are not just UI labels. They’re tied to runtime behavior.

When tasks change state, the worker automatically syncs them:

- queued work moves to **ready**
- active work moves to **in progress**
- successful completion moves to **done**
- failed completion moves to **needs attention**

That kind of auto-sync sounds small, but it’s what makes the board reliable enough to act as an operational surface instead of a cosmetic layer.

## Task Detail Matters More Than Most People Think

One of my favorite parts of the product is the task detail experience.

Instead of giving you a flat log line, it shows:

- the task hierarchy
- child consultation and delegated tasks
- output previews and full output
- artifacts
- status history
- graph-based relationships

That makes it much easier to answer the questions that matter in agent systems:

- What happened?
- What happened first?
- Which agent contributed?
- Was this blocked on a consultation?
- Did the task fail, or did an advisor just raise a concern?

Without that visibility, orchestration quickly becomes opaque.

## Why the Local-First Constraint Is a Feature

There’s a temptation to describe any orchestration platform in enterprise-scale terms, but I think that would miss the point here.

Agent Fleet is intentionally:

- **local-first**
- **single-node**
- **human-supervised**
- reliant on available **CLI tools and model APIs**

That’s not a weakness. It’s a design stance.

By keeping the system local and inspectable, I can:

- move faster
- understand every state transition
- iterate on orchestration logic without infrastructure overhead
- keep the workflow grounded in practical developer tooling

It’s a better match for the current state of agentic engineering than pretending hard autonomy is already solved.

## What I Think Makes Agent Fleet Different

A lot of AI tooling focuses on one of these areas:

- prompting
- model access
- chat UX
- coding agent execution

Agent Fleet focuses on the layer *between* them: **coordination**.

The differentiators I’m most excited about are:

### 1. Project decomposition is operational, not just conceptual

The output becomes persisted work items with dependencies and model assignment, not a pretty list that dies in chat.

### 2. Advisor input changes the implementation prompt

Consultation isn’t just logged. It is injected into the next execution step.

### 3. Context reuse is tied to prior shipped work

Previous projects become planning input through structured context injection.

### 4. Visibility is built into the product surface

Kanban, task graphs, activity feeds, and full outputs make the orchestration legible.

### 5. The whole thing stays understandable

SQLite, markdown personas, and a polling worker are boring in the best possible way.

## Final Thoughts

If I had to summarize Agent Fleet in one line, I’d say this:

**It turns AI from an isolated assistant into a visible, trackable project execution system.**

That’s the problem I care about most right now.

Not whether a single prompt can look smart for thirty seconds, but whether a system can:

- plan work
- route work
- enrich work with context
- expose state clearly
- and help a human stay in control of the whole process

That’s what Agent Fleet is built to do.
