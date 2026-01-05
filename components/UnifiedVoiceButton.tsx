"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSpeech } from '../hooks/use-speech'
import { processCommand } from '../lib/voice-commands'
import { setAppLanguage } from './language-toggle'

export default function UnifiedVoiceButton() {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en')
  const router = useRouter()
  const speech = useSpeech()

  // Keep track of lang in a ref to access current value in callbacks without re-binding
  const langRef = useRef(lang)
  useEffect(() => {
    langRef.current = lang
  }, [lang])

  const localeMap = {
    en: 'en-US',
    hi: 'hi-IN',
    mr: 'mr-IN'
  }

  const handleLanguageChange = useCallback((newLang: 'en' | 'hi' | 'mr') => {
    setLang(newLang)
    setAppLanguage(newLang)
    speech.setLanguage(localeMap[newLang])
  }, [speech])

  const handleResult = useCallback((text: string) => {
    processCommand(text, langRef.current, {
      router,
      setLang: handleLanguageChange,
      speak: (t, l) => speech.speak(t, localeMap[l]),
      setIsListening: (listening) => {
        if (!listening) {
          speech.stopListening()
        }
      }
    })
  }, [router, speech, handleLanguageChange])

  const toggleListening = () => {
    if (speech.isListening) {
      speech.stopListening()
    } else {
      speech.startListening(handleResult, localeMap[lang])
    }
  }

  return (
    <div className="fixed left-4 bottom-8 z-[1000] flex flex-col items-start gap-2 pointer-events-none">

      {/* Language + Mic buttons in one row */}
      <div className="pointer-events-auto flex flex-row gap-2">
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 rounded-full border font-bold transition-all ${lang === 'en'
              ? "bg-blue-600 text-white ring-2 ring-blue-400"
              : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange('hi')}
          className={`px-3 py-1 rounded-full border font-bold transition-all ${lang === 'hi'
              ? "bg-orange-600 text-white ring-2 ring-orange-400"
              : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
        >
          हि
        </button>
        <button
          onClick={() => handleLanguageChange('mr')}
          className={`px-3 py-1 rounded-full border font-bold transition-all ${lang === 'mr'
              ? "bg-purple-600 text-white ring-2 ring-purple-400"
              : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
        >
          म
        </button>

        {/* Microphone button */}
        <button
          onClick={toggleListening}
          className={`h-10 w-10 rounded-full border-2 shadow-lg transition-all flex items-center justify-center ${speech.isListening
              ? lang === 'en'
                ? "bg-blue-600 border-blue-400 ring-4 ring-blue-300"
                : lang === 'hi'
                  ? "bg-orange-600 border-orange-400 ring-4 ring-orange-300"
                  : "bg-purple-600 border-purple-400 ring-4 ring-purple-300"
              : "bg-gray-700 border-gray-600 hover:bg-gray-600"
            }`}
          aria-label={speech.isListening ? "Stop voice assistant" : "Start voice assistant"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            className={speech.isListening ? "animate-pulse" : ""}
          >
            <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2ZM11 19.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93Z" />
          </svg>
        </button>
      </div>

      {/* Transcript display for feedback */}
      {speech.isListening && speech.transcript && (
        <div className="pointer-events-auto bg-black/80 text-white px-4 py-2 rounded-lg max-w-xs text-sm">
          {speech.transcript}
        </div>
      )}
    </div>
  )
}
