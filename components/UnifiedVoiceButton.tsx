"use client"

import React, { useState } from 'react'
import VoiceAssistant from '../components/voice-assistant'             // English voice assistant
import HindiVoiceAssistant from '../components/hindi-voice-assistant'  // Hindi voice assistant
import MarathiVoiceAssistant from '../components/marathi-voice-assistant' // Marathi voice assistant

export default function UnifiedVoiceButton() {
  // State to track selected language: 'en' | 'hi' | 'mr'
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en')
  const [isListening, setIsListening] = useState(false)

  return (
    // Container fixed at bottom-left with high z-index and column layout
    <div className="fixed left-4 bottom-8 z-[1000] flex flex-col items-start gap-2 pointer-events-none">
      
      {/* Language toggle buttons row with pointer events enabled */}
      <div className="pointer-events-auto flex flex-row gap-2 mb-2">
        {/* English button */}
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 rounded-full border font-bold ${
            lang === 'en'
              ? "bg-blue-600 text-white ring-2 ring-blue-400"  // Highlight active selected language
              : "bg-gray-100 text-black"
          }`}
        >
          EN
        </button>
        {/* Hindi button */}
        <button
          onClick={() => setLang('hi')}
          className={`px-3 py-1 rounded-full border font-bold ${
            lang === 'hi'
              ? "bg-orange-600 text-white ring-2 ring-orange-400"
              : "bg-gray-100 text-black"
          }`}
        >
          हि
        </button>
        {/* Marathi button */}
        <button
          onClick={() => setLang('mr')}
          className={`px-3 py-1 rounded-full border font-bold ${
            lang === 'mr'
              ? "bg-purple-600 text-white ring-2 ring-purple-400"
              : "bg-gray-100 text-black"
          }`}
        >
          म
        </button>
      </div>

      {/* Assistant display container with pointer events enabled */}
      <div className="pointer-events-auto">
        {/* Conditionally render the voice assistant for selected language */}
        {lang === 'en' && (
          <div className="flex flex-col items-start">
            <VoiceAssistant 
              onLanguageChange={setLang}
              isListening={isListening}
              setIsListening={setIsListening}
            />
          </div>
        )}
        {lang === 'hi' && (
          <div className="flex flex-col items-start">
            <HindiVoiceAssistant 
              onLanguageChange={setLang}
              isListening={isListening}
              setIsListening={setIsListening}
            />
          </div>
        )}
        {lang === 'mr' && (
          <div className="flex flex-col items-start">
            <MarathiVoiceAssistant 
              onLanguageChange={setLang}
              isListening={isListening}
              setIsListening={setIsListening}
            />
          </div>
        )}
      </div>
    </div>
  )
}
