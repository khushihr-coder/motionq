"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { setAppLanguage } from "../components/language-toggle";

function getRecognition(): any | null {
  if (typeof window === "undefined") return null;
  const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!Rec) return null;
  const rec = new Rec();
  rec.lang = "en-US";
  rec.continuous = true;
  rec.interimResults = false;
  return rec;
}

function speak(text: string): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined") return null;
  const synth = window.speechSynthesis;
  if (!synth) return null;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = "en-US";
  synth.cancel();
  synth.speak(utterance);
  return utterance;
}

export default function VoiceAssistant({
  onLanguageChange,
  isListening,
  setIsListening,
}: {
  onLanguageChange: (lang: "en" | "hi" | "mr") => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}) {
  const router = useRouter();
  const [transcriptUI, setTranscriptUI] = React.useState<string>("");
  const recognitionRef = React.useRef<any | null>(null);
  const isSwitchingRef = React.useRef(false);
  const shouldListenRef = React.useRef(false);

  const handleCommand = React.useCallback((text: string) => {
    const normalized = text
      .normalize("NFC")
      .replace(/[.,!?;:\-"'""''()[\]{}\\/|<>]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    const rec = recognitionRef.current;

    if (
      [
        "hindi", "hi", "switch to hindi", "change to hindi",
        "translate to hindi", "hindi mein jao", "hindi me jao",
        "hindi chaloo karo", "hindi kholo", "hindi chalu karo",
        "hindi activate karo",
      ].some(kw => normalized.includes(kw))
    ) {
      switchLangDebounced(rec, "hi", "Switching voice and site to Hindi");
      return;
    }

    if (
      [
        "marathi", "switch to marathi", "change to marathi",
        "translate to marathi", "marathi mein jao", "marathi me jao",
        "marathi chaloo karo", "marathi kholo", "marathi chalu karo",
        "marathi activate karo", "marathit jaa", "marathi var jaa",
      ].some(kw => normalized.includes(kw))
    ) {
      switchLangDebounced(rec, "mr", "Switching voice and site to Marathi");
      return;
    }

    const navMap: Record<string, string> = {
      "home": "/", "go home": "/", "open home": "/",
      "problem": "/problem", "go to problem": "/problem",
      "solution": "/solution", "go to solution": "/solution",
      "demo": "/demo", "go to demo": "/demo", "open demo": "/demo",
      "download": "/download", "go to download": "/download",
      "results": "/results", "go to results": "/results",
      "team": "/team", "go to team": "/team",
      "privacy": "/privacy", "go to privacy": "/privacy",
      "login": "/login", "open login": "/login",
      "sign up": "/register", "register": "/register",
    };

    for (const key of Object.keys(navMap)) {
      if (normalized.includes(key)) {
        if (window.location.pathname !== navMap[key]) {
          speak(`Navigating to ${key}`);
          router.push(navMap[key]);
        }
        return;
      }
    }

    if (normalized.includes("scroll up")) {
      speak("Scrolling up");
      window.scrollBy({ top: -400, behavior: "smooth" });
      return;
    }
    if (normalized.includes("scroll down")) {
      speak("Scrolling down");
      window.scrollBy({ top: 400, behavior: "smooth" });
      return;
    }

    if (["open chat", "show chat", "open chatbot", "show chatbot"].some(kw => normalized.includes(kw))) {
      const chatButton = document.getElementById("open-chatbot-button");
      if (chatButton) {
        (chatButton as HTMLElement).click();
        speak("Opening chat");
      }
      return;
    }

    if (["close chat", "hide chat", "close chatbot", "hide chatbot"].some(kw => normalized.includes(kw))) {
      window.dispatchEvent(new Event("close-chatbot"));
      speak("Closing chat");
      return;
    }
  }, [router]);

  const switchLangDebounced = React.useCallback((
    rec: any,
    lang: "hi" | "mr",
    spokenMsg: string,
  ) => {
    isSwitchingRef.current = true;
    speak(spokenMsg);
    if (rec) {
      try {
        shouldListenRef.current = false;
        rec.stop();
        setIsListening(false);
      } catch {}
    }
    onLanguageChange(lang);
    setAppLanguage(lang);
    setTimeout(() => {
      isSwitchingRef.current = false;
    }, 1100);
  }, [onLanguageChange, setIsListening]);

  React.useEffect(() => {
    const rec = getRecognition();
    recognitionRef.current = rec;
    if (!rec) return;

    rec.onresult = (e: any) => {
      if (isSwitchingRef.current) return;
      const idx = typeof e.resultIndex === "number" ? e.resultIndex : e.results.length - 1;
      const res = e.results[idx] || e.results[e.results.length - 1];
      if (!res || !res[0]) return;
      const transcript: string = String(res[0].transcript || "").trim().toLowerCase();
      setTranscriptUI(transcript);
      handleCommand(transcript);
    };

    rec.onerror = (event: any) => {
      console.log('Recognition error:', event.error);
      if (event.error === 'aborted' || event.error === 'no-speech') {
        return;
      }
      shouldListenRef.current = false;
      setIsListening(false);
    };

    rec.onend = () => {
      if (shouldListenRef.current && !isSwitchingRef.current) {
        try {
          rec.start();
        } catch (e) {
          console.log('Restart failed:', e);
        }
      }
    };

    return () => {
      if (recognitionRef.current) {
        try {
          shouldListenRef.current = false;
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [handleCommand, setIsListening]);

  React.useEffect(() => {
    const rec = recognitionRef.current;
    if (!rec) return;

    if (isListening) {
      shouldListenRef.current = true;
      try {
        rec.start();
        setTranscriptUI('');
        speak("Listening");
      } catch (e) {
        console.log('Start failed:', e);
      }
    } else {
      shouldListenRef.current = false;
      try {
        rec.stop();
        speak("Stopped listening");
      } catch (e) {
        console.log('Stop failed:', e);
      }
    }
  }, [isListening]);

  return null;
}
