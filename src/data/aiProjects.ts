import type { AIProject } from '../types/projects';

export const aiProjects: AIProject[] = [
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
  }
];

export function getAIProjectBySlug(slug: string): AIProject | null {
  return aiProjects.find(project => project.slug === slug) || null;
}

export function getAllAIProjects(): AIProject[] {
  return aiProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
} 