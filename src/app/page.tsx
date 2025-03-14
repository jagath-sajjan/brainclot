"use client";

import { useState, useEffect } from "react";

const morseCode: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': ' '
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [outputType, setOutputType] = useState("binary");
  const [outputValue, setOutputValue] = useState("");

  const convertText = (text: string, type: string): string => {
    switch (type) {
      case "binary":
        return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      case "hexadecimal":
        return text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
      case "octal":
        return text.split('').map(char => char.charCodeAt(0).toString(8).padStart(3, '0')).join(' ');
      case "assembly":
        return text.split('').map(char => `MOV AL, ${char.charCodeAt(0)} ; '${char}'`).join('\n');
      case "morse":
        return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
      default:
        return text;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputValue);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    const result = convertText(inputValue, outputType);
    setOutputValue(result);
  }, [inputValue, outputType]);

  return (
    <div className="min-h-screen bg-[var(--background)] p-6 sm:p-8 md:p-12 font-ndot">
      <main className="max-w-6xl mx-auto">
        <header className="text-center border-b-4 border-black pb-6 mb-8 vintage-border p-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black font-ntype82 tracking-tighter uppercase vintage-text mb-4">
            BRAIN CLOT NEWS
          </h1>
          <p className="text-sm font-ntype82mono mt-2">CONVERTING THOUGHTS INTO BITS AND BYTES - THE WORLD&apos;S MOST CRYPTIC NEWSPAPER</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 vintage-border p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-ntype82 border-b-2 border-black pb-2">CONVERT YOUR MESSAGE</h2>
              <div className="space-y-4">
                <label className="block text-lg font-ntype82mono">INPUT TEXT</label>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full h-32 p-4 border-2 border-black font-letteramono resize-none focus:ring-2 focus:ring-black focus:outline-none"
                  placeholder="Enter text to convert..."
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                "binary",
                "hexadecimal",
                "octal",
                "assembly",
                "morse"
              ].map((type) => (
                <button
                  key={type}
                  onClick={() => setOutputType(type)}
                  className={`px-4 py-2 vintage-button font-ntype82 text-sm ${outputType === type ? 'active' : ''}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                <h3 className="text-xl font-ntype82mono">DECODED MESSAGE</h3>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-[var(--accent)] hover:text-[var(--paper)] rounded-md transition-colors"
                  title="Copy to clipboard"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="w-full min-h-[8rem] p-4 vintage-border font-letteramono break-all whitespace-pre-wrap">
                {outputValue || "Your converted text will appear here"}
              </div>
            </div>
          </div>

          <aside className="md:col-span-4 space-y-6">
            <div className="vintage-border p-6">
              <h2 className="text-xl font-ntype82 border-b-2 border-black pb-2 mb-4">ABOUT THIS TOOL</h2>
              <p className="font-ntype82mono text-sm leading-relaxed">
                Our state-of-the-art conversion tool brings you the latest in text transformation technology.
                Convert your messages into various formats including Binary, Hexadecimal, Octal, Assembly, and Morse code.
              </p>
            </div>

            <div className="vintage-border p-6">
              <h2 className="text-xl font-ntype82 border-b-2 border-black pb-2 mb-4">DAILY QUOTE</h2>
              <blockquote className="font-letteramono text-sm italic">
                {getDailyQuote()}
              </blockquote>
            </div>
          </aside>
        </div>

        <footer className="text-center text-sm font-ntype82mono mt-8 pt-4 border-t-2 border-black">
          <p>Made with dedication by Jagath Sajjan - Est. 2025</p>
        </footer>
      </main>
    </div>
  );
}

const quotes = [
  "In the binary world, every bit counts.",
  "Code is poetry written in ones and zeros.",
  "Debugging: Being the detective in a crime scene where you're also the suspect.",
  "The best code is like a good newspaper - clear, concise, and well-structured.",
  "Every bug fixed is a story worth telling.",
  "In the realm of bits and bytes, clarity is king.",
  "Programming is the art of turning coffee into code."
];

const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return quotes[dayOfYear % quotes.length];
};
