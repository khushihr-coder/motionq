"use client"

import { useState, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import { Button } from "./ui/button"
import { Globe } from "lucide-react"

export type LanguageCode = "en" | "hi" | "mr"

const LANGUAGES = [
  { code: "en" as LanguageCode, label: "English" },
  { code: "hi" as LanguageCode, label: "हिंदी" },
  { code: "mr" as LanguageCode, label: "मराठी" },
] as const

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<LanguageCode>("en")

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = (localStorage.getItem("motionq-language") as LanguageCode) || "en"
    setLanguage(savedLanguage)
    i18n.changeLanguage(savedLanguage)
    document.documentElement.lang = savedLanguage
  }, [i18n])

  // Listen for language changes from voice commands
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<LanguageCode>
      const newLang = customEvent.detail
      setLanguage(newLang)
      i18n.changeLanguage(newLang)
      document.documentElement.lang = newLang
    }

    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [i18n])

  const cycleLanguage = () => {
    const currIdx = LANGUAGES.findIndex(l => l.code === language)
    const nextLang = LANGUAGES[(currIdx + 1) % LANGUAGES.length].code
    setLanguage(nextLang)
    i18n.changeLanguage(nextLang)
    setAppLanguage(nextLang)
  }

  const getLanguageLabel = () => {
    return LANGUAGES.find(l => l.code === language)?.label || "English"
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={cycleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">{getLanguageLabel()}</span>
    </Button>
  )
}

export function setAppLanguage(newLanguage: LanguageCode) {
  localStorage.setItem("motionq-language", newLanguage)
  document.documentElement.lang = newLanguage
  window.dispatchEvent(new CustomEvent("languageChange", { detail: newLanguage }))
}
