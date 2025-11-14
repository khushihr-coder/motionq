"use client"

import React, { useState } from "react"
import VoiceAssistant from "../components/voice-assistant"
import HindiVoiceAssistant from "../components/hindi-voice-assistant"
import MarathiVoiceAssistant from "../components/marathi-voice-assistant"

export default function UnifiedVoiceButton() {
  const [lang, setLang] = useState<"en" | "hi" | "mr">("en")
  const [isListening, setIsListening] = useState(false)

  // Enhanced: Reset listening state for reliable mic reactivate (OPTIONAL: uncomment if issues)
  // useEffect(() => {
  //   setIsListening(false);
  // }, [lang]);

  // If you want to keep mic on across switches, use only this:
  const switchLang = (newLang: "en" | "hi" | "mr") => {
    setLang(newLang)
    // isListening state stays the same (recommended for seamless switching)
  }

  return (
    <div className="fixed left-4 bottom-8 z-[1000] flex flex-col items-start gap-2 pointer-events-none">
      {/* Language toggles */}
      <div className="pointer-events-auto flex flex-row gap-2 mb-2">
        <button
          onClick={() => switchLang("en")}
          className={`px-3 py-1 rounded-full border font-bold ${
            lang === "en" ? "bg-blue-600 text-white ring-2 ring-blue-400" : "bg-gray-100 text-black"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => switchLang("hi")}
          className={`px-3 py-1 rounded-full border font-bold ${
            lang === "hi" ? "bg-orange-600 text-white ring-2 ring-orange-400" : "bg-gray-100 text-black"
          }`}
        >
          हि
        </button>
        <button
          onClick={() => switchLang("mr")}
          className={`px-3 py-1 rounded-full border font-bold ${
            lang === "mr" ? "bg-purple-600 text-white ring-2 ring-purple-400" : "bg-gray-100 text-black"
          }`}
        >
          म
        </button>
      </div>
      {/* Voice assistants */}
      <div className="pointer-events-auto">
        {lang === "en" && (
          <VoiceAssistant
            onLanguageChange={switchLang}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        )}
        {lang === "hi" && (
          <HindiVoiceAssistant
            onLanguageChange={switchLang}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        )}
        {lang === "mr" && (
          <MarathiVoiceAssistant
            onLanguageChange={switchLang}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        )}
      </div>
    </div>
  )
}
