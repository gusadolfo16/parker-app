'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/app/AppState';
import { SWR_KEYS } from '@/swr';

// Keeps the client signed-in state in sync after an OAuth (Google) redirect
// without a manual reload.
//
// The Google button signs in via `signIn('google', ...)`, which navigates the
// browser away to Google and back. Unlike the credentials flow — which, after
// a successful `signIn`, explicitly revalidates the GET_AUTH action and calls
// `router.refresh()` — nothing re-runs on the OAuth callback landing to refresh
// `AppStateProvider`'s server-session read (`getAuthSessionAction`). So the nav
// (name/avatar/"signed-in" state, read from that SWR result) stays stale until
// the user reloads.
//
// `useSession` lives inside `SessionProvider` and picks up the new session
// cookie on the landing. Once it reports `authenticated` while our server read
// still shows signed-out, we revalidate GET_AUTH and re-run server components
// once so the nav updates immediately. No polling.
export default function AuthSessionSync() {
  const { status } = useSession();
  const { invalidateSwr, isUserSignedIn, isCheckingAuth } = useAppState();
  const router = useRouter();

  const didSync = useRef(false);

  useEffect(() => {
    if (status === 'authenticated' && !isUserSignedIn && !isCheckingAuth) {
      if (!didSync.current) {
        didSync.current = true;
        invalidateSwr?.(SWR_KEYS.GET_AUTH, true);
        router.refresh();
      }
    } else if (status !== 'authenticated') {
      // Reset so a future sign-in re-triggers the sync.
      didSync.current = false;
    }
  }, [status, isUserSignedIn, isCheckingAuth, invalidateSwr, router]);

  return null;
}
