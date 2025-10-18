import React from 'react';

const examples = [
  {
    prompt: "A motivational quote about consistency on a clean, professional background.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example1.png",
  },
  {
    prompt: "An abstract representation of AI and human collaboration.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example2.png",
  },
  {
    prompt: "Vector illustration of a programmer focused on their code with glowing lines.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example3.png",
  },
  {
    prompt: "A sleek graphic for a new tech product launch announcement.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example4.png",
  },
  {
    prompt: "An elegant infographic displaying growth statistics with a futuristic theme.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example5.png",
  },
  {
    prompt: "Photo of a person working on a laptop in a modern, sunlit workspace with plants.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example6.png",
  },
  {
    prompt: "A creative mind-map concept, connecting ideas with glowing nodes.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example7.png",
  },
  {
    prompt: "Minimalist icon set for productivity tools on a dark background.",
    imageUrl: "https://storage.googleapis.com/aistudio-hosting/templates/apps/linkedin-post-generator/example8.png",
  }
];

const ExamplesSection: React.FC = () => {
  return (
    <div className="py-20 px-4 bg-navy">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">See What's Possible</h2>
          <p className="text-lg text-gray-400 mt-2">Get inspired by what others are creating.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {examples.map((example, index) => (
            <div key={index} className="group relative bg-light-navy border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-accent-blue/20 hover:border-accent-blue/50 transform hover:-translate-y-2">
              <img src={example.imageUrl} alt={example.prompt} className="w-full h-56 object-cover" />
              <div className="p-5">
                <p className="font-mono text-xs text-accent-blue mb-2">// PROMPT</p>
                <p className="text-gray-300 text-sm leading-relaxed">"{example.prompt}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamplesSection;