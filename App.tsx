import React, { useRef } from 'react';
import ImageGenerator from './components/ImageGenerator';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const generatorRef = useRef<HTMLDivElement>(null);

  const handleScrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans">
      <main className="w-full">
        <HeroSection onGenerateClick={handleScrollToGenerator} />
        <div ref={generatorRef}>
          <ImageGenerator />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
