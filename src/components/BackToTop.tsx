import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  };

  // React 19 enhanced ref callback with cleanup
  const scrollButtonRef = (element: HTMLButtonElement | null) => {
    if (element) {
      // Setup element-specific logic
      element.setAttribute('data-component', 'back-to-top');
      console.log('Back to top button mounted');
      
      // Add focus management for accessibility
      element.addEventListener('focus', () => {
        element.style.outline = '2px solid #3b82f6';
      });
      
      element.addEventListener('blur', () => {
        element.style.outline = 'none';
      });
    }
    
    // Return cleanup function (React 19 feature)
    return () => {
      if (element) {
        console.log('Back to top button cleanup');
        element.removeAttribute('data-component');
        // Cleanup is handled automatically for event listeners on the element
        // but we can do additional cleanup here if needed
      }
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
          className="fixed top-4 right-4 bg-gray-800/90 dark:bg-gray-900/90 text-white dark:text-gray-100 px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors z-50 flex items-center gap-2 text-sm backdrop-blur-sm border border-gray-600/20 dark:border-gray-500/20"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
          Back to top
        </motion.button>
      )}
    </AnimatePresence>
  );
} 