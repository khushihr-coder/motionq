"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { setAppLanguage } from "../components/language-toggle";

// Hindi TTS: speaks Hindi text aloud
function speak(text: string): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined") return null; // SSR browser check
  const synth = window.speechSynthesis;
  if (!synth) return null; // If TTS not supported
  const u = new window.SpeechSynthesisUtterance(text);
  u.lang = "hi-IN"; // Hindi voice
  u.rate = 1;
  u.pitch = 1;
  synth.cancel(); // Stop ongoing speech, if any
  synth.speak(u);
  return u;
}

// Fuzzy match: supports common Hindi ASR errors
function fuzzyMatch(words: string[], normalized: string) {
  return words.some(word => normalized.includes(word));
}

export default function HindiVoiceAssistant({
  onLanguageChange,
  isListening,
  setIsListening,
}: {
  onLanguageChange: (lang: 'en' | 'hi' | 'mr') => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}) {
  const router = useRouter();
  const [transcript, setTranscript] = useState(''); // Last transcript
  const [status, setStatus] = useState('तैयार (Ready)'); // UI status
  const [lastAction, setLastAction] = useState(''); // Last performed action
  const recognitionRef = useRef<any>(null); // Holds SpeechRecognition instance

  // Initialize Hindi Speech Recognition on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus('Speech Recognition supported नहीं है');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Hindi
    recognition.continuous = true; // Keep listening
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const text = lastResult[0].transcript.toLowerCase();
      setTranscript(text);
      handleCommand(text);
    };
    recognition.onerror = (event: any) => {
      setStatus('Error: ' + event.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      if (isListening) {
        try { recognition.start(); } catch {}
      }
    };
    recognitionRef.current = recognition;
  }, [isListening]);

  // Start/stop mic listening
  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (!isListening) {
      try {
        rec.start();
        setIsListening(true);
        setTranscript('');
        setStatus('सुन रहा हूँ... (Listening)');
        speak('सुन रहा हूँ');
      } catch {}
    } else {
      try {
        rec.stop();
        setIsListening(false);
        setStatus('बंद (Stopped)');
        speak('माइक बंद कर दिया');
      } catch {}
    }
  };

  // Hindi command handler: language switching, navigation, chat, scroll, video
  const handleCommand = (text: string) => {
    const normalized = text
      .normalize("NFC")
      .replace(/[.,!?;:\-"'""''()[\]{}\\/|<>]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    // Language switch to English/Hindi
    if (
      normalized.includes("अंग्रेजी") || normalized.includes("अंग्रेज़ी") ||
      normalized.includes("इंग्लिश") || normalized.includes("इंग्लिश खोलो") ||
      normalized.includes("इंग्लिश चालू करो") || normalized.includes("इंग्लिश जाओ") ||
      normalized.includes("अंग्रेज़ी खोलो") || normalized.includes("अंग्रेज़ी चालू करो") ||
      normalized.includes("अंग्रेज़ी जाओ") || normalized.includes("eng kholo") ||
      normalized.includes("eng chalu karo") || normalized.includes("eng jao") ||
      normalized.includes("eng") || normalized.includes("en") || normalized.includes("english") ||
      normalized.includes("english me") || normalized.includes("english kholo") ||
      normalized.includes("english chalu karo") || normalized.includes("english jao") ||
      normalized.includes("switch to english") || normalized.includes("change to english") ||
      normalized.includes("translate to english")
    ) {
      speak("साइट और वॉइस इंग्लिश में बदल रहे हैं");
      onLanguageChange("en");
      setAppLanguage("en");
      return;
    }
    if (
      normalized.includes("हिंदी") || normalized.includes("hindi") ||
      normalized.includes("switch to hindi") || normalized.includes("change to hindi") ||
      normalized.includes("translate to hindi")
    ) {
      speak("साइट और वॉइस हिंदी में बदल रहे हैं");
      onLanguageChange("hi");
      setAppLanguage("hi");
      return;
    }

    // Chatbot-control fuzzy matching
    const chatWords = ['चैट', 'चार', 'चाट', 'chat'];
    const closeWords = ['बंद', 'छुपाओ', 'close', 'रोक'];

    // Hindi navigation commands for your routes
    const navMap: Record<string, string> = {
      "होम": "/", "घर": "/", "होम जाओ": "/", "होम खोलो": "/",
      "प्रॉब्लम": "/problem", "समस्या": "/problem", "प्रॉब्लम जाओ": "/problem",
      "सॉल्यूशन": "/solution", "समाधान": "/solution", "सॉल्यूशन जाओ": "/solution",
      "डेमो": "/demo", "डेमो जाओ": "/demo", "डेमो खोलो": "/demo",
      "डाउनलोड": "/download", "डाउनलोड जाओ": "/download",
      "रिजल्ट": "/results", "परिणाम": "/results", "रिजल्ट जाओ": "/results",
      "टीम": "/team", "टीम जाओ": "/team",
      "प्राइवेसी": "/privacy", "गोपनीयता": "/privacy", "प्राइवेसी जाओ": "/privacy",
      "लॉगिन": "/login", "लॉगिन खोलो": "/login", "लॉगिन जाओ": "/login",
      "साइन अप": "/register", "साइन अप खोलो": "/register", "साइन अप जाओ": "/register",
      "रजिस्टर": "/register", "रजिस्टर खोलो": "/register", "रजिस्टर जाओ": "/register",
    };

    // Close chat: match both chat and close words
    if (fuzzyMatch(chatWords, normalized) && fuzzyMatch(closeWords, normalized)) {
      window.dispatchEvent(new Event("close-chatbot"));
      setLastAction('चैट बंद कर रहे हैं');
      speak('चैट बंद कर रहे हैं');
      return;
    }

    // Navigation
    for (const key of Object.keys(navMap)) {
      if (normalized.includes(key)) {
        if (window.location.pathname !== navMap[key]) {
          const rec = recognitionRef.current;
          if (rec) {
            try { rec.onresult = null; rec.stop(); setIsListening(false); } catch {}
          }
          setLastAction(`${key} पर जा रहे हैं`);
          speak(`${key} पर जा रहे हैं`);
          router.push(navMap[key]);
          setTimeout(() => {
            if (rec) {
              rec.onresult = (event: any) => {
                const lastResult = event.results[event.results.length - 1];
                const text = lastResult[0].transcript.toLowerCase();
                setTranscript(text);
                handleCommand(text);
              };
              try { rec.start(); setIsListening(true); } catch {}
            }
          }, 1100);
        }
        return;
      }
    }

    // Scroll up/down commands
    if (normalized.includes('स्क्रॉल ऊपर') || normalized.includes('ऊपर')) {
      setLastAction('ऊपर स्क्रोल किया');
      speak('ऊपर स्क्रोल किया');
      window.scrollBy({ top: -400, behavior: 'smooth' });
      return;
    }
    if (normalized.includes('स्क्रॉल नीचे') || normalized.includes('नीचे')) {
      setLastAction('नीचे स्क्रोल किया');
      speak('नीचे स्क्रोल किया');
      window.scrollBy({ top: 400, behavior: 'smooth' });
      return;
    }

    // Video commands
    if (normalized.includes('वीडियो चलाओ') || normalized.includes('प्ले')) {
      const video = document.querySelector('video') as HTMLVideoElement | null;
      if (video) {
        video.play()?.catch(() => {});
        setLastAction('वीडियो चला रहे हैं');
        speak('वीडियो चला रहे हैं');
      }
      return;
    }
    if (normalized.includes('वीडियो रोको') || normalized.includes('पॉज') || normalized.includes('वीडियो बंद')) {
      const video = document.querySelector('video') as HTMLVideoElement | null;
      if (video) {
        video.pause();
        setLastAction('वीडियो रोका');
        speak('वीडियो रोका');
      }
      return;
    }

    // Open chat
    if (
      fuzzyMatch(chatWords, normalized) &&
      (normalized.includes('खोल') || normalized.includes('ओपन') || normalized.includes('show') || normalized.includes('display'))
    ) {
      const chatButton = document.getElementById('open-chatbot-button');
      if (chatButton) {
        (chatButton as HTMLElement).click();
        setLastAction('चैट खोल रहे हैं');
        speak('चैट खोल रहे हैं');
      } else {
        setLastAction('चैट बटन नहीं मिला');
        speak('चैट बटन नहीं मिला');
      }
      return;
    }
    // Fallback chat open
    if (fuzzyMatch(chatWords, normalized)) {
      const chatButton = document.getElementById('open-chatbot-button');
      if (chatButton) {
        (chatButton as HTMLElement).click();
        setLastAction('चैट खोल रहे हैं');
        speak('चैट खोल रहे हैं');
      } else {
        setLastAction('चैट बटन नहीं मिला');
        speak('चैट बटन नहीं मिला');
      }
    }
  };

  // UI: mic status, toggle button
  return (
    <div className="pointer-events-auto flex flex-col items-start">
      {/* Hindi assistant status bar */}
      <div className="pointer-events-auto rounded-full border bg-background text-foreground shadow px-3 py-2 text-sm flex items-center gap-2">
        <span className="mr-1 font-medium">हिंदी आवाज़</span>
        <span className={`inline-flex h-2 w-2 rounded-full ${isListening ? "bg-orange-500 animate-pulse" : "bg-muted-foreground"}`} />
      </div>

      {/* Mic start/stop button */}
      <button
        type="button"
        onClick={toggleListening}
        className={`pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-ring ${
          isListening ? "bg-orange-600 text-white hover:bg-orange-500 ring-2 ring-orange-400" : "bg-orange-600 text-white hover:bg-orange-500"
        } mt-2`}
        aria-label={isListening ? 'हिंदी आवाज़ बंद करें' : 'हिंदी आवाज़ शुरू करें'}
      >
        {/* Mic SVG icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2ZM11 19.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93Z" />
        </svg>
      </button>
    </div>
  );
}
