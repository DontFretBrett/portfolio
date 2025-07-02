#!/usr/bin/env python3
"""
Image Validator using AutoGen and Gradio - Deployed on Hugging Face Spaces
"""

import asyncio
import gradio as gr
import os
from PIL import Image
from io import BytesIO
import base64
from pydantic import BaseModel, Field
from typing import Literal
import logging
import uuid

# AutoGen imports
from autogen_ext.models.openai import OpenAIChatCompletionClient
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.messages import MultiModalMessage
from autogen_core import Image as AGImage, CancellationToken
from autogen_core import TRACE_LOGGER_NAME, SingleThreadedAgentRuntime

# OpenTelemetry imports for tracing
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Get OpenAI API key from environment or Hugging Face Secrets
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("⚠️ OPENAI_API_KEY not found! Please add it to your Hugging Face Space secrets.")

# Configure logging for AutoGen tracing
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(TRACE_LOGGER_NAME)
logger.addHandler(logging.StreamHandler())
logger.setLevel(logging.DEBUG)

# Initialize tracing (optional - only if you want to send to external service)
def setup_tracing():
    """
    Set up OpenTelemetry tracing. This is optional and can be configured
    to send traces to various backends like Jaeger, Zipkin, or OpenAI Platform.
    """
    try:
        tracer_provider = TracerProvider(
            resource=Resource({"service.name": "autogen-image-validator-hf"})
        )
        trace.set_tracer_provider(tracer_provider)
        return tracer_provider
    except Exception as e:
        print(f"Warning: Could not set up external tracing: {e}")
        return None

# Set up tracing
tracer_provider = setup_tracing()

# Initialize the model client
model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")

# Define the Pydantic model for structured output
class ValidationResult(BaseModel):
    brief_description: str = Field(description="Brief description of what was observed in the image")
    passes_validation: bool = Field(description="True if the image passes the validation criteria, False otherwise")

# Create the validator agent
validator_agent = AssistantAgent(
    name="image_validator",
    model_client=model_client,
    system_message="""You are an expert image validator. Your job is to analyze images and determine if they match specific validation criteria.

When given an image and validation criteria, you should:
1. Carefully examine the image
2. Provide a brief description of what you observe
3. Determine if the image matches the validation criteria
4. Return your assessment as structured data

Be thorough but concise in your analysis.""",
    output_content_type=ValidationResult,
)

async def validate_image_async(validation_criteria: str, image: Image.Image) -> ValidationResult:
    """
    Validate an image against the given criteria using AutoGen with tracing
    """
    # Generate a unique trace ID for this validation
    trace_id = str(uuid.uuid4())[:8]
    
    try:
        # Get the tracer
        tracer = trace.get_tracer("autogen-image-validator-hf")
        
        # Start a span for the entire validation process
        with tracer.start_as_current_span(f"image_validation_{trace_id}") as span:
            # Set span attributes
            span.set_attribute("validation.criteria", validation_criteria)
            span.set_attribute("validation.trace_id", trace_id)
            span.set_attribute("image.format", image.format if image.format else "unknown")
            span.set_attribute("image.size", f"{image.size[0]}x{image.size[1]}")
            
            print(f"🔍 Starting image validation with trace ID: {trace_id}")
            print(f"📊 View traces at: https://platform.openai.com/traces")
            
            # Convert PIL image to AutoGen Image
            ag_image = AGImage(image)
            
            # Create the validation prompt
            prompt = f"""Please analyze this image and validate it against the following criteria:

Validation Criteria: {validation_criteria}

Please provide:
1. A brief description of what you observe in the image
2. Whether the image passes the validation (true/false)

Focus on whether the image content matches the validation criteria."""

            # Create multimodal message
            message = MultiModalMessage(
                content=[prompt, ag_image],
                source="user"
            )
            
            # Create runtime with tracing support
            runtime = SingleThreadedAgentRuntime(tracer_provider=tracer_provider)
            runtime.start()
            
            try:
                # Get response from the agent with tracing
                with tracer.start_as_current_span("agent_processing") as agent_span:
                    agent_span.set_attribute("agent.name", "image_validator")
                    agent_span.set_attribute("agent.model", "gpt-4o-mini")
                    
                    response = await validator_agent.on_messages([message], cancellation_token=CancellationToken())
                    
                    # Add response attributes to span
                    result = response.chat_message.content
                    agent_span.set_attribute("validation.result", result.passes_validation)
                    agent_span.set_attribute("validation.description", result.brief_description[:200])  # Truncate for span
                    
                    print(f"✅ Validation completed for trace: {trace_id}")
                    return result
                    
            finally:
                await runtime.close()
        
    except Exception as e:
        # Log error and return error result
        print(f"❌ Error in validation trace {trace_id}: {str(e)}")
        return ValidationResult(
            brief_description=f"Error processing image: {str(e)}",
            passes_validation=False
        )

