import Header from './components/Header';
import Summary from './components/Summary';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certifications from './components/Certifications';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Summary />
        <Skills />
        <Certifications />
        <Experience />
      </main>
    </div>
  );
}

export default App;