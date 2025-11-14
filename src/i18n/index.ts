import { TEXT as EN_US } from './locales/en-us';
import { setDefaultOptions } from 'date-fns';
// Dynamically resolves in next.config.ts
import locale from './date-fns-locale-alias';

export type I18N = typeof EN_US;

/**
 * TRANSLATION STEPS FOR CONTRIBUTORS:
 * 1. Create new file in `src/i18n/locales` modeled on `en-us.ts`—
 *    MAKE SURE to export a default date-fns locale
 * 3. Add import to `LOCALE_TEXT_IMPORTS`
 * 4. Test locally
 * 4. Add translation/credit to `README.md` Supported Languages
 */

export const getTextForLocale = async (locale: string): Promise<I18N> => {
  return EN_US;
};

export const setDefaultDateFnLocale = () => setDefaultOptions({ locale });
