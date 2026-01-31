import type { Project } from '../types/projects';

export const projects: Project[] = [
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
    githubUrl: 'https://github.com/DontFretBrett/ai-assistant-human-questionairre',
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

This project wasn't just built to *help* with AI—it was built *by* an AI. Developed by Brett Sanders in collaboration with his **OpenClaw** bot (Johnny5), it serves as a testament to the power of human-agent pair programming.

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