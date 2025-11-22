"use client"

import { useRef, useState, useEffect, useCallback } from "react"

type SpeechRecognitionType = any

export function useSpeech() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")

  const recognitionRef = useRef<SpeechRecognitionType>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const shouldListenRef = useRef(false)
  const languageRef = useRef("en-US")

  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSupported(true)
      const rec = new SpeechRecognition()
      rec.continuous = true
      rec.interimResults = false
      recognitionRef.current = rec
    }

    if (window.speechSynthesis) {
      synthesisRef.current = new SpeechSynthesisUtterance()
    }

    return () => {
      if (recognitionRef.current) {
        shouldListenRef.current = false
        recognitionRef.current.abort()
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const speak = useCallback((
    text: string,
    language = "en-US",
    options: { rate?: number; pitch?: number; volume?: number } = {}
  ) => {
    if (typeof window === "undefined" || !window.speechSynthesis || !synthesisRef.current) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = options.rate || 1
    utterance.pitch = options.pitch || 1
    utterance.volume = options.volume || 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e)
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  const startListening = useCallback((
    onResult: (text: string) => void,
    language = "en-US"
  ) => {
    if (!recognitionRef.current) return

    // Update language if changed
    if (recognitionRef.current.lang !== language) {
      recognitionRef.current.lang = language
    }
    languageRef.current = language

    shouldListenRef.current = true
    setIsListening(true)

    try {
      recognitionRef.current.start()
    } catch (e) {
      // Already started or other error, ignore
    }

    recognitionRef.current.onresult = (event: any) => {
      const idx = typeof event.resultIndex === "number" ? event.resultIndex : event.results.length - 1
      const res = event.results[idx] || event.results[event.results.length - 1]
      if (!res || !res[0]) return

      const text = res[0].transcript.trim()
      setTranscript(text)
      onResult(text)
    }

    recognitionRef.current.onerror = (event: any) => {
      console.log("Speech recognition error:", event.error)
      if (event.error === 'not-allowed') {
        shouldListenRef.current = false
        setIsListening(false)
      }
      // For 'no-speech' or 'aborted', we might want to restart in onend
    }

    recognitionRef.current.onend = () => {
      if (shouldListenRef.current) {
        try {
          recognitionRef.current.start()
        } catch (e) {
          // Ignore restart errors
        }
      } else {
        setIsListening(false)
      }
    }
  }, [])

  const stopListening = useCallback(() => {
    shouldListenRef.current = false
    setIsListening(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [])

  // Helper to switch language dynamically
  const setLanguage = useCallback((lang: string) => {
    if (!recognitionRef.current) return

    const wasListening = shouldListenRef.current
    if (wasListening) {
      recognitionRef.current.stop() // onend will restart it with new language? No, onend restarts with current config.
      // We need to ensure the next start uses the new language.
      recognitionRef.current.lang = lang
      // The onend handler will call start(), which uses the updated lang property of the instance.
    } else {
      recognitionRef.current.lang = lang
    }
    languageRef.current = lang
  }, [])

  return {
    isListening,
    isSpeaking,
    isSupported,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    setLanguage
  }
}
