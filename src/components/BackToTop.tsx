import { ArrowUp } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const shouldShow = window.scrollY > 300;
    setIsVisible(prev => prev !== shouldShow ? shouldShow : prev);
  }, []);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll(); // Check initial state
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-4 bg-gray-800/90 dark:bg-gray-900/90 text-white dark:text-gray-100 px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors z-50 flex items-center gap-2 text-sm backdrop-blur-sm border border-gray-600/20 dark:border-gray-500/20"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
          Back to top
        </motion.button>
      )}
    </AnimatePresence>
  );
} 