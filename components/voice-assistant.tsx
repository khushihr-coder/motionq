"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { setAppLanguage } from "../components/language-toggle";

// Function to initialize SpeechRecognition instance for voice input
function getRecognition(): any | null {
  if (typeof window === "undefined") return null; // Avoid SSR issues
  const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!Rec) return null; // Browser does not support speech recognition
  const rec = new Rec();
  rec.lang = "en-US";          // Default language for recognition - English US
  rec.continuous = true;       // Keep listening continuously
  rec.interimResults = false;  // Only consider final recognition results
  return rec;
}

// Function to convert text to speech using browser TTS API
function speak(text: string): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined") return null; // SSR safety
  const synth = window.speechSynthesis;
  if (!synth) return null; // TTS API not supported
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;      // Normal speech rate
  utterance.pitch = 1;     // Normal pitch
  utterance.lang = "en-US"; // Default voice language
  synth.cancel();          // Cancel ongoing speech (if any)
  synth.speak(utterance);  // Speak new text
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

  // State variables for transcripts and last actions
  const [transcriptUI, setTranscriptUI] = React.useState<string>("");
  const [lastAction, setLastAction] = React.useState<string>("");

  // Ref to maintain persistent SpeechRecognition instance
  const recognitionRef = React.useRef<any | null>(null);

  // Flag ref to prevent processing input while language is switching
  const isSwitchingRef = React.useRef(false);

  // Initialize speech recognition on component mount
  React.useEffect(() => {
    const rec = getRecognition();
    recognitionRef.current = rec;
    if (!rec) return;

    // Handle recognition results
    rec.onresult = (e: any) => {
      if (isSwitchingRef.current) return; // Ignore if switching languages
      const idx = typeof e.resultIndex === "number" ? e.resultIndex : e.results.length - 1;
      const res = e.results[idx] || e.results[e.results.length - 1];
      if (!res || !res[0]) return;
      const transcript: string = String(res[0].transcript || "").trim().toLowerCase();
      setTranscriptUI(transcript); // Update transcript in UI
      handleCommand(transcript);   // Handle recognized speech command
    };

    // Handle error events by stopping listening
    rec.onerror = () => setIsListening(false);

    // Auto-restart recognition if stopped and not switching language
    rec.onend = () => {
      if (isListening && !isSwitchingRef.current) {
        try {
          rec.start();
          setIsListening(true);
        } catch {}
      }
    };
  }, [isListening]);

  // Function to toggle microphone listening on/off
  function toggleListening() {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (!isListening) {
      try {
        rec.start();
        setIsListening(true);
        setTranscriptUI("");
        speak("Listening");  // Voice feedback on starting listen
      } catch {}
    } else {
      try {
        rec.stop();
        setIsListening(false);
      } catch {}
      speak("Stopped listening"); // Voice feedback on stop listening
    }
  }

  // Handles command text recognized by speech recognition
  function handleCommand(text: string) {
    // Normalize and clean up the command text
    const normalized = text
      .normalize("NFC")
      .replace(/[.,!?;:\-"'""''()[\]{}\\/|<>]/g, " ") // Remove punctuation
      .replace(/\s+/g, " ")                            // Collapse whitespace
      .trim()
      .toLowerCase();

    const rec = recognitionRef.current;

    // Check for commands to switch to Hindi language
    if (
      [
        "hindi",
        "hi",
        "switch to hindi",
        "change to hindi",
        "translate to hindi",
        "hindi mein jao",
        "hindi me jao",
        "hindi chaloo karo",
        "hindi kholo",
        "hindi chalu karo",
        "hindi activate karo",
      ].some(kw => normalized.includes(kw))
    ) {
      switchLangDebounced(rec, "hi", "Switching voice and site to Hindi");
      return;
    }

    // Check for commands to switch to Marathi language
    if (
      [
        "marathi",
        "switch to marathi",
        "change to marathi",
        "translate to marathi",
        "marathi mein jao",
        "marathi me jao",
        "marathi chaloo karo",
        "marathi kholo",
        "marathi chalu karo",
        "marathi activate karo",
        "marathit jaa",
        "marathi var jaa",
      ].some(kw => normalized.includes(kw))
    ) {
      switchLangDebounced(rec, "mr", "Switching voice and site to Marathi");
      return;
    }

    // Navigation command mappings
    const navMap: Record<string, string> = {
      home: "/",
      "go home": "/",
      "open home": "/",
      "navigate home": "/",
      problem: "/problem",
      "go to problem": "/problem",
      solution: "/solution",
      "go to solution": "/solution",
      demo: "/demo",
      "go to demo": "/demo",
      "open demo": "/demo",
      download: "/download",
      "go to download": "/download",
      results: "/results",
      "go to results": "/results",
      team: "/team",
      "go to team": "/team",
      privacy: "/privacy",
      "go to privacy": "/privacy",
      login: "/login",
      "open login": "/login",
      "go to login": "/login",
      "sign up": "/register",
      "open sign up": "/register",
      "go to sign up": "/register",
      register: "/register",
      "open register": "/register",
      "go to register": "/register",
    };

    // Handle navigation commands
    for (const key of Object.keys(navMap)) {
      if (normalized.includes(key)) {
        if (window.location.pathname !== navMap[key]) {
          if (rec) {
            try {
              rec.onresult = null;    // Temporarily disable recognition
              rec.stop();            // Stop recognition for navigation
              setIsListening(false);
            } catch {}
          }
          setLastAction(`Navigate to ${key}`);    // Update last action state
          speak(`Navigating to ${key}`);          // Voice feedback for navigation
          router.push(navMap[key]);                // Perform navigation
          // Restart recognition after navigation delay
          setTimeout(() => {
            if (rec) {
              rec.onresult = (e: any) => {
                const idx = typeof e.resultIndex === "number" ? e.resultIndex : e.results.length - 1;
                const res = e.results[idx] || e.results[e.results.length - 1];
                if (!res || !res[0]) return;
                const transcript: string = String(res[0].transcript || "").trim().toLowerCase();
                setTranscriptUI(transcript);
                handleCommand(transcript);
              };
              try {
                rec.start();
                setIsListening(true);
              } catch {}
            }
          }, 1100);
        }
        return;
      }
    }

    // Handle scroll commands
    if (normalized.includes("scroll up")) {
      setLastAction("Scroll up");
      speak("Scrolling up");
      window.scrollBy({ top: -400, left: 0, behavior: "smooth" });
      return;
    }
    if (normalized.includes("scroll down")) {
      setLastAction("Scroll down");
      speak("Scrolling down");
      window.scrollBy({ top: 400, left: 0, behavior: "smooth" });
      return;
    }

    // Handle chat commands to open chat window
    if (
      ["open chat", "show chat", "open chatbot", "show chatbot"].some(kw => normalized.includes(kw))
    ) {
      const chatButton = document.getElementById("open-chatbot-button");
      if (chatButton) {
        (chatButton as HTMLElement).click();
        setLastAction("Opening chat");
        speak("Opening chat");
      } else {
        setLastAction("Chatbot button not found");
        speak("Chatbot button not found");
      }
      return;
    }

    // Handle chat commands to close chat window
    if (
      ["close chat", "hide chat", "close chatbot", "hide chatbot"].some(kw => normalized.includes(kw))
    ) {
      const closeButton = document.getElementById("close-chatbot-button");
      if (closeButton) {
        (closeButton as HTMLElement).click();
        setLastAction("Closing chat");
        speak("Closing chat");
      } else {
        setLastAction("Close chat button not found");
        speak("Close chat button not found");
      }
      return;
    }
  }

  // Debounced language switching to avoid quick repeated triggers
  function switchLangDebounced(
    rec: any,
    lang: "hi" | "mr",
    spokenMsg: string,
  ) {
    isSwitchingRef.current = true;
    speak(spokenMsg);
    if (rec) {
      try {
        rec.onresult = null;
        rec.stop();
        setIsListening(false);
      } catch {}
    }
    onLanguageChange(lang);
    setAppLanguage(lang);
    setTimeout(() => {
      if (rec) {
        rec.onresult = (e: any) => {
          isSwitchingRef.current = false;
          const idx = typeof e.resultIndex === "number" ? e.resultIndex : e.results.length - 1;
          const res = e.results[idx] || e.results[e.results.length - 1];
          if (!res || !res[0]) return;
          const transcript: string = String(res[0].transcript || "").trim().toLowerCase();
          setTranscriptUI(transcript);
          handleCommand(transcript);
        };
        try {
          rec.start();
          setIsListening(true);
        } catch {}
      } else {
        isSwitchingRef.current = false;
      }
    }, 1100);
  }

  // JSX UI rendering for the assistant component including mic indicator and toggle button
  return (
    <div className="pointer-events-auto flex flex-col items-start">
      <div className="rounded-full border bg-background text-foreground shadow px-3 py-2 text-sm flex items-center gap-2">
        <span className="mr-1 font-medium">Voice</span>
        <span
          className={`inline-flex h-2 w-2 rounded-full ${
            isListening ? "bg-green-500" : "bg-muted-foreground"
          }`}
        />
      </div>
      <button
        type="button"
        aria-label={isListening ? "Stop voice assistant" : "Start voice assistant"}
        onClick={toggleListening}
        className={`inline-flex h-12 w-12 items-center justify-center rounded-full border shadow focus:outline-none focus:ring-2 focus:ring-ring bg-blue-600 text-white hover:bg-blue-500 ${
          isListening ? "animate-pulse ring-2 ring-green-500" : ""
        } mt-2`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2ZM11 19.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93Z" />
        </svg>
      </button>
    </div>
  );
}