def validate_image(validation_criteria: str, image: Image.Image) -> tuple[str, str]:
    """
    Wrapper function to run async validation and return formatted results
    """
    if not validation_criteria.strip():
        return "❌ Error", "Please provide validation criteria"
    
    if image is None:
        return "❌ Error", "Please upload an image"
    
    try:
        # Run the async validation with tracing
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(validate_image_async(validation_criteria, image))
        loop.close()
        
        # Format the results
        status = "✅ PASSES" if result.passes_validation else "❌ FAILS"
        details = f"""**Status:** {status}

**Brief Description:** {result.brief_description}

**Validation Criteria:** {validation_criteria}

**Result:** {'The image meets the validation criteria.' if result.passes_validation else 'The image does not meet the validation criteria.'}

**Tracing:** 🔍 Check the logs for trace information and visit https://platform.openai.com/traces to view detailed execution traces."""
        
        return status, details
        
    except Exception as e:
        return "❌ Error", f"An error occurred during validation: {str(e)}"

# Create the Gradio interface
def create_interface():
    with gr.Blocks(title="🔍 AI Image Validator", theme=gr.themes.Soft()) as demo:
        gr.Markdown("# 🔍 AI Image Validator")
        gr.Markdown("""Upload an image and specify validation criteria to check if the image meets your requirements using AI-powered analysis.
        
**🤖 Powered by:**
- AutoGen multi-agent framework
- OpenAI GPT-4o-mini vision model
- OpenTelemetry tracing for observability
        
**🚀 Features:**
- Natural language validation criteria
- Structured AI responses
- Detailed image analysis
- Performance tracing""")
        
        with gr.Row():
            with gr.Column(scale=1):
                # Input components
                validation_input = gr.Textbox(
                    label="Validation Criteria",
                    placeholder="e.g., It should be a driver's license",
                    lines=3,
                    info="Describe what the image should contain or represent"
                )
                
                image_input = gr.Image(
                    label="Upload Image",
                    type="pil"
                )
                
                validate_button = gr.Button(
                    "🔍 Validate Image",
                    variant="primary",
                    size="lg"
                )
            
            with gr.Column(scale=1):
                # Output components
                status_output = gr.Textbox(
                    label="Validation Status",
                    interactive=False
                )
                
                details_output = gr.Markdown(
                    label="Validation Details",
                    value="Upload an image and click 'Validate Image' to see results here."
                )
        
        # Information section
        gr.Markdown("""
        ### 📋 How to Use
        
        1. **Enter validation criteria**: Describe what you're looking for (e.g., "It should be a passport", "It should contain a person's face")
        2. **Upload an image**: Click or drag-and-drop your image file
        3. **Click Validate**: The AI will analyze and provide structured feedback
        
        ### 🎯 Example Validation Criteria
        - "It should be a driver's license"
        - "It should be a passport"
        - "It should contain a person's face"
        - "It should be a business card"
        - "It should be a receipt or invoice"
        - "It should show a government-issued ID"
        - "It should contain text in English"
        """)
        
        # Connect the button to the validation function
        validate_button.click(
            fn=validate_image,
            inputs=[validation_input, image_input],
            outputs=[status_output, details_output]
        )
        
        # Add examples
        gr.Examples(
            examples=[
                ["It should be a driver's license", None],
                ["It should be a passport", None],
                ["It should contain a person's face", None],
                ["It should be a business card", None],
                ["It should be a receipt or invoice", None],
            ],
            inputs=[validation_input, image_input],
        )
    
    return demo

# Create and launch the interface
if __name__ == "__main__":
    print("🚀 Starting Image Validator on Hugging Face Spaces...")
    print("📊 Traces will be available at: https://platform.openai.com/traces")
    
    demo = create_interface()
    demo.launch(
        server_name="0.0.0.0",  # Required for Hugging Face Spaces
        server_port=7860,       # Standard HF port
        share=False,            # Don't create public links on HF
        show_error=True,        # Show errors in interface
        show_api=False
    ) 