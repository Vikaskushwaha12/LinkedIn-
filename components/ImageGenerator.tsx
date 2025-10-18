import React, { useState } from 'react';
import { generateImage, getPromptSuggestions, ImageStyle } from '../services/geminiService';
import Spinner from './Spinner';
import DownloadIcon from './icons/DownloadIcon';
import SparklesIcon from './icons/SparklesIcon';
import StarIcon from './icons/StarIcon';

const aspectRatios = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Landscape (16:9)', value: '16:9' },
];

const styles: { label: string; value: ImageStyle }[] = [
  { label: 'My Personality', value: 'personality' },
  { label: 'Professional', value: 'professional' },
  { label: 'Minimal', value: 'minimal' },
  { label: 'Trendy', value: 'trendy' },
  { label: 'Emotional', value: 'emotional' },
];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [style, setStyle] = useState<ImageStyle>('personality');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);
    setSuggestions(null);

    try {
      const images = await generateImage(prompt, aspectRatio, style);
      setGeneratedImages(images);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGetSuggestions = async () => {
    if (!prompt) {
      setError('Please enter a prompt to get suggestions.');
      return;
    }
    setIsSuggestionsLoading(true);
    setError(null);
    setSuggestions(null);
    
    try {
      const result = await getPromptSuggestions(prompt);
      setSuggestions(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSuggestionsLoading(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-navy py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-light-navy p-8 rounded-2xl border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="aspect-ratio" className="block text-sm font-medium text-gray-300 mb-2">Aspect Ratio</label>
              <select
                id="aspect-ratio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full bg-navy border border-white/20 text-white rounded-lg p-3 focus:ring-accent-blue focus:border-accent-blue transition"
              >
                {aspectRatios.map((ar) => (
                  <option key={ar.value} value={ar.value}>{ar.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">Image Style</label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value as ImageStyle)}
                className="w-full bg-navy border border-white/20 text-white rounded-lg p-3 focus:ring-accent-blue focus:border-accent-blue transition"
              >
                {styles.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Your Prompt</label>
            <textarea
              id="prompt"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., An abstract representation of AI and human collaboration."
              className="w-full bg-navy border border-white/20 text-white rounded-lg p-3 focus:ring-accent-blue focus:border-accent-blue transition placeholder-gray-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGenerate}
              disabled={isLoading || isSuggestionsLoading}
              className="flex-1 flex justify-center items-center px-6 py-3 text-lg font-bold rounded-lg shadow-lg text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-accent-blue/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <StarIcon className="w-6 h-6 mr-2" />
              {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
            <button
              onClick={handleGetSuggestions}
              disabled={isLoading || isSuggestionsLoading}
              className="flex-1 flex justify-center items-center px-6 py-3 font-semibold rounded-lg text-white bg-light-navy border border-white/20 hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <SparklesIcon className="w-5 h-5 mr-2" />
               {isSuggestionsLoading ? 'Improving...' : 'Improve Prompt'}
            </button>
          </div>
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>

        {isLoading && (
          <div className="mt-12 text-center">
            <Spinner />
            <p className="text-gray-400 mt-4">AI is crafting your images... Please wait.</p>
          </div>
        )}
        
        {generatedImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Your Generated Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {generatedImages.map((image, index) => (
                <div key={index} className="relative group bg-light-navy rounded-lg overflow-hidden border border-white/10">
                  <img src={image} alt={`Generated variation ${index + 1}`} className="w-full h-auto object-cover aspect-square" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDownload(image)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition"
                    >
                      <DownloadIcon className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isSuggestionsLoading && !suggestions && (
          <div className="mt-12 text-center">
            <Spinner />
            <p className="text-gray-400 mt-4">Getting suggestions for your prompt...</p>
          </div>
        )}
        
        {suggestions && (
          <div className="mt-12">
             <h2 className="text-3xl font-bold text-white text-center mb-8">Prompt Suggestions</h2>
             <div className="bg-light-navy p-6 rounded-lg border border-white/10 whitespace-pre-wrap font-mono text-gray-300">
               {suggestions}
             </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ImageGenerator;
