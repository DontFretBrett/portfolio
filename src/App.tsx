import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Summary from './components/Summary';
import Skills from './components/Skills';
import BackToTop from './components/BackToTop';
import Chatbot from './components/Chatbot';

// Lazy load larger components
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Summary />
        <Skills />
        <Suspense fallback={<div className="p-16 text-center">Loading...</div>}>
          <Certifications />
          <Experience />
        </Suspense>
      </main>
      <BackToTop />
      <Chatbot />
    </div>
  );
}

export default App;