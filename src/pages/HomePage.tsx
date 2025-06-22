import { lazy, Suspense } from 'react';
import Summary from '../components/Summary';
import Skills from '../components/Skills';
import { FEATURE_FLAGS } from '../config/features';

// Lazy load larger components
const Experience = lazy(() => import('../components/Experience'));
const Certifications = lazy(() => import('../components/Certifications'));

export default function HomePage() {
  return (
    <main>
      <Summary />
      <Skills />
      <Suspense fallback={<div className="p-16 text-center">Loading...</div>}>
        <Certifications />
        <Experience />
      </Suspense>
    </main>
  );
} 