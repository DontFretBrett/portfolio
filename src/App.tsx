import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import BackToTop from './components/BackToTop';
import { FEATURE_FLAGS } from './config/features';

// Lazy load pages to reduce initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'));
const AIProjectsPage = lazy(() => import('./pages/AIProjectsPage'));
const AIProjectPage = lazy(() => import('./pages/AIProjectPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Conditionally lazy load Chatbot only if enabled
const Chatbot = FEATURE_FLAGS.ENABLE_CHATBOT 
  ? lazy(() => import('./components/Chatbot'))
  : null;

// Loading component for page transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ai-projects" element={<AIProjectsPage />} />
              <Route path="/ai-projects/:slug" element={<AIProjectPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
            </Routes>
          </Suspense>
          <BackToTop />
          {FEATURE_FLAGS.ENABLE_CHATBOT && Chatbot && (
            <Suspense fallback={null}>
              <Chatbot />
            </Suspense>
          )}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;