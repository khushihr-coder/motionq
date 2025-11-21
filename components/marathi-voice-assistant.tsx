"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { setAppLanguage } from "../components/language-toggle";

function speak(text: string): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined") return null;
  const synth = window.speechSynthesis;
  if (!synth) return null;
  const u = new window.SpeechSynthesisUtterance(text);
  u.lang = "mr-IN";
  u.rate = 1;
  u.pitch = 1;
  synth.cancel();
  synth.speak(u);
  return u;
}

function fuzzyMatch(words: string[], normalized: string) {
  return words.some(word => normalized.includes(word));
}

export default function MarathiVoiceAssistant({
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
      normalized.includes("इंग्रजी") || normalized.includes("इंग्लिश") ||
      normalized.includes("english") || normalized.includes("eng")
    ) {
      speak("साइट आणि व्हॉइस इंग्रजी मध्ये बदलत आहे");
      onLanguageChange("en");
      setAppLanguage("en");
      return;
    }

    if (normalized.includes("हिंदी") || normalized.includes("hindi")) {
      speak("साइट आणि व्हॉइस हिंदी मध्ये बदलत आहे");
      onLanguageChange("hi");
      setAppLanguage("hi");
      return;
    }

    const chatWords = ['चॅट', 'गप्पा', 'chat'];
    const closeWords = ['बंद', 'लपवा', 'close', 'थांबवा'];

    const navMap: Record<string, string> = {
      "होम": "/", "घर": "/",
      "प्रॉब्लेम": "/problem", "समस्या": "/problem",
      "सोल्यूशन": "/solution", "उपाय": "/solution",
      "डेमो": "/demo",
      "डाउनलोड": "/download",
      "रिझल्ट": "/results", "परिणाम": "/results",
      "टीम": "/team",
      "प्रायव्हसी": "/privacy", "गोपनीयता": "/privacy",
      "लॉगिन": "/login",
      "साइन अप": "/register", "रजिस्टर": "/register",
    };

    if (fuzzyMatch(chatWords, normalized) && fuzzyMatch(closeWords, normalized)) {
      window.dispatchEvent(new Event("close-chatbot"));
      speak('चॅट बंद करत आहे');
      return;
    }

    for (const key of Object.keys(navMap)) {
      if (normalized.includes(key)) {
        if (window.location.pathname !== navMap[key]) {
          speak(`${key} वर जात आहे`);
          router.push(navMap[key]);
        }
        return;
      }
    }

    if (normalized.includes('वर')) {
      speak('वर स्क्रोल केले');
      window.scrollBy({ top: -400, behavior: 'smooth' });
      return;
    }
    if (normalized.includes('खाली')) {
      speak('खाली स्क्रोल केले');
      window.scrollBy({ top: 400, behavior: 'smooth' });
      return;
    }

    if (normalized.includes('व्हिडिओ चालवा') || normalized.includes('प्ले')) {
      const video = document.querySelector('video') as HTMLVideoElement | null;
      if (video) {
        video.play()?.catch(() => {});
        speak('व्हिडिओ चालवत आहे');
      }
      return;
    }
    if (normalized.includes('व्हिडिओ थांबवा') || normalized.includes('पॉज')) {
      const video = document.querySelector('video') as HTMLVideoElement | null;
      if (video) {
        video.pause();
        speak('व्हिडिओ थांबवले');
      }
      return;
    }

    if (fuzzyMatch(chatWords, normalized) && normalized.includes('उघडा')) {
      const chatButton = document.getElementById('open-chatbot-button');
      if (chatButton) {
        (chatButton as HTMLElement).click();
        speak('चॅट उघडत आहे');
      }
      return;
    }
  }, [router, onLanguageChange]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'mr-IN';
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
        speak('ऐकत आहे');
      } catch (e) {
        console.log('Start failed:', e);
      }
    } else {
      shouldListenRef.current = false;
      try {
        rec.stop();
        speak('मायक बंद केला');
      } catch (e) {
        console.log('Stop failed:', e);
      }
    }
  }, [isListening]);

  return null;
}
