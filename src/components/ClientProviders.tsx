'use client';

import { LanguageProvider } from '@/contexts/LanguageContext';
import PasswordGate from './PasswordGate';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PasswordGate>{children}</PasswordGate>
    </LanguageProvider>
  );
}
