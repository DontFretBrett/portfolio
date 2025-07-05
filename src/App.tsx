import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import CompactHeader from './components/CompactHeader';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import { FEATURE_FLAGS } from './config/features';

// Lazy load components for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AIProjectsPage = React.lazy(() => import('./pages/AIProjectsPage'));
const AIProjectPage = React.lazy(() => import('./pages/AIProjectPage'));
const BlogPage = React.lazy(() => import('./pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const GearPage = React.lazy(() => import('./pages/GearPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ConditionalHeader />
        <Suspense fallback={<PageLoader />}>
          <main id="main-content" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ai-projects" element={<AIProjectsPage />} />
              <Route path="/ai-projects/:slug" element={<AIProjectPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/gear" element={<GearPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </Suspense>
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
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}