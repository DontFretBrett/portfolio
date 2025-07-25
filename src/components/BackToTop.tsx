import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackBackToTop } from '../utils/analytics';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // React 19 automatically optimizes this function, no need for useCallback
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setIsVisible(prev => prev !== shouldShow ? shouldShow : prev);
    };

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
  }, []); // Empty dependency array now since handleScroll is defined inside

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackBackToTop();
  };

  // React 19 enhanced ref callback with proper cleanup
  const scrollButtonRef = (element: HTMLButtonElement | null) => {
    if (!element) return;
    
    // Setup element-specific logic
    element.setAttribute('data-component', 'back-to-top');
    
    // Define event handlers that we can properly clean up
    const handleFocus = () => {
      // Use Tailwind classes for better theming and consistency
      element.classList.add('outline-2', 'outline-blue-500', 'dark:outline-blue-400', 'outline-offset-2');
    };
    
    const handleBlur = () => {
      // Remove focus styles cleanly
      element.classList.remove('outline-2', 'outline-blue-500', 'dark:outline-blue-400', 'outline-offset-2');
    };
    
    // Add focus management for accessibility
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
    
    // Return cleanup function (React 19 feature) - CRITICAL for memory management
    return () => {
      element.removeAttribute('data-component');
      
      // ✅ Properly remove event listeners to prevent memory leaks
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          ref={scrollButtonRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={scrollToTop}
          className="fixed top-4 right-4 bg-gray-800/90 dark:bg-gray-900/90 text-white dark:text-gray-100 px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors z-50 flex items-center gap-2 text-sm backdrop-blur-sm border border-gray-600/20 dark:border-gray-500/20 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
          Back to top
        </motion.button>
      )}
    </AnimatePresence>
  );
}  