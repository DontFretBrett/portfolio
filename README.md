# Brett Sanders Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, accessibility-first design, SEO optimization, blog functionality, and AI projects showcase.

## 🚀 Features

### Core Portfolio Features
- **Responsive Design**: Works seamlessly on all devices
- **Light/Dark Mode Toggle**: Professional theme switching with lightbulb icon and localStorage persistence
- **Smooth Navigation**: React Router with smooth scroll navigation
- **Section-based Layout**: Home page with Summary, Skills, Experience, and Certifications
- **Timeline Experience**: Professional timeline with detailed work history
- **Grid-based Certifications**: Visual display of professional certifications

### Blog System
- **Markdown Blog Posts**: Full blog functionality with markdown support
- **Syntax Highlighting**: Code blocks with highlight.js
- **Dynamic Content Loading**: Lazy-loaded blog posts with caching
- **SEO Optimized Posts**: Individual meta tags and structured data per post
- **Comments System**: GitHub Discussions-powered comments via Giscus integration

### AI Projects Showcase
- **Project Gallery**: Dedicated AI projects section
- **Live Demos**: Embedded interactive demos (Hugging Face Spaces integration)
- **Technical Details**: In-depth project descriptions with GitHub links
- **Dynamic Content**: Lazy-loaded project pages

### Performance & SEO
- **Code Splitting**: Intelligent chunk splitting for optimal loading
- **Lazy Loading**: Components and pages loaded on demand
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards
- **Structured Data**: Schema.org markup for better search results
- **Performance Optimized**: Terser minification, tree shaking, asset optimization

### Security & Deployment
- **Security Headers**: X-Frame-Options, CSP, and other security measures
- **Production Ready**: Optimized Vercel deployment configuration
- **Asset Caching**: Intelligent cache control for static assets
- **Accessibility Compliant**: WCAG guidelines followed

### Developer Experience
- **TypeScript**: Full type safety throughout the application
- **React Context API**: Theme management with localStorage persistence
- **Feature Flags**: Configurable features (e.g., chatbot)
- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Comprehensive error boundaries and fallbacks

## 🛠 Tech Stack

### Core Framework
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with class-based dark mode

### Routing & Navigation
- **React Router DOM** - Client-side routing
- **React Helmet Async** - SEO meta tag management

### Content & Markdown
- **React Markdown** - Markdown rendering
- **Highlight.js** - Syntax highlighting for code blocks
- **Remark GFM** - GitHub Flavored Markdown support
- **Rehype plugins** - HTML processing and syntax highlighting

### Animations & UI
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, consistent icons

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **PostCSS** - CSS processing with Autoprefixer
- **Terser** - JavaScript minification

### Deployment & Performance
- **Vercel** - Production deployment platform
- **Code Splitting** - Automatic and manual chunk optimization
- **Image Optimization** - WebP format with fallbacks

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies** (using pnpm)
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   ```

5. **Preview the production build**
   ```bash
   pnpm preview
   ```

6. **Lint the code**
   ```bash
   pnpm lint
   ```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route-specific page components
├── content/           # Markdown blog posts
├── data/              # Static data (projects, blog metadata)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── config/            # Feature flags and configuration
```

## 🚀 Deployment

The project is configured for seamless deployment on Vercel with:
- **Automatic deployments** from main branch
- **Security headers** for production safety
- **Optimized caching** for static assets
- **SPA routing** configuration

## 🔧 Configuration

### Feature Flags
Configure features in `src/config/features.ts`:
- `ENABLE_CHATBOT`: Toggle chatbot functionality

### Comments Configuration
The portfolio uses Giscus for comments, powered by GitHub Discussions:
- **Repository**: Comments are stored in GitHub Discussions
- **Mapping**: Comments are mapped to specific pages using unique terms
- **Theme**: Light theme by default
- **Position**: Comment box positioned at the top
- **Language**: English (configurable)

To configure Giscus for your own repository:
1. Install the Giscus GitHub app on your repository
2. Update the configuration in `src/components/Giscus.tsx` with your:
   - Repository name
   - Repository ID
   - Category ID
   - Mapping preferences

### Content Management
- **Blog Posts**: Add markdown files to `src/content/`
- **AI Projects**: Update `src/data/aiProjects.ts`
- **Skills/Experience**: Modify respective component files

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

