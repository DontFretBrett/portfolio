import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import CompactHeader from './components/CompactHeader';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import { FEATURE_FLAGS } from './config/features';
import { initGA, logPageView } from './config/analytics';
import Footer from './components/Footer';

// Lazy load components for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ProjectPage = React.lazy(() => import('./pages/ProjectPage'));
// Legacy imports for backward compatibility
const AIProjectsPage = React.lazy(() => import('./pages/AIProjectsPage'));
const AIProjectPage = React.lazy(() => import('./pages/AIProjectPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const GearPage = React.lazy(() => import('./pages/GearPage'));
const MusicPage = React.lazy(() => import('./pages/MusicPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const LegalPage = React.lazy(() => import('./pages/legal'));
const ResumePage = React.lazy(() => import("./pages/ResumePage"));

// Lazy load chatbot only if enabled
const Chatbot = FEATURE_FLAGS.ENABLE_CHATBOT 
  ? React.lazy(() => import('./components/Chatbot')) 
  : null;

// Loading component for suspense fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// Route change tracker component
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
}

// Conditional header based on route
function ConditionalHeader() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return isHomePage ? <Header /> : <CompactHeader />;
}

function AppContent() {
  return (
    <>
      {/* Skip Navigation Link - WCAG 2.2 Best Practice */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ScrollToTop />
      <RouteTracker />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ConditionalHeader />
        <Suspense fallback={<PageLoader />}>
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectPage />} />
              {/* Legacy routes for backward compatibility */}
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/ai-projects" element={<AIProjectsPage />} />
              <Route path="/ai-projects/:slug" element={<AIProjectPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/gear" element={<GearPage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </Suspense>
        <Footer />
        <BackToTop />
        {FEATURE_FLAGS.ENABLE_CHATBOT && Chatbot && (
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default function App() {
  // Defer analytics until after page is interactive to prevent blocking initial render
  useEffect(() => {
    if (document.readyState === 'complete') {
      // Page already loaded, initialize immediately
      initGA();
    } else {
      // Wait for page load event
      window.addEventListener('load', () => initGA(), { once: true });
    }
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
        <Analytics />
      </ThemeProvider>
    </HelmetProvider>
  );
}