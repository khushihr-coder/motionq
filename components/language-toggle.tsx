"use client"

import { useTranslation } from 'react-i18next';
import { Button } from "./ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const cycleLanguage = () => {
    const languages = ['en', 'hi', 'mr'];
    const currentIndex = languages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLang = languages[nextIndex];
    
    i18n.changeLanguage(newLang);
    localStorage.setItem("motionq-language", newLang);
    document.documentElement.lang = newLang;
  };

  const getLanguageLabel = () => {
    switch (i18n.language) {
      case 'hi': return 'हिन्दी';
      case 'mr': return 'मराठी';
      default: return 'English';
    }
  };

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
  );
}
