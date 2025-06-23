import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import BackToTop from './components/BackToTop';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import { FEATURE_FLAGS } from './config/features';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
          <BackToTop />
          {FEATURE_FLAGS.ENABLE_CHATBOT && <Chatbot />}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;