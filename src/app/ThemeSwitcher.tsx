'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Switcher from '@/components/switcher/Switcher';
import SwitcherItem from '@/components/switcher/SwitcherItem';
import BiDesktopIcon from '@/components/icons/BiDesktopIcon';
import BiSunIcon from '@/components/icons/BiSunIcon';
import BiMoonIcon from '@/components/icons/BiMoonIcon';
import { useAppText } from '@/i18n/state/client';

export default function ThemeSwitcher () {
  const appText = useAppText();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Switcher
      // Apply offset due to outline strategy
      className="translate-x-[-1px]"
    >
      <SwitcherItem
        icon={<BiDesktopIcon />}
        onClick={() => setTheme('system')}
        active={theme === 'system'}
        tooltip={{ content: appText.theme.system }}
      />
      <SwitcherItem
        icon={<BiSunIcon />}
        onClick={() => setTheme('light')}
        active={theme === 'light'}
        tooltip={{ content: appText.theme.light }}
      />
      <SwitcherItem
        icon={<BiMoonIcon />}
        onClick={() => setTheme('dark')}
        active={theme === 'dark'}
        tooltip={{ content: appText.theme.dark }}
      />
    </Switcher>
  );
}
