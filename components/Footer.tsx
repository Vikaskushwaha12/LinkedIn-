import React from 'react';
import LinkedInIcon from './icons/LinkedInIcon';
import XIcon from './icons/XIcon';
import GitHubIcon from './icons/GitHubIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-navy/50 border-t border-white/10 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <p className="text-lg font-bold text-white">AI Image Generator</p>
          <p className="text-gray-400">Built with 💙 for creators.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
          <a href="#" aria-label="X" className="text-gray-400 hover:text-white transition-colors"><XIcon className="w-6 h-6" /></a>
          <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors"><GitHubIcon className="w-6 h-6" /></a>
        </div>
      </div>
       <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Image Generator. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;