"use client"

import { useTranslation } from 'react-i18next';

export type Language = "en" | "hi" | "mr"

export function useLanguage() {
  const { i18n } = useTranslation();
  return i18n.language as Language;
}

// No need for inline translations anymore - we'll use JSON files
