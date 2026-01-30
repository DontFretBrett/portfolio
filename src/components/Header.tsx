import { memo } from 'react';
import { MapPin, Github, Linkedin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import NavLink from './NavLink';

// Precomputed layout helpers to keep the component pure and deterministic
const codeSnippets = [
  'const developer = { name: "Brett", role: "Engineering Leader" };',
  'function buildAmazingThings() { return innovation + passion; }',
  'if (challenge.isComplex()) { solution = teamwork + creativity; };',
  'async function leadTeam() { await inspire(team); return success; }',
  'const skills = ["React", "AWS", "Node.js", "Leadership"];',
  'export default class TechLeader extends Engineer {}',
  'const vision = await transform(ideas, reality);',
  '// Turning concepts into scalable solutions',
  'npm run build-the-future',
  'git commit -m "Making tech dreams reality"'
] as const;

const immediateSnippetLayout = [
  { left: 28, top: 38, rotate: -2.5 },
  { left: 52, top: 48, rotate: 1.5 },
  { left: 72, top: 62, rotate: 3 }
] as const;

function getFloatingSnippetLayout(index: number) {
  // Deterministic pseudo-layout based on index
  const base = index + 1;
  const left = (base * 17) % 100; // 0–99
  const top = (base * 29) % 100; // 0–99
  const duration = 15 + (base * 7) % 10; // 15–24
  const rotate = (base * 11) % 10 - 5; // -5–4

  return { left, top, duration, rotate };
}

function getParticleLayout(index: number) {
  const base = index + 1;
  const left = (base * 23) % 100;
  const top = (base * 31) % 100;
  const delay = (base * 9) % 3; // 0–2
  const duration = 20 + (base * 13) % 15; // 20–34

  return { left, top, delay, duration };
}

const Header = memo(function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="relative bg-linear-to-br from-gray-900 via-slate-900 to-gray-800 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900 text-white py-20 overflow-hidden">
      {/* Theme Toggle - positioned absolutely in top right */}
      <div className="absolute top-4 right-4 z-30">
        <ThemeToggle />
      </div>

      {/* Animated Code Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-30">
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/50 to-transparent dark:from-gray-950/90 dark:via-gray-950/50 z-10"></div>
        
        {/* Immediate visible code snippets for instant activity */}
        {codeSnippets.slice(0, 3).map((snippet, index) => {
          const layout = immediateSnippetLayout[index] ?? immediateSnippetLayout[0];
          return (
          <div
            key={`immediate-${index}`}
            className="absolute text-green-400/60 dark:text-green-300/50 font-mono text-sm whitespace-nowrap"
            style={{
              left: `${layout.left}%`,
              top: `${layout.top}%`,
              transform: `rotate(${layout.rotate}deg)`,
              animation: `pulse 3s ease-in-out infinite ${index * 0.5}s`
            }}
          >
            {snippet}
          </div>
        );
        })}
        
        {/* Floating animated code snippets */}
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className="absolute text-green-400/80 dark:text-green-300/60 font-mono text-base whitespace-nowrap animate-float-code"
            style={{
              left: `${getFloatingSnippetLayout(index).left}%`,
              top: `${getFloatingSnippetLayout(index).top}%`,
              animationDelay: `${index * 0.3}s`,
              animationDuration: `${getFloatingSnippetLayout(index).duration}s`,
              transform: `rotate(${getFloatingSnippetLayout(index).rotate}deg)`
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Floating particles for subtle animation */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 dark:bg-blue-300/30 rounded-full animate-float-particle"
            style={{
              left: `${getParticleLayout(i).left}%`,
              top: `${getParticleLayout(i).top}%`,
              animationDelay: `${getParticleLayout(i).delay}s`,
              animationDuration: `${getParticleLayout(i).duration}s`
            }}
          />
        ))}
      </div>

      {/* Content overlay for better text readability */}
              <div className="absolute inset-0 bg-linear-to-r from-gray-900/60 via-transparent to-gray-900/60 dark:from-gray-950/70 dark:via-transparent dark:to-gray-950/70 z-15"></div>

      {/* Existing content with relative positioning */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center md:flex-row md:items-start relative z-20">
        <Link to="/" className="group">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-transparent mb-6 md:mb-0 md:mr-6">
            <picture className="bg-transparent rounded-full overflow-hidden block w-full h-full">
              <source srcSet="/me.webp" type="image/webp" />
              <img
                src="/me-128.jpg"
                alt="Brett Sanders"
                className="w-full h-full rounded-full cursor-pointer transition-transform duration-200 group-hover:scale-105 ring-4 ring-white/10 hover:ring-white/20 dark:ring-gray-300/10 dark:hover:ring-gray-300/20 bg-transparent object-cover"
                loading="eager"
                decoding="async"
                width="128"
                height="128"
              />
            </picture>
          </div>
        </Link>
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-shadow-strong text-white">Brett Sanders</h1>
          <h2 className="text-2xl text-gray-100 dark:text-gray-200 mb-6 drop-shadow-md text-shadow">
            Engineering Leader • Full Stack Software Engineer • Agentic AI Certified • AWS Certified
          </h2>
          <div className="flex flex-wrap gap-6 text-gray-100 dark:text-gray-200 mb-8 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>San Diego, CA</span>
            </div>
            <a 
              href="https://github.com/DontFretBrett" 
              className="flex items-center gap-2 hover:text-white dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/imbrett/" 
              className="flex items-center gap-2 hover:text-white dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://x.com/WontFretBrett" 
              className="flex items-center gap-2 hover:text-white dark:hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X</span>
            </a>
          </div>
          <nav aria-label="Page sections" className="flex flex-wrap justify-center md:justify-start gap-3">
            <NavLink to="/" variant="header">Home</NavLink>
            <NavLink to="/projects" variant="header">Projects</NavLink>
            <NavLink to="/blog" variant="header">Blog</NavLink>
            <NavLink to="/gear" variant="header">Gear</NavLink>
            <NavLink to="/music" variant="header">Music</NavLink>
            {isHomePage && ['summary', 'skills', 'certifications', 'experience'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                aria-label={`Jump to ${section} section`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm rounded-full transition-all duration-200 capitalize text-gray-100 hover:text-white dark:text-gray-200 dark:hover:text-white border border-white/10 hover:border-white/20 dark:border-gray-600/30 dark:hover:border-gray-500/40"
              >
                {section}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
});

export default Header;