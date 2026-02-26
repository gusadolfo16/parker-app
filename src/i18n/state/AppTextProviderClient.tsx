'use client';

import { ReactNode, useEffect, useState } from 'react';
import { AppTextContext } from './client';
import { I18N } from '..';
import { generateAppTextState } from '.';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { TEXT as EN_US } from '../locales/en-us';

// Inner component that reads locale and swaps text
function AppTextConsumer({
  children,
  defaultValue,
}: {
  children: ReactNode;
  defaultValue: I18N;
}) {
  const { locale } = useLanguage();
  const [text, setText] = useState<I18N>(defaultValue);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (locale === 'en-us') {
        const { TEXT } = await import('../locales/en-us');
        if (!cancelled) setText(TEXT);
      } else {
        const { TEXT } = await import('../locales/es-ar');
        if (!cancelled) setText(TEXT);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [locale]);

  return (
    <AppTextContext.Provider value={generateAppTextState(text)}>
      {children}
    </AppTextContext.Provider>
  );
}

export default function AppTextProviderClient({
  children,
  value,
}: {
  children: ReactNode;
  value: I18N;
}) {
  // value comes from the server (based on NEXT_PUBLIC_LOCALE env var)
  // but locale toggle overrides it client-side
  return (
    <LanguageProvider>
      <AppTextConsumer defaultValue={value}>
        {children}
      </AppTextConsumer>
    </LanguageProvider>
  );
}
