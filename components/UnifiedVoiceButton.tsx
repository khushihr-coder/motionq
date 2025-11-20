"use client"

import React, { useState } from 'react'
import VoiceAssistant from '../components/voice-assistant'
import HindiVoiceAssistant from '../components/hindi-voice-assistant'
import MarathiVoiceAssistant from '../components/marathi-voice-assistant'

export default function UnifiedVoiceButton() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en')
  const [isListening, setIsListening] = useState(false)

  const handleToggleListening = () => {
    setIsListening(prev => !prev)
  }

  return (
    <div className="fixed left-4 bottom-8 z-[1000] flex flex-col items-start gap-2 pointer-events-none">
      
      {/* Language + Mic buttons in one row */}
      <div className="pointer-events-auto flex flex-row gap-2">
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 rounded-full border font-bold transition-all ${
            lang === 'en'
              ? "bg-blue-600 text-white ring-2 ring-blue-400"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('hi')}
          className={`px-3 py-1 rounded-full border font-bold transition-all ${
            lang === 'hi'
              ? "bg-orange-600 text-white ring-2 ring-orange-400"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          हि
        </button>
        <button
          onClick={() => setLang('mr')}
          className={`px-3 py-1 rounded-full border font-bold transition-all ${
            lang === 'mr'
              ? "bg-purple-600 text-white ring-2 ring-purple-400"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          म
        </button>

        {/* Microphone button */}
        <button
          onClick={handleToggleListening}
          className={`h-10 w-10 rounded-full border-2 shadow-lg transition-all flex items-center justify-center ${
            isListening
              ? lang === 'en' 
                ? "bg-blue-600 border-blue-400 ring-4 ring-blue-300" 
                : lang === 'hi'
                ? "bg-orange-600 border-orange-400 ring-4 ring-orange-300"
                : "bg-purple-600 border-purple-400 ring-4 ring-purple-300"
              : "bg-gray-700 border-gray-600 hover:bg-gray-600"
          }`}
          aria-label={isListening ? "Stop voice assistant" : "Start voice assistant"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            className={isListening ? "animate-pulse" : ""}
          >
            <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2ZM11 19.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93Z" />
          </svg>
        </button>
      </div>

      {/* Hidden assistant components */}
      <div className="hidden">
        {lang === 'en' && (
          <VoiceAssistant 
            onLanguageChange={setLang}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        )}
        {lang === 'hi' && (
          <HindiVoiceAssistant 
            onLanguageChange={setLang}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        )}
        {lang === 'mr' && (
          <MarathiVoiceAssistant 
            onLanguageChange={setLang}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        )}
      </div>
    </div>
  )
}
