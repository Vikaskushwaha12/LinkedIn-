import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PERSONALITY_BLUEPRINT = `
🧠 My Personality Blueprint
👤 About Me

I’m a B.Tech CSE student who’s deeply passionate about coding, development, and AI.
My goal is to crack Google as a Software Engineer, and I’m building the skills, mindset, and consistency needed to make that happen.
I’m currently in my second year of college, managing academics, self-improvement, and personal fitness.
I cook daily, follow a vegetarian + egg diet, and stay active with home workouts.

🌐 My Content & Brand Personality

I’m building my LinkedIn personal brand around AI tools, productivity, tech, and self-help.
I write in simple, relatable, and human language, often inspired by Vaibhav Sisinty’s storytelling tone.
I also run U.S.-focused YouTube channels —

One based on Christian motivation and spirituality (God Jesus).

Another around AI, tech, and personal development (currently faceless, later transitioning to personal brand).
My content mixes emotion + education, and I always aim to inspire while teaching.

💡 My Mindset & Vision

I’m growth-oriented — I constantly seek clarity, structure, and progress.
I believe in discipline, reflection, and lifelong learning.
I value peace, purpose, and balance, not just hustle.
My mission is to combine AI + personal branding + tech into something meaningful and future-proof.
I’m not just building a career — I’m building impact.

🎯 My Goals

Get placed at Google (MNC) in my 3rd year.

Grow my LinkedIn with viral, story-driven posts.

Build multiple YouTube channels (AI + Faith-based).

Create my own AI Agent System to automate social media content.

Start a business that connects students, shop owners, and opportunities across India.

⚡ My Core Personality Summary

I’m a visionary Gen Z creator-engineer who blends logic with emotion — disciplined yet reflective, tech-driven yet deeply human.
I communicate in a calm, inspiring, and relatable tone that connects ambition with self-awareness.
My focus is on growth, clarity, and impact through AI, coding, and content creation.
`;

export type ImageStyle = 'professional' | 'minimal' | 'trendy' | 'emotional' | 'personality';

const generateSingleImage = async (prompt: string, aspectRatio: string, style: ImageStyle): Promise<string> => {
    let enhancedPrompt: string;

    if (style === 'personality') {
      enhancedPrompt = `You are a creative visual assistant for a specific individual. Your task is to generate an image based on their prompt, but infused with their unique personality and brand identity.

Here is their personality blueprint:
---
${PERSONALITY_BLUEPRINT}
---

Based on this blueprint, the image should reflect themes of:
- Technology, AI, and coding
- Growth, discipline, and self-improvement
- A blend of logic and emotion
- An inspiring, calm, and relatable tone
- Professionalism suitable for LinkedIn
- Potentially subtle hints of spirituality or faith-based motivation where appropriate.

The user's specific request is: "${prompt}"

Please generate a professional, high-quality image that captures this request through the lens of their personality. The image should have a ${aspectRatio} aspect ratio.`;
    } else {
      let styleDescriptor = '';
      switch (style) {
        case 'professional':
          styleDescriptor = 'A professional, corporate-style, high-quality image';
          break;
        case 'minimal':
          styleDescriptor = 'A minimal, clean, high-quality image with a simple color palette and ample negative space';
          break;
        case 'trendy':
          styleDescriptor = 'A trendy, modern, high-quality image using contemporary design elements, possibly with vibrant colors or bold typography';
          break;
        case 'emotional':
          styleDescriptor = 'An emotional, storytelling, high-quality image that evokes a specific feeling (e.g., inspiration, focus, collaboration)';
          break;
        default:
          styleDescriptor = 'A professional, high-quality image';
      }
      enhancedPrompt = `${styleDescriptor} suitable for a LinkedIn post. The image should depict: "${prompt}". Please generate the image with a ${aspectRatio} aspect ratio.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: enhancedPrompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          return `data:${mimeType};base64,${base64ImageBytes}`;
        }
      }
    }
    
    throw new Error("No image data found in the API response.");
};


export const generateImage = async (prompt: string, aspectRatio: string, style: ImageStyle, numVariations: number = 3): Promise<string[]> => {
  try {
    const generationPromises = Array(numVariations).fill(null).map(() => generateSingleImage(prompt, aspectRatio, style));
    const results = await Promise.all(generationPromises);
    return results;

  } catch (error) {
    console.error("Error generating image variations:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Failed to generate image variations: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred while generating image variations."));
  }
};


export const getPromptSuggestions = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on the following LinkedIn post idea, suggest improvements to make it more engaging. Provide:
1.  A few alternative, punchier headlines.
2.  A list of relevant hashtags.
3.  Appropriate emojis to sprinkle in.

Keep the tone professional and inspiring, suitable for a tech-savvy audience on LinkedIn. Format your response clearly with headings.

Post Idea: "${prompt}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting suggestions:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`Failed to get suggestions: ${error.message}`));
    }
    return Promise.reject(new Error("An unknown error occurred while getting suggestions."));
  }
};