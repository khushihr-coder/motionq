"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { setAppLanguage } from "../components/language-toggle";

function speak(text: string): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined") return null;
  const synth = window.speechSynthesis;
  if (!synth) return null;
  const u = new window.SpeechSynthesisUtterance(text);
  u.lang = "hi-IN";
  u.rate = 1;
  u.pitch = 1;
  synth.cancel();
  synth.speak(u);
  return u;
}

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
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);

  const handleCommand = useCallback((text: string) => {
    const normalized = text
      .normalize("NFC")
      .replace(/[.,!?;:\-"'""''()[\]{}\\/|<>]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    if (
      normalized.includes("अंग्रेजी") || normalized.includes("अंग्रेज़ी") ||
      normalized.includes("इंग्लिश") || normalized.includes("english") ||
      normalized.includes("eng") || normalized.includes("en")
    ) {
      speak("साइट और वॉइस इंग्लिश में बदल रहे हैं");
      onLanguageChange("en");
      setAppLanguage("en");
      return;
    }

    if (normalized.includes("मराठी") || normalized.includes("marathi")) {
      speak("साइट और वॉइस मराठी में बदल रहे हैं");
      onLanguageChange("mr");
      setAppLanguage("mr");
      return;
    }

    const chatWords = ['चैट', 'चार', 'चाट', 'chat'];
    const closeWords = ['बंद', 'छुपाओ', 'close', 'रोक'];

    const navMap: Record<string, string> = {
      "होम": "/", "घर": "/",
      "प्रॉब्लम": "/problem", "समस्या": "/problem",
      "सॉल्यूशन": "/solution", "समाधान": "/solution",
      "डेमो": "/demo",
      "डाउनलोड": "/download",
      "रिजल्ट": "/results", "परिणाम": "/results",
      "टीम": "/team",
      "प्राइवेसी": "/privacy", "गोपनीयता": "/privacy",
      "लॉगिन": "/login",
      "साइन अप": "/register", "रजिस्टर": "/register",
    };

    if (fuzzyMatch(chatWords, normalized) && fuzzyMatch(closeWords, normalized)) {
      window.dispatchEvent(new Event("close-chatbot"));
      speak('चैट बंद कर रहे हैं');
      return;
    }

    for (const key of Object.keys(navMap)) {
      if (normalized.includes(key)) {
        if (window.location.pathname !== navMap[key]) {
          speak(`${key} पर जा रहे हैं`);
          router.push(navMap[key]);
        }
        return;
      }
    }

    if (normalized.includes('ऊपर')) {
      speak('ऊपर स्क्रोल किया');
      window.scrollBy({ top: -400, behavior: 'smooth' });
      return;
    }
    if (normalized.includes('नीचे')) {
      speak('नीचे स्क्रोल किया');
      window.scrollBy({ top: 400, behavior: 'smooth' });
      return;
    }

    if (normalized.includes('वीडियो चलाओ') || normalized.includes('प्ले')) {
      const video = document.querySelector('video') as HTMLVideoElement | null;
      if (video) {
        video.play()?.catch(() => {});
        speak('वीडियो चला रहे हैं');
      }
      return;
    }
    if (normalized.includes('वीडियो रोको') || normalized.includes('पॉज')) {
      const video = document.querySelector('video') as HTMLVideoElement | null;
      if (video) {
        video.pause();
        speak('वीडियो रोका');
      }
      return;
    }

    if (fuzzyMatch(chatWords, normalized) && normalized.includes('खोल')) {
      const chatButton = document.getElementById('open-chatbot-button');
      if (chatButton) {
        (chatButton as HTMLElement).click();
        speak('चैट खोल रहे हैं');
      }
      return;
    }
  }, [router, onLanguageChange]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.continuous = true;
    recognition.interimResults = false;
    
    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const text = lastResult[0].transcript.toLowerCase();
      setTranscript(text);
      handleCommand(text);
    };
    
    recognition.onerror = (event: any) => {
      console.log('Recognition error:', event.error);
      if (event.error === 'aborted' || event.error === 'no-speech') return;
      shouldListenRef.current = false;
      setIsListening(false);
    };
    
    recognition.onend = () => {
      if (shouldListenRef.current) {
        try {
          recognition.start();
        } catch (e) {
          console.log('Restart failed:', e);
        }
      }
    };
    
    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          shouldListenRef.current = false;
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [handleCommand, setIsListening]);

  useEffect(() => {
    const rec = recognitionRef.current;
    if (!rec) return;

    if (isListening) {
      shouldListenRef.current = true;
      try {
        rec.start();
        setTranscript('');
        speak('सुन रहा हूँ');
      } catch (e) {
        console.log('Start failed:', e);
      }
    } else {
      shouldListenRef.current = false;
      try {
        rec.stop();
        speak('माइक बंद कर दिया');
      } catch (e) {
        console.log('Stop failed:', e);
      }
    }
  }, [isListening]);

  return null;
}
