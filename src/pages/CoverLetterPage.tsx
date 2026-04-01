import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function CoverLetterPage() {
  return (
    <>
      <Helmet>
        <title>Cover Letter | Brett Sanders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Subtle top accent */}
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-12 mx-auto" />

          <article className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-10 py-12 text-slate-700 dark:text-slate-300">
            {/* Header */}
            <header className="mb-10">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">Brett Sanders</p>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-0.5">
                El Cajon, CA 92020 &nbsp;·&nbsp; 858-703-7172 &nbsp;·&nbsp;{' '}
                <a
                  href="mailto:sanders.brett@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  sanders.brett@gmail.com
                </a>{' '}
                &nbsp;·&nbsp;{' '}
                <a
                  href="https://brettsanders.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  brettsanders.com
                </a>
              </p>
              <p className="text-base text-slate-500 dark:text-slate-400 mt-4">March 31, 2026</p>
              <div className="mt-5 text-base">
                <p className="font-medium text-slate-800 dark:text-slate-200">Hiring Team</p>
                <p>Celtic Bank</p>
                <p>Salt Lake City, Utah</p>
              </div>
            </header>

            <div className="border-t border-slate-100 dark:border-slate-700 mb-8" />

            {/* Salutation */}
            <p className="mb-6 text-base leading-8">Dear Celtic Bank Hiring Team,</p>

            {/* Body */}
            <div className="space-y-5 text-base leading-8">
              <p>
                When I read the description for the AI Solutions Lead role, one phrase stood out:{' '}
                <em className="text-slate-900 dark:text-slate-100 not-italic font-medium">execution enabler</em>. That's exactly
                how I approach AI — not as a theoretical discipline, but as something you build, deploy, and put in the hands of
                people who need it. I'm writing to apply because this role sits at the intersection of everything I've spent the
                last several years building toward: hands-on AI delivery, financial services domain expertise, and
                cross-functional enablement.
              </p>

              <p>
                My background is unusually well-matched for this position. I've spent 15+ years in financial services — at US
                Bank SBA and Truist/LightStream — leading software engineering teams and delivering complex, regulated technology
                at scale. I understand the risk, compliance, and data considerations that make AI deployment in banking
                fundamentally different from other industries. I've navigated ADA, Fair Lending, UDAAP, and Veracode security
                pipelines. I know how to move fast while respecting guardrails.
              </p>

              <p>On the AI side, I'm not a theorist. I've personally built and deployed:</p>

              <ul className="space-y-4 pl-1 my-2">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">J5 Agent Fleet</span> — a full-stack
                    multi-agent operations platform orchestrating 60+ AI agents across 9 divisions, with a multi-model execution
                    engine routing work to Claude Code, OpenAI Codex, GitHub Copilot, Gemini, and GPT. This is the kind of
                    agentic infrastructure I'd want to help Celtic Bank build and operate.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">J5-Trade</span> — a production autonomous
                    crypto trading system with 3 independent AI models, real-time WebSocket feeds, AI-powered news sentiment
                    analysis, and a portfolio-level risk overlay — built entirely to run without human intervention.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">OpenClaw/Johnny5</span> — a 24/7
                    autonomous AI assistant integrated with multi-channel communication, proactive scheduling, browser automation,
                    persistent memory, and sub-agent orchestration across different model configurations.
                  </span>
                </li>
              </ul>

              <p>
                I've also completed Ed Donner's AI Agentic Engineering certification, working hands-on with OpenAI Agents SDK,
                CrewAI, LangGraph, AutoGen, and MCP. I use Claude Code, Cursor, Codex CLI, and Gemini daily — not as novelties,
                but as production tools in my workflow.
              </p>

              <p>
                What I'm particularly drawn to in this role is the organizational layer: facilitating the AI Working Group,
                establishing frameworks and operating principles, and enabling leaders who don't have deep AI backgrounds to own
                real outcomes. At Truist, I led 4 delivery teams across 20 direct reports while managing the full lifecycle of a
                digital lending platform serving hundreds of thousands of customers. Influence without formal authority — across
                business, technology, risk, and compliance — is the environment I've operated in for years.
              </p>

              <p>
                The SBA connection is not lost on me either. I spent years building lending technology at US Bank SBA, so Celtic
                Bank's position as a top national SBA lender is a domain I know and respect.
              </p>

              <p>
                I'd welcome the chance to talk about how I can help Celtic Bank accelerate AI adoption in a way that's practical,
                principled, and built to last.
              </p>
            </div>

            {/* Closing */}
            <div className="mt-10 text-base">
              <p className="mb-6 leading-8">Sincerely,</p>
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-lg">Brett Sanders</p>
            </div>
          </article>

          {/* Footer accent */}
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mt-12 mx-auto opacity-40" />
        </div>
      </div>
    </>
  );
}
