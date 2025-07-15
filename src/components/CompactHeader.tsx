import { Github, Linkedin, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { trackNavigation, trackSocialClick } from '../utils/analytics';

export default function CompactHeader() {
  const location = useLocation();
  
  // Determine the appropriate back link based on current route
  const getBackLink = () => {
    const path = location.pathname;
    
    if (path.startsWith('/ai-projects/')) {
      // Individual AI project page - back to AI projects list
      return {
        to: '/ai-projects',
        text: 'Back to Projects',
        shortText: 'Projects'
      };
    } else if (path.startsWith('/blog/')) {
      // Individual blog post - back to blog list
      return {
        to: '/blog',
        text: 'Back to Blog',
        shortText: 'Blog'
      };
    } else if (path === '/ai-projects' || path === '/blog' || path === '/gear') {
      // AI projects list, blog list, or gear page - back to home
      return {
        to: '/',
        text: 'Back to Home',
        shortText: 'Home'
      };
    }
    
    // Default fallback - back to home
    return {
      to: '/',
      text: 'Back to Home',
      shortText: 'Home'
    };
  };

  const backLink = getBackLink();

  const handleNavigation = (to: string) => {
    trackNavigation(to, location.pathname);
  };

  return (
    <header className="relative bg-linear-to-r from-slate-900 via-gray-900 to-slate-800 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900 text-white py-4 border-b border-gray-700/50 dark:border-gray-600/50 shadow-lg">
      {/* Enhanced dark overlay for better text contrast */}
              <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/10 to-black/20 dark:from-black/30 dark:via-black/15 dark:to-black/30 z-10"></div>
      
      {/* Theme Toggle - positioned with more space from right edge */}
      <div className="absolute top-3 right-2 z-30">
        <ThemeToggle />
      </div>

      {/* Compact content with padding to avoid theme toggle overlap */}
      <div className="container mx-auto px-4 pr-16 flex items-center justify-between relative z-20">
        {/* Left side - Dynamic back link + compact branding */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Link
            to={backLink.to}
            onClick={() => handleNavigation(backLink.to)}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium flex-shrink-0 drop-shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">{backLink.text}</span>
            <span className="sm:hidden">{backLink.shortText}</span>
          </Link>
          
          <div className="hidden sm:block text-gray-300 flex-shrink-0 drop-shadow-sm">•</div>
          
          <Link 
            to="/" 
            onClick={() => handleNavigation('/')}
            className="flex items-center gap-2 group min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-transparent flex-shrink-0">
<picture className="flex-shrink-0 bg-transparent rounded-full overflow-hidden">
  <source srcSet="/me.webp" type="image/webp" />
  <img className="block w-full h-full"
                  src="/me-64.jpg"
                  alt="Brett Sanders"
                  className="w-full h-full rounded-full transition-transform duration-200 group-hover:scale-105 ring-2 ring-white/20 hover:ring-white/30 dark:ring-gray-300/10 dark:hover:ring-gray-300/20 shadow-lg bg-transparent object-cover"
                  loading="eager"
                  decoding="async"
                  width="40"
                  height="40"
                />
              </picture>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg font-bold text-white truncate drop-shadow-md">Brett Sanders</h1>
              <p className="text-xs text-gray-200 hidden sm:block drop-shadow-sm">Engineering Leader</p>
            </div>
          </Link>
        </div>

        {/* Right side - compact navigation with space for theme toggle */}
        <nav className="flex items-center gap-2 flex-shrink-0 ml-4">
          <Link
            to="/"
            onClick={() => handleNavigation('/')}
            className="px-2 py-1.5 sm:px-3 bg-white/15 hover:bg-white/25 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-white hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/20 hover:border-white/30 dark:border-gray-600/30 dark:hover:border-gray-500/40 text-sm font-medium drop-shadow-sm"
          >
            <span className="hidden sm:inline">Home</span>
            <span className="sm:hidden">H</span>
          </Link>
          <Link
            to="/ai-projects"
            onClick={() => handleNavigation('/ai-projects')}
            className="px-2 py-1.5 sm:px-3 bg-white/15 hover:bg-white/25 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-white hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/20 hover:border-white/30 dark:border-gray-600/30 dark:hover:border-gray-500/40 text-sm font-medium drop-shadow-sm"
          >
            <span className="hidden sm:inline">AI Projects</span>
            <span className="sm:hidden">AI</span>
          </Link>
          <Link
            to="/gear"
            onClick={() => handleNavigation('/gear')}
            className="px-2 py-1.5 sm:px-3 bg-white/15 hover:bg-white/25 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 text-white hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/20 hover:border-white/30 dark:border-gray-600/30 dark:hover:border-gray-500/40 text-sm font-medium drop-shadow-sm"
          >
            <span className="hidden sm:inline">Gear</span>
            <span className="sm:hidden">G</span>
          </Link>
          
          {/* Social links - hidden on mobile to save space */}
          <div className="hidden lg:flex items-center gap-1 ml-1">
            <a 
              href="https://github.com/DontFretBrett" 
              onClick={() => trackSocialClick('GitHub')}
              className="p-1.5 hover:bg-white/15 rounded-full transition-colors text-white drop-shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a 
              href="https://www.linkedin.com/in/imbrett/" 
              onClick={() => trackSocialClick('LinkedIn')}
              className="p-1.5 hover:bg-white/15 rounded-full transition-colors text-white drop-shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a 
              href="https://x.com/WontFretBrett" 
              onClick={() => trackSocialClick('X')}
              className="p-1.5 hover:bg-white/15 rounded-full transition-colors text-white drop-shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
} 