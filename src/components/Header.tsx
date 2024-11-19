import { MapPin, Github, Linkedin } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Brett Sanders</h1>
        <h2 className="text-2xl text-gray-300 mb-6">
          Engineering Leader • Full Stack Software Engineer • SAFe Agile Certified • AWS Certified
        </h2>
        
        <div className="flex flex-wrap gap-6 text-gray-300 mb-8">
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
    </header>
  );
}