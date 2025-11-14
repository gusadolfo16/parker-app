'use client';

import { clsx } from 'clsx/lite';
import AppGrid from '../components/AppGrid';
import ThemeSwitcher from '@/app/ThemeSwitcher';
import Link from 'next/link';
import { SHOW_REPO_LINK } from '@/app/config';
import RepoLink from '../components/RepoLink';
import { usePathname } from 'next/navigation';
import { PATH_ADMIN_PHOTOS, PATH_ROOT, isPathAdmin, isPathSignIn } from './path';
import AnimateItems from '@/components/AnimateItems';
import { useAppState } from '@/app/AppState';
import Spinner from '@/components/Spinner';
import { useAppText } from '@/i18n/state/client';
import { signOut } from 'next-auth/react';

export default function Footer() {
  const pathname = usePathname();

  const {
    userEmail,
    userEmailEager,
    isCheckingAuth,
  } = useAppState();

  const appText = useAppText();

  const showFooter = !isPathSignIn(pathname);

  const shouldAnimate = !isPathAdmin(pathname);

  return (
    <AppGrid
      contentMain={
        <AnimateItems
          animateOnFirstLoadOnly
          type={!shouldAnimate ? 'none' : 'bottom'}
          distanceOffset={10}
          items={showFooter
            ? [<div
              key="footer"
              className={clsx(
                'flex items-center gap-1',
                'text-dim min-h-10',
              )}>
              <div className="flex gap-x-3 xs:gap-x-4 grow flex-wrap">
                {userEmail || userEmailEager
                  ? <>
                    <div className="truncate max-w-full">
                      {userEmail || userEmailEager}
                    </div>
                    <button
                      onClick={() => signOut({ callbackUrl: PATH_ROOT })}
                      className={clsx(
                        'font-mono link h-4 active:text-medium',
                        'disabled:bg-transparent! hover:text-dim',
                        'inline-flex items-center gap-1.5 self-start',
                        'whitespace-nowrap focus:outline-hidden text-medium',
                      )}
                    >
                      {appText.auth.signOut}
                    </button>
                  </>
                  : isCheckingAuth
                    ? <Spinner size={16} className="translate-y-[2px]" />
                    : SHOW_REPO_LINK
                      ? <RepoLink />
                      : <Link href={PATH_ADMIN_PHOTOS}>
                        {appText.nav.admin}
                      </Link>}
              </div>
              <div className="flex items-center h-10">
                <ThemeSwitcher />
              </div>
            </div>]
            : []}
        />}
    />
  );
}