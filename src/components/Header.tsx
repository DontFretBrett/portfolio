import { MapPin, Github, Linkedin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Code snippets that will animate
  const codeSnippets = [
    'const developer = { name: "Brett", role: "Engineering Leader" };',
    'function buildAmazingThings() { return innovation + passion; }',
    'if (challenge.isComplex()) { solution = teamwork + creativity; }',
    'async function leadTeam() { await inspire(team); return success; }',
    'const skills = ["React", "AWS", "Node.js", "Leadership"];',
    'export default class TechLeader extends Engineer {}',
    'const vision = await transform(ideas, reality);',
    '// Turning concepts into scalable solutions',
    'npm run build-the-future',
    'git commit -m "Making tech dreams reality"'
  ];
  
  return (
    <header className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white py-20 overflow-hidden">
      {/* Animated Code Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10"></div>
        {codeSnippets.map((snippet, index) => (
          <div
            key={index}
            className="absolute text-green-400/80 font-mono text-base whitespace-nowrap animate-float-code"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 2}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Floating particles for subtle animation */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      {/* Content overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-gray-900/60 z-15"></div>

      {/* Existing content with relative positioning */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center md:flex-row md:items-start relative z-20">
        <Link to="/" className="group">
          <picture>
            <source srcSet="/me.webp" type="image/webp" />
            <img
              src="/me.jpeg"
              alt="Brett Sanders"
              className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-6 cursor-pointer transition-transform duration-200 group-hover:scale-105 ring-4 ring-white/10 hover:ring-white/20"
              loading="eager"
              decoding="async"
              width="128"
              height="128"
            />
          </picture>
        </Link>
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-shadow-strong">Brett Sanders</h1>
          <h2 className="text-2xl text-gray-100 mb-6 drop-shadow-md text-shadow">
            Engineering Leader • Full Stack Software Engineer • SAFe Agile Certified • AWS Certified
          </h2>
          <div className="flex flex-wrap gap-6 text-gray-100 mb-8 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>San Diego, CA</span>
            </div>
            <a 
              href="https://github.com/DontFretBrett" 
              className="flex items-center gap-2 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/imbrett/" 
              className="flex items-center gap-2 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://x.com/WontFretBrett" 
              className="flex items-center gap-2 hover:text-white transition-colors"
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
            <Link
              to="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 text-gray-100 hover:text-white border border-white/10 hover:border-white/20"
            >
              Home
            </Link>
            <Link
              to="/ai-projects"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 text-gray-100 hover:text-white border border-white/10 hover:border-white/20"
            >
              AI Projects
            </Link>
            <Link
              to="/blog"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 text-gray-100 hover:text-white border border-white/10 hover:border-white/20"
            >
              Blog
            </Link>
            {isHomePage && ['summary', 'skills', 'certifications', 'experience'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                aria-label={`Jump to ${section} section`}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-200 capitalize text-gray-100 hover:text-white border border-white/10 hover:border-white/20"
              >
                {section}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}