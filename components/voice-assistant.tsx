"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

function getRecognition(): any | null {
  if (typeof window === "undefined") return null
  const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (!Rec) return null
  const rec = new Rec()
  rec.lang = "en-US"
  rec.continuous = true
  rec.interimResults = false
  return rec
}

function speak(text: string): SpeechSynthesisUtterance | null {
  if (typeof window === "undefined") return null
  const synth = window.speechSynthesis
  if (!synth) return null
  const u = new SpeechSynthesisUtterance(text)
  u.rate = 1
  u.pitch = 1
  u.lang = "en-US"
  synth.cancel()
  synth.speak(u)
  return u
}

type VoiceAssistantProps = {
  onLanguageChange?: (lang: "en" | "hi" | "mr") => void
  isListening: boolean
  setIsListening: (b: boolean) => void
}

export default function VoiceAssistant({
  onLanguageChange,
  isListening,
  setIsListening,
}: VoiceAssistantProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [transcriptUI, setTranscriptUI] = useState<string>("")
  const [lastAction, setLastAction] = useState<string>("")
  const recognitionRef = useRef<any | null>(null)

  useEffect(() => {
    const rec = getRecognition()
    recognitionRef.current = rec
    if (!rec) return

    rec.onresult = (e: any) => {
      const idx =
        typeof e.resultIndex === "number" ? e.resultIndex : e.results.length - 1
      const res = e.results[idx] || e.results[e.results.length - 1]
      if (!res || !res[0]) return
      const transcript: string = String(res[0].transcript || "").trim().toLowerCase()
      console.log("SpeechRecognition heard:", transcript)
      setTranscriptUI(transcript)
      handleCommand(transcript)
    }

    rec.onerror = (e: any) => {
      if (e?.error === "aborted") {
        console.warn("SpeechRecognition aborted, ignoring error")
        return
      }
      console.error("SpeechRecognition error", e?.error)
      // Optionally comment the below if you want to keep continuous listening even on other errors.
      // setIsListening(false)
    }

    rec.onend = () => {
      console.log("SpeechRecognition ended. isListening:", isListening)
      if (isListening) {
        setTimeout(() => {
          try {
            rec.start()
          } catch (err) {
            console.error("SpeechRecognition restart error", err)
          }
        }, 200)
      }
    }

    if (isListening) {
      try {
        rec.start()
        console.log("SpeechRecognition started")
      } catch (err) {
        console.error("SpeechRecognition start error", err)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening])

  function toggleListening() {
    const rec = recognitionRef.current
    if (!rec) return
    if (!isListening) {
      try {
        rec.start()
        setIsListening(true)
        setTranscriptUI("")
        speak("Listening")
      } catch (err) {
        console.error("toggleListening start error", err)
      }
    } else {
      try {
        rec.stop()
        setIsListening(false)
      } catch (err) {
        console.error("toggleListening stop error", err)
      }
      speak("Stopped listening")
    }
  }

  function handleCommand(text: string) {
    const normalized = text
      .normalize("NFC")
      .replace(/[.,!?;:\-"'""''()[\]{}\\/|<>]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()

    console.log("handleCommand normalized:", normalized)

    if (
      normalized.includes("switch to english") ||
      normalized.includes("english") ||
      normalized.match(/en.?gl.*/)
    ) {
      onLanguageChange && onLanguageChange("en")
      setLastAction("Switching to English")
      speak("Switching to English")
      return
    }
    if (
      normalized.includes("switch to hindi") ||
      normalized.includes("hindi") ||
      normalized.match(/hin.*/)
    ) {
      onLanguageChange && onLanguageChange("hi")
      setLastAction("Switching to Hindi")
      speak("Switching to Hindi")
      return
    }
    if (
      normalized.includes("switch to marathi") ||
      normalized.includes("marathi") ||
      normalized.match(/mara.*/)
    ) {
      onLanguageChange && onLanguageChange("mr")
      setLastAction("Switching to Marathi")
      speak("Switching to Marathi")
      return
    }

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
    }

    const matchedKey = Object.keys(navMap).find((key) =>
      normalized.startsWith(key)
    )
    if (matchedKey) {
      const destination = navMap[matchedKey]
      if (window.location.pathname !== destination) {
        const rec = recognitionRef.current
        if (rec) {
          try {
            rec.onresult = null
            rec.stop()
            setIsListening(false)
          } catch {}
        }
        setLastAction(`Navigate to ${matchedKey}`)
        speak(`Navigating to ${matchedKey}`)
        router.push(destination)
        setTimeout(() => {
          if (rec) {
            rec.onresult = (e: any) => {
              const idx =
                typeof e.resultIndex === "number" ? e.resultIndex : e.results.length - 1
              const res = e.results[idx] || e.results[e.results.length - 1]
              if (!res || !res[0]) return
              const transcript: string = String(res[0].transcript || "").trim().toLowerCase()
              setTranscriptUI(transcript)
              handleCommand(transcript)
            }
            try {
              rec.start()
              setIsListening(true)
            } catch {}
          }
        }, 1100)
      }
      return
    }

    if (normalized.includes("scroll up")) {
      setLastAction("Scroll up")
      speak("Scrolling up")
      window.scrollBy({ top: -400, left: 0, behavior: "smooth" })
      return
    }
    if (normalized.includes("scroll down")) {
      setLastAction("Scroll down")
      speak("Scrolling down")
      window.scrollBy({ top: 400, left: 0, behavior: "smooth" })
      return
    }
    if (normalized.includes("play video") || normalized.includes("play")) {
      const video = document.querySelector("video") as HTMLVideoElement | null
      if (video) {
        video.play()?.catch(() => {})
        setLastAction("Playing video")
        speak("Playing video")
      }
      return
    }
    if (normalized.includes("pause video") || normalized.includes("pause")) {
      const video = document.querySelector("video") as HTMLVideoElement | null
      if (video) {
        video.pause()
        setLastAction("Pausing video")
        speak("Pausing video")
      }
      return
    }
    if (
      normalized.includes("open chat") ||
      normalized.includes("show chat") ||
      normalized.includes("open chatbot") ||
      normalized.includes("show chatbot")
    ) {
      const chatButton = document.getElementById("open-chatbot-button")
      if (chatButton) {
        ;(chatButton as HTMLElement).click()
        setLastAction("Opening chat")
        speak("Opening chat")
      } else {
        setLastAction("Chatbot button not found")
        speak("Chatbot button not found")
      }
      return
    }
    if (
      normalized.includes("close chat") ||
      normalized.includes("hide chat") ||
      normalized.includes("close chatbot") ||
      normalized.includes("hide chatbot")
    ) {
      const closeButton = document.getElementById("close-chatbot-button")
      if (closeButton) {
        ;(closeButton as HTMLElement).click()
        setLastAction("Closing chat")
        speak("Closing chat")
      } else {
        setLastAction("Close chat button not found")
        speak("Close chat button not found")
      }
      return
    }
  }

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
  )
}
