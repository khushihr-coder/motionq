"use client"

import { useRef, useState, useEffect } from "react"

export function useSpeech() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      setIsSupported(true)
    }

    // Initialize speech synthesis
    if (window.speechSynthesis) {
      synthesisRef.current = new SpeechSynthesisUtterance()
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const startListening = (onResult: (transcript: string) => void, language = "en-US") => {
    if (!recognitionRef.current || !isSupported) {
      console.warn("Speech recognition not supported")
      return
    }

    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = language

    recognitionRef.current.onstart = () => {
      setIsListening(true)
    }

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setIsListening(false)
    }

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const speak = (
    text: string,
    language = "en-US",
    options: {
      rate?: number
      pitch?: number
      volume?: number
    } = {},
  ) => {
    if (!synthesisRef.current || !window.speechSynthesis) {
      console.warn("Speech synthesis not supported")
      return
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel()

    synthesisRef.current.text = text
    synthesisRef.current.lang = language
    synthesisRef.current.rate = options.rate || 0.9
    synthesisRef.current.pitch = options.pitch || 1
    synthesisRef.current.volume = options.volume || 1

    synthesisRef.current.onstart = () => {
      setIsSpeaking(true)
    }

    synthesisRef.current.onend = () => {
      setIsSpeaking(false)
    }

    synthesisRef.current.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
    }

    window.speechSynthesis.speak(synthesisRef.current)
  }

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }

  return {
    isListening,
    isSpeaking,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  }
}
