import { MapPin, Github, Linkedin } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-50 mix-blend-normal"
      >
        <source src="/brettsandersbillboard.mp4" type="video/mp4" />
      </video>

      {/* Existing content with relative positioning */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center md:flex-row md:items-start relative z-10">
        <img
          src="/me.jpeg"
          alt="Brett Sanders"
          className="w-32 h-32 rounded-full mb-6 md:mb-0 md:mr-6"
        />
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4">Brett Sanders</h1>
          <h2 className="text-2xl text-gray-300 mb-6">
            Engineering Leader • Full Stack Software Engineer • SAFe Agile Certified • AWS Certified
          </h2>
          <div className="flex flex-wrap gap-6 text-gray-300 mb-8 justify-center md:justify-start">
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
            {['summary', 'skills', 'certifications', 'experience'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                aria-label={`Jump to ${section} section`}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 rounded-full transition-colors capitalize text-gray-300 hover:text-white"
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