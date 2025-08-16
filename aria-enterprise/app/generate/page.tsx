'use client';

import { useState } from 'react';

export default function ImageGenerationPage() {
  const [prompt, setPrompt] = useState('');
  const [imageSrc, setImageSrc] = useState('https://placehold.co/512x512/e2e8f0/4a5568?text=Your+Image+Will+Appear+Here');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      setError('Please enter a prompt.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const url = await callImageGenerationAPI(trimmed);
      setImageSrc(url);
    } catch (err) {
      console.error('Image generation failed:', err);
      setError('Failed to generate image. Please try again.');
      setImageSrc('https://placehold.co/512x512/fecaca/b91c1c?text=Generation+Failed');
    } finally {
      setLoading(false);
    }
  };

  async function callImageGenerationAPI(prompt: string, retries = 3, delay = 1000): Promise<string> {
    const payload = {
      instances: [{ prompt }],
      parameters: { sampleCount: 1 }
    };
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
          return `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
        } else {
          throw new Error('Invalid response structure from API.');
        }
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
      }
    }
    throw new Error('Failed to generate image');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 p-4 text-white">
      <div className="w-full max-w-2xl p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Image Generation App</h1>

        <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-white/80">Enter your prompt:</label>
        <textarea
          id="prompt"
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              generateImage();
            }
          }}
          placeholder="e.g., A futuristic cityscape at sunset..."
          className="w-full p-3 mb-4 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/60"
        />

        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full mb-6 py-3 px-4 font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        <div className="flex items-center justify-center min-h-[300px] bg-white/5 rounded-xl border border-white/10 p-4">
          {loading ? (
            <div className="w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin" />
          ) : (
            <img src={imageSrc} alt="Generated" className="max-w-full h-auto rounded-lg shadow-md" />
          )}
        </div>
        {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      </div>
    </div>
  );
}

