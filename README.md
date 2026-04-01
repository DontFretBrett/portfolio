# Brett Sanders — Portfolio

A modern, responsive portfolio website built from scratch with React, TypeScript, and Tailwind CSS. Features smooth animations, accessibility-first design, SEO optimization, blog functionality, and AI projects showcase.

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
- **Anchor Link Navigation**: Automatic heading ID generation with quick navigation sections for long-form content
- **Podcast Integration**: Native HTML5 audio player for AI-generated NotebookLM podcasts
- **Syntax Highlighting**: Code blocks with highlight.js
- **Dynamic Content Loading**: Lazy-loaded blog posts with improved error handling
- **SEO Optimized Posts**: Individual meta tags and structured data per post
- **Comments System**: GitHub Discussions-powered comments via Giscus integration
- **Tag Cloud**: Interactive tag filtering system with visual weighting and selection management
- **Post Filtering**: Dynamic filtering by multiple tags with clear visual feedback
- **AI Crawlable**: Static HTML generation for all blog posts and index pages
- **Blog Guidelines**: Comprehensive guidelines for consistent content creation
- **Robust Loading**: Promise.allSettled-based loading prevents partial failures

### Gear Showcase
- **Equipment Gallery**: Comprehensive display of professional gear and equipment
- **Category Organization**: Equipment organized by type with visual category indicators
- **Rich Details**: Detailed specifications, features, pros/cons for each item
- **Interactive Images**: Modal image viewer for detailed equipment photos
- **Affiliate Integration**: Amazon affiliate links with clear disclosure
- **Stock Status**: Real-time stock availability indicators
- **Rating System**: Visual star rating system for equipment reviews

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
- **AI Crawlability**: Static HTML generation for AI systems (ChatGPT, Claude, etc.)
- **Enhanced robots.txt**: Explicit permissions for AI crawlers

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
- **React 19.2** - Latest React with concurrent features
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
- **pnpm** - Fast, disk space efficient package manager

### Deployment & Performance
- **Vercel** - Production deployment platform
- **Code Splitting** - Automatic and manual chunk optimization
- **Compression** - Gzip and Brotli compression for assets
- **Modern Build Target** - ES2022+ for optimized bundles

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

4. **Build for production** (includes static blog generation)
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

7. **Type check the code**
   ```bash
   pnpm typecheck
   ```

8. **Run full build validation**
   ```bash
   pnpm test:build
   ```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route-specific page components
├── content/           # Markdown blog posts
├── data/              # Static data (projects, blog metadata, gear)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── config/            # Feature flags and configuration
├── contexts/          # React Context providers (ThemeContext)
└── actions/           # Server actions and utilities

ai-guidelines/         # Content creation guidelines
├── blog-guidelines.md # Comprehensive blog writing guidelines
└── ...               # Other development guidelines

scripts/              # Build and automation scripts
├── generate-static-blog.js # Static HTML generation for AI crawlers
└── ...               # Other build scripts

public/               # Static assets
├── podcasts/         # Audio files for blog post podcasts
├── robots.txt        # AI crawler permissions and SEO directives
├── sitemap.xml       # Search engine sitemap
└── ...               # Other static files
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
- **Blog Posts**: Add markdown files to `src/content/` following the guidelines in `ai-guidelines/blog-guidelines.md`
  - **Anchor Navigation**: Automatically generated for H2-H6 headings with quick navigation sections
  - **Podcast Support**: Add `podcast: "/path/to/audio.mp3"` in frontmatter for integrated audio player
- **AI Projects**: Update `src/data/aiProjects.ts`
- **Gear Reviews**: Update `src/data/gear.ts`
- **Skills/Experience**: Modify respective component files in `src/components/`

#### Adding Podcasts to Blog Posts
To add a podcast to any blog post:
1. Place your audio file (MP3, WAV, or OGG) in `public/podcasts/`
2. Add the `podcast` field to your blog post's frontmatter:
   ```yaml
   ---
   title: "Your Blog Post Title"
   date: "2025-07-25"
   podcast: "/podcasts/your-audio-file.mp3"
   ---
   ```
3. The audio player will automatically appear at the top of the blog post with:
   - Native HTML5 controls
   - Dark mode compatibility
   - NotebookLM AI-generation labeling
   - Fallback download link

### AI Crawlability
The portfolio includes comprehensive AI crawlability features:
- **Static HTML Generation**: All blog posts and pages are pre-rendered as static HTML during build
- **AI Crawler Support**: Explicit permissions for ChatGPT, Claude, and other AI systems in robots.txt
- **Structured Data**: Complete JSON-LD schema markup for better AI understanding
- **SEO Optimization**: Enhanced meta tags, Open Graph, and canonical URLs
- **Automated Build Process**: Static generation integrated into the build pipeline
- **Blog Guidelines**: Comprehensive guidelines ensure consistent, crawlable content

The static HTML files are generated in `/dist/static/blog/` and include:
- Blog index page with all posts
- Individual post pages with full metadata
- Proper SEO tags and structured data
- AI-friendly content previews

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers


# Force redeploy
