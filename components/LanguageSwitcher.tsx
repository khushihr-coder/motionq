'use client'

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('hi')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'hi' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        हिन्दी
      </button>
      <button
        onClick={() => changeLanguage('mr')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'mr' ? 'bg-blue-600 text-white' : 'bg-gray-200'
        }`}
      >
        मराठी
      </button>
    </div>
  );
}
