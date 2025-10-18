import React from 'react';

interface HeroSectionProps {
  onGenerateClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGenerateClick }) => {
  return (
    <div className="relative text-center py-24 md:py-40 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-accent-blue/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent-purple/20 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
          Turn Your Ideas into{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-purple">
            Stunning LinkedIn Images
          </span>{' '}
          — Instantly.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Just enter your post prompt and get a professional image designed by AI, perfectly tailored to your brand.
        </p>
        <button
          onClick={onGenerateClick}
          className="mt-10 px-8 py-4 text-lg font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-accent-blue/50 transition-all transform hover:scale-105"
        >
          Generate My Image
        </button>
      </div>
    </div>
  );
};

export default HeroSection;