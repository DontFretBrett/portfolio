import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20"
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-4"
        >
          Brett Sanders
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl text-gray-300 mb-6"
        >
          Engineering Leader • Full Stack Software Engineer • SAFe Agile Certified
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-6 text-gray-300"
        >
          <a href="tel:858-703-7172" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={18} />
            <span>858-703-7172</span>
          </a>
          <a href="mailto:sanders.brett@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={18} />
            <span>sanders.brett@gmail.com</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <span>San Diego, CA</span>
          </div>
          <a href="https://github.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
}