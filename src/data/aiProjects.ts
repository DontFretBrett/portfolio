import type { AIProject } from '../types/projects';

export const aiProjects: AIProject[] = [
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
  }
];

export function getAIProjectBySlug(slug: string): AIProject | null {
  return aiProjects.find(project => project.slug === slug) || null;
}

export function getAllAIProjects(): AIProject[] {
  return aiProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 