"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { MessageCircle, Mic, MicOff, Volume2, VolumeX, X, Send, Languages } from "lucide-react"
import { useLanguage } from "../hooks/use-language"
import { useSpeech } from "../hooks/use-speech"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  language?: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatLanguage, setChatLanguage] = useState<"en" | "hi">("en")
  const language = useLanguage()
  const { isListening, isSpeaking, isSupported, startListening, stopListening, speak, stopSpeaking } = useSpeech()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleCloseChatbot() {
      setIsOpen(false);
    }
    window.addEventListener("close-chatbot", handleCloseChatbot);
    return () => window.removeEventListener("close-chatbot", handleCloseChatbot);
  }, []);

  const chatbotTranslations = {
    en: {
      title: "MotionQ Assistant",
      placeholder: "Ask about downloads, features...",
      send: "Send",
      listening: "Listening...",
      speaking: "Speaking...",
      switchToHindi: "Switch to Hindi",
      switchToEnglish: "Switch to English",
      languageDetected: "Language detected and switched to",
      welcome:
        "Hello! I'm your MotionQ assistant. I can help you download software, answer questions, and connect with our community. You can speak to me in English or Hindi. How can I assist you today?",
    },
    hi: {
      title: "MotionQ सहायक",
      placeholder: "डाउनलोड, फीचर्स के बारे में पूछें...",
      send: "भेजें",
      listening: "सुन रहा हूं...",
      speaking: "बोल रहा हूं...",
      switchToHindi: "हिंदी में बदलें",
      switchToEnglish: "अंग्रेजी में बदलें",
      languageDetected: "भाषा पहचानी गई और बदल दी गई",
      welcome:
        "नमस्ते! मैं आपका MotionQ सहायक हूं। मैं आपको सॉफ्टवेयर डाउनलोड करने, सवालों के जवाब देने और हमारी कम्युनिटी से जुड़ने में मदद कर सकता हूं। आप मुझसे हिंदी या अंग्रेजी में बात कर सकते हैं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
    },
  }

  const t = chatbotTranslations[chatLanguage] || chatbotTranslations.en

  useEffect(() => {
    setChatLanguage(language as "en" | "hi")
  }, [language])

  useEffect(() => {
    if (isOpen && messages.length === 0 && t?.welcome) {
      // Add welcome message when chatbot opens
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: t.welcome,
        isUser: false,
        timestamp: new Date(),
        language: chatLanguage,
      }
      setMessages([welcomeMessage])

      setTimeout(() => {
        if (speak && t.welcome) {
          speak(t.welcome, chatLanguage === "hi" ? "hi-IN" : "en-US")
        }
      }, 500)
    }
  }, [isOpen, t?.welcome, chatLanguage, speak])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const detectLanguage = (text: string): "en" | "hi" => {
    const hindiPattern = /[\u0900-\u097F]/
    const hindiWords = ["है", "हूं", "के", "में", "से", "को", "का", "की", "और", "या", "नहीं", "हैं", "था", "थी", "होगा", "होगी"]
    const englishWords = ["the", "is", "are", "and", "or", "not", "have", "has", "will", "would", "can", "could"]

    if (hindiPattern.test(text)) return "hi"

    const words = text.toLowerCase().split(" ")
    const hindiCount = words.filter((word) => hindiWords.includes(word)).length
    const englishCount = words.filter((word) => englishWords.includes(word)).length

    return hindiCount > englishCount ? "hi" : "en"
  }

  const addMessage = (text: string, isUser: boolean, detectedLang?: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
      language: detectedLang || chatLanguage,
    }
    setMessages((prev) => [...prev, message])
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage = inputText.trim()
    const detectedLang = detectLanguage(userMessage)

    if (detectedLang !== chatLanguage) {
      setChatLanguage(detectedLang)
      const switchMessage = `${chatbotTranslations[detectedLang].languageDetected} ${detectedLang === "hi" ? "हिंदी" : "English"}`
      addMessage(switchMessage, false, detectedLang)
    }

    setInputText("")
    addMessage(userMessage, true, detectedLang)
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(userMessage, detectedLang)
      addMessage(response, false, detectedLang)
      setIsLoading(false)

      speak(response, detectedLang === "hi" ? "hi-IN" : "en-US")
    }, 1000)
  }

  const generateResponse = (input: string, lang: "en" | "hi" = chatLanguage): string => {
    const lowerInput = input.toLowerCase()

    if (lang === "hi") {
      if (lowerInput.includes("डाउनलोड") || lowerInput.includes("download")) {
        return "आप हमारे डाउनलोड पेज से MotionQ सॉफ्टवेयर डाउनलोड कर सकते हैं। यह Windows, Mac और Linux के लिए उपलब्ध है। सॉफ्टवेयर में आई ट्रैकिंग, जेस्चर कंट्रोल और वॉयस कमांड की सुविधा है। क्या आपको इंस्टॉलेशन में मदद चाहिए?"
      }
      if (lowerInput.includes("कम्युनिटी") || lowerInput.includes("community") || lowerInput.includes("समुदाय")) {
        return "हमारी कम्युनिटी बहुत सक्रिय है! आप हमारे फोरम, Discord सर्वर, Telegram ग्रुप या सोशल मीडिया पर जुड़ सकते हैं। हमारे पास हिंदी भाषी उपयोगकर्ताओं के लिए अलग ग्रुप भी है। किस प्लेटफॉर्म की जानकारी चाहिए?"
      }
      if (lowerInput.includes("फीचर") || lowerInput.includes("feature") || lowerInput.includes("सुविधा")) {
        return "MotionQ में कई शानदार फीचर्स हैं: आई ट्रैकिंग (आंखों की गति से कंट्रोल), हैंड जेस्चर कंट्रोल, वॉयस कमांड, फेशियल एक्सप्रेशन रिकग्निशन, और एक्सेसिबिलिटी टूल्स। यह विशेष रूप से दिव्यांग व्यक्तियों के लिए बनाया गया है। कौन सा फीचर जानना चाहते हैं?"
      }
      if (lowerInput.includes("कैसे") || lowerInput.includes("how") || lowerInput.includes("how to") || lowerInput.includes("उपयोग")) {
        return "MotionQ का उपयोग बहुत आसान है! पहले सॉफ्टवेयर डाउनलोड करें, फिर कैमरा सेटअप करें। आंखों की गति या हाथ के इशारों से आप कंप्यूटर को कंट्रोल कर सकते हैं। क्या आपको स्टेप-बाई-स्टेप गाइड चाहिए?"
      }
      return "मैं आपकी मदद करने के लिए यहां हूं! आप मुझसे डाउनलोड, फीचर्स, कम्युनिटी, या MotionQ के उपयोग के बारे में हिंदी या अंग्रेजी में पूछ सकते हैं।"
    } else {
      if (lowerInput.includes("download")) {
        return "You can download MotionQ software from our download page. It's available for Windows, Mac, and Linux with features like eye tracking, gesture control, and voice commands. The software is designed for accessibility and ease of use. Would you like help with installation or system requirements?"
      }
      if (lowerInput.includes("community")) {
        return "Our community is very active and welcoming! You can join us on our forum, Discord server, Telegram groups, or social media platforms. We have dedicated groups for different languages including Hindi speakers. Which platform interests you most?"
      }
      if (lowerInput.includes("feature")) {
        return "MotionQ includes powerful features: Eye tracking (control with eye movement), hand gesture recognition, voice commands, facial expression detection, and comprehensive accessibility tools. It's specifically designed to help people with disabilities interact with computers. Which feature would you like to explore?"
      }
      if (lowerInput.includes("how") || lowerInput.includes("use") || lowerInput.includes("how to")) {
        return "Using MotionQ is straightforward! First download and install the software, then set up your camera. You can control your computer using eye movements, hand gestures, or voice commands. Would you like a detailed setup guide or tutorial?"
      }
      return "I'm here to help! You can ask me about downloads, features, community, or how to use MotionQ. Feel free to speak in English or Hindi - I understand both languages!"
    }
  }

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening(
        (transcript) => {
          setInputText(transcript)
        },
        chatLanguage === "hi" ? "hi-IN" : "en-US",
      )
    }
  }

  const toggleChatLanguage = () => {
    const newLang = chatLanguage === "en" ? "hi" : "en"
    setChatLanguage(newLang)
    const switchMessage = `${chatbotTranslations[newLang].languageDetected} ${newLang === "hi" ? "हिंदी" : "English"}`
    addMessage(switchMessage, false, newLang)
  }

  if (!isOpen) {
    return (
      <Button
        id="open-chatbot-button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50"
        size="icon"
        aria-label="Open chatbot"
      >
        <MessageCircle className="h-6 w-6 text-primary-foreground" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex-none flex items-center justify-between p-4 border-b bg-primary text-primary-foreground fixed w-96 z-50">
        <h3 className="font-semibold">{t?.title || "MotionQ Assistant"}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChatLanguage}
            className="h-8 w-8 text-primary-foreground hover:bg-primary/80"
            title={chatLanguage === "en" ? t.switchToHindi : t.switchToEnglish}
          >
            <Languages className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={isSpeaking ? stopSpeaking : undefined}
            className="h-8 w-8 text-primary-foreground hover:bg-primary/80"
            disabled={!isSpeaking}
          >
            {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Button
            id="close-chatbot-button"
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-primary-foreground hover:bg-primary/80"
            aria-label="Close chatbot"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 pb-0 overflow-y-auto pt-20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {message.language && (
                    <span className="text-xs opacity-70 ml-2">{message.language === "hi" ? "हि" : "EN"}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex-none p-4 border-t bg-background">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? t?.listening || "Listening..." : t?.placeholder || "Ask me anything..."}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isListening || isLoading}
              className="pr-12"
            />
            {isSupported && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceInput}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={isLoading}
                title={`${chatLanguage === "hi" ? "हिंदी" : "English"} में बोलें / Speak in ${chatLanguage === "hi" ? "Hindi" : "English"}`}
              >
                {isListening ? <MicOff className="h-4 w-4 text-red-500 animate-pulse" /> : <Mic className="h-4 w-4" />}
              </Button>
            )}
          </div>
          <Button onClick={handleSendMessage} disabled={!inputText.trim() || isLoading} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>
            {chatLanguage === "hi" ? "हिंदी में बात करें" : "Speak in English"} •
            {chatLanguage === "hi" ? " अंग्रेजी भी समझता हूं" : " Hindi also supported"}
          </span>
          <span className="font-medium">{chatLanguage === "hi" ? "हि" : "EN"}</span>
        </div>
      </div>
    </Card>
  )
}
