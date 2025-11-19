'use client'

import { useEffect } from 'react';
import '../../lib/i18n';  // Using @ alias

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // i18n initialized on mount
  }, []);
  
  return <>{children}</>;
}

