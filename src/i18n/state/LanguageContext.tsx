'use client';

import {
    createContext,
    use,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from 'react';

type Locale = 'es-ar' | 'en-us';

const STORAGE_KEY = 'parker-locale';
const DEFAULT_LOCALE: Locale = 'es-ar';

interface LanguageContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
    locale: DEFAULT_LOCALE,
    setLocale: () => { },
});

export const useLanguage = () => use(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

    // Restore from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
            if (stored === 'es-ar' || stored === 'en-us') {
                setLocaleState(stored);
            }
        } catch {
            // localStorage not available (SSR / private mode)
        }
    }, []);

    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore
        }
    }, []);

    return (
        <LanguageContext.Provider value={{ locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
}
