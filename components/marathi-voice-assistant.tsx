"use client"

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Marathi TTS
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

type MarathiVoiceAssistantProps = {
  onLanguageChange?: (lang: "en" | "hi" | "mr") => void,
  isListening: boolean,
  setIsListening: (b: boolean) => void
};

export default function MarathiVoiceAssistant({
  onLanguageChange,
  isListening,
  setIsListening
}: MarathiVoiceAssistantProps) {
  const router = useRouter();
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("तयार");
  const [lastAction, setLastAction] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setStatus("Speech Recognition समर्थित नाही");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "mr-IN";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const lastResult = event.results[event.results.length - 1];
      const text = lastResult[0].transcript.toLowerCase();
      console.log("Marathi SpeechRecognition heard:", text);
      setTranscript(text);
      handleCommand(text);
    };
    recognition.onerror = (event: any) => {
      setStatus("Error: " + event.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      console.log("Marathi SpeechRecognition ended. isListening:", isListening);
      if (isListening) {
        try { recognition.start(); } catch {}
      }
    };
    recognitionRef.current = recognition;

    if (isListening) {
      try {
        recognition.start();
        setStatus("ऐकत आहे... (Listening)");
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const toggleListening = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (!isListening) {
      try {
        rec.start();
        setIsListening(true);
        setTranscript("");
        setStatus("ऐकत आहे... (Listening)");
        speak("ऐकत आहे");
      } catch {}
    } else {
      try {
        rec.stop();
        setIsListening(false);
        setStatus("बंद (Stopped)");
        speak("माइक बंद केला");
      } catch {}
    }
  };

  const handleCommand = (text: string) => {
    const normalized = text
      .normalize("NFC")
      .replace(/[.,!?;:\-"'""''()[\]{}\\/|<>]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    if (
      normalized.includes("इंग्रजी") ||
      normalized.includes("switch to english") ||
      normalized.includes("english") ||
      normalized.match(/en.?gl.*/)
    ) {
      onLanguageChange && onLanguageChange("en");
      setLastAction("इंग्रजी मोड");
      speak("Switching to English");
      return;
    }
    if (
      normalized.includes("हिंदी") ||
      normalized.includes("switch to hindi") ||
      normalized.includes("हिन्दी") ||
      normalized.includes("hindi")
    ) {
      onLanguageChange && onLanguageChange("hi");
      setLastAction("हिंदी मोड");
      speak("Switching to Hindi");
      return;
    }
    if (
      normalized.includes("मराठी") ||
      normalized.includes("switch to marathi") ||
      normalized.includes("marathi")
    ) {
      onLanguageChange && onLanguageChange("mr");
      setLastAction("मराठी मोड");
      speak("Switching to Marathi");
      return;
    }

    // Navigation, chat, scroll, video commands ... as in your previous code (no change needed here)

    const chatWords = ["चॅट", "चॅट", "चट", "chat"];
    const closeWords = ["बंद", "लपवा", "close", "थांबवा"];

    const navMap: Record<string, string> = {
      "होम": "/",
      "घर": "/",
      "होम जा": "/",
      "होम उघड": "/",
      "प्रॉब्लेम": "/problem",
      "समस्या": "/problem",
      "प्रॉब्लेम जा": "/problem",
      "सोल्यूशन": "/solution",
      "उपाय": "/solution",
      "सोल्यूशन जा": "/solution",
      "डेमो": "/demo",
      "डेमो जा": "/demo",
      "डेमो उघड": "/demo",
      "डाउनलोड": "/download",
      "डाउनलोड जा": "/download",
      "रिझल्ट": "/results",
      "परिणाम": "/results",
      "रिझल्ट जा": "/results",
      "टीम": "/team",
      "टीम जा": "/team",
      "प्रायव्हसी": "/privacy",
      "गोपनीयता": "/privacy",
      "प्रायव्हसी जा": "/privacy",
      "लॉगिन": "/login",
      "लॉगिन उघड": "/login",
      "लॉगिन जा": "/login",
      "साइन अप": "/register",
      "साइन अप उघड": "/register",
      "साइन अप जा": "/register",
      "रजिस्टर": "/register",
      "रजिस्टर उघड": "/register",
      "रजिस्टर जा": "/register",
    };

    if (fuzzyMatch(chatWords, normalized) && fuzzyMatch(closeWords, normalized)) {
      window.dispatchEvent(new Event("close-chatbot"));
      setLastAction("चॅट बंद करत आहे");
      speak("चॅट बंद करत आहे");
      return;
    }

    for (const key of Object.keys(navMap)) {
      if (normalized.includes(key)) {
        if (window.location.pathname !== navMap[key]) {
          const rec = recognitionRef.current;
          if (rec) {
            try { rec.onresult = null; rec.stop(); setIsListening(false); } catch {}
          }
          setLastAction(`${key} वर जात आहे`);
          speak(`${key} वर जात आहे`);
          router.push(navMap[key]);
          setTimeout(() => {
            if (rec) {
              rec.onresult = (event: any) => {
                const lastResult = event.results[event.results.length - 1];
                const cmdText = lastResult[0].transcript.toLowerCase();
                setTranscript(cmdText);
                handleCommand(cmdText);
              };
              try { rec.start(); setIsListening(true); } catch {}
            }
          }, 1100);
        }
        return;
      }
    }

    if (normalized.includes("स्क्रोल वर") || normalized.includes("वर")) {
      window.scrollBy({ top: -400, behavior: "smooth" });
      setLastAction("वर स्क्रोल केले");
      speak("वर स्क्रोल केले");
      return;
    }
    if (normalized.includes("स्क्रोल खाली") || normalized.includes("खाली")) {
      window.scrollBy({ top: 400, behavior: "smooth" });
      setLastAction("खाली स्क्रोल केले");
      speak("खाली स्क्रोल केले");
      return;
    }

    if (normalized.includes("व्हिडिओ चालू") || normalized.includes("प्ले")) {
      const video = document.querySelector("video") as HTMLVideoElement | null;
      if (video) {
        video.play()?.catch(() => {});
        setLastAction("व्हिडिओ चालू करत आहे");
        speak("व्हिडिओ चालू करत आहे");
      }
      return;
    }
    if (normalized.includes("व्हिडिओ थांबवा") || normalized.includes("पॉज") || normalized.includes("व्हिडिओ बंद")) {
      const video = document.querySelector("video") as HTMLVideoElement | null;
      if (video) {
        video.pause();
        setLastAction("व्हिडिओ थांबवला");
        speak("व्हिडिओ थांबवला");
      }
      return;
    }

    if (
      fuzzyMatch(chatWords, normalized) &&
      (
        normalized.includes("उघड") ||
        normalized.includes("ओपन") ||
        normalized.includes("show") ||
        normalized.includes("display")
      )
    ) {
      const chatButton = document.getElementById("open-chatbot-button");
      if (chatButton) {
        (chatButton as HTMLElement).click();
        setLastAction("चॅट उघडत आहे");
        speak("चॅट उघडत आहे");
      } else {
        setLastAction("चॅट बटण सापडले नाही");
        speak("चॅट बटण सापडले नाही");
      }
      return;
    }

    if (fuzzyMatch(chatWords, normalized)) {
      const chatButton = document.getElementById("open-chatbot-button");
      if (chatButton) {
        (chatButton as HTMLElement).click();
        setLastAction("चॅट उघडत आहे");
        speak("चॅट उघडत आहे");
      } else {
        setLastAction("चॅट बटण सापडले नाही");
        speak("चॅट बटण सापडले नाही");
      }
    }
  };

  return (
    <div className="pointer-events-auto flex flex-col items-start">
      <div className="pointer-events-auto rounded-full border bg-background text-foreground shadow px-3 py-2 text-sm flex items-center gap-2">
        <span className="mr-1 font-medium">मराठी आवाज</span>
        <span
          className={`inline-flex h-2 w-2 rounded-full ${
            isListening ? "bg-purple-500 animate-pulse" : "bg-muted-foreground"
          }`}
        />
      </div>
      <button
        type="button"
        onClick={toggleListening}
        className={`pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-ring ${
          isListening
            ? "bg-purple-600 text-white hover:bg-purple-500 ring-2 ring-purple-400"
            : "bg-purple-600 text-white hover:bg-purple-500"
        } mt-2`}
        aria-label={isListening ? "मराठी आवाज बंद करा" : "मराठी आवाज सुरू करा"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2ZM11 19.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93Z" />
        </svg>
      </button>
    </div>
  );
}
