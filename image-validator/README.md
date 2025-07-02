---
title: ai-image-validator
emoji: 🔍
colorFrom: blue
colorTo: green
sdk: gradio
sdk_version: "5.35.0"
app_file: app.py
pinned: false
license: mit
short_description: AI-powered image validation with AutoGen and OpenAI
---

# 🔍 AI Image Validator

An intelligent image validation application powered by AutoGen and OpenAI's vision models, with a user-friendly Gradio web interface.

## 🚀 Features

- **🤖 AI-Powered Validation**: Uses AutoGen with GPT-4o-mini vision model for intelligent image analysis
- **📝 Custom Criteria**: Define your own validation requirements in natural language
- **🖼️ Easy Upload**: Drag-and-drop image upload interface
- **📊 Structured Output**: Returns Pydantic-structured results with:
  - Brief description of what was observed
  - Boolean pass/fail validation result
- **🎨 Modern UI**: Clean, responsive Gradio interface
- **⚡ Real-time Processing**: Fast validation with immediate feedback
- **🔧 OpenTelemetry Tracing**: Full observability and performance monitoring

## 🛠️ Technical Stack

- **AutoGen**: Multi-agent framework for AI validation
- **OpenAI GPT-4o-mini**: Vision-language model for image analysis
- **Gradio**: Web interface framework
- **Pydantic**: Data validation and structured output
- **OpenTelemetry**: Distributed tracing and observability
- **PIL (Pillow)**: Image processing

## 💻 Usage

1. **Enter validation criteria**: Describe what the image should contain (e.g., "It should be a driver's license")
2. **Upload an image**: Click or drag-and-drop your image file
3. **Click "🔍 Validate Image"**: Process the validation
4. **View results**: See the validation status and detailed analysis

## 📝 Example Validation Criteria

- `"It should be a driver's license"`
- `"It should be a passport"`
- `"It should contain a person's face"`
- `"It should be a business card"`
- `"It should be a receipt or invoice"`
- `"It should show a government-issued ID"`
- `"It should contain text in English"`
- `"It should be a medical prescription"`

## 🔒 Configuration

This application requires an OpenAI API key to function. The API key should be configured as a secret in your Hugging Face Space settings.

### Required Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key for GPT-4o-mini access

## 📊 Output Format

The application returns structured validation results:

```json
{
  "brief_description": "The image shows a rectangular ID card with text fields, a photo, and official markings typical of a driver's license.",
  "passes_validation": true
}
```

## 🔍 Observability

This application includes comprehensive tracing capabilities:

- **OpenTelemetry Integration**: All validation processes are traced
- **OpenAI Platform Traces**: Visit [https://platform.openai.com/traces](https://platform.openai.com/traces) to view detailed execution traces
- **Performance Monitoring**: Track latency, token usage, and error rates
- **Agent Decision Tracking**: Monitor how AutoGen agents reason and make decisions

## 🤝 Contributing

This is an educational project demonstrating AutoGen capabilities. Feel free to:

- Add new validation criteria examples
- Improve the UI/UX
- Add support for additional image formats
- Enhance error handling
- Add batch processing capabilities

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built using [AutoGen](https://github.com/microsoft/autogen) framework
- UI powered by [Gradio](https://gradio.app/)
- Vision capabilities provided by OpenAI's GPT-4o-mini model
- Observability powered by [OpenTelemetry](https://opentelemetry.io/)

---

**Happy Validating! 🎯** 