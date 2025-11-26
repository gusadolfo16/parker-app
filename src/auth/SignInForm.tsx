'use client';
import { useState } from 'react';
import SubmitButtonWithStatus from '@/components/SubmitButtonWithStatus';

export type SignInResponse = 'success' | 'CredentialsSignin' | undefined;
import { clsx } from 'clsx/lite';
import FaGoogleIcon from '@/components/icons/FaGoogleIcon';
import { signIn } from 'next-auth/react';
import { useAppText } from '@/i18n/state/client';
import { PATH_ROOT } from '@/app/path';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/app/AppState';

import { SWR_KEYS } from '@/swr';

export default function SignInForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const appText = useAppText();
  const { invalidateSwr } = useAppState();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    if (result?.error) {
      setError(result.error);
    } else {
      invalidateSwr?.(SWR_KEYS.GET_AUTH);
      router.push(PATH_ROOT);
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm w-full space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">
        {appText.auth.signIn}
      </h1>
      <input
        type="email"
        name="email"
        placeholder={appText.auth.email}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder={appText.auth.password}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      {error && (
        <p className="text-red-500 text-center">
          {appText.auth.invalidEmailPassword}
        </p>
      )}
      <SubmitButtonWithStatus
        className="w-full bg-blue-500 text-white p-2 rounded"
        isLoading={isLoading}
      >
        {appText.auth.signIn}
      </SubmitButtonWithStatus>
      <div className="relative flex items-center justify-center text-sm">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center bg-white px-2">
          <span className="text-gray-500">
            {appText.auth.or}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => signIn('google', { callbackUrl: PATH_ROOT })}
        className={clsx(
          'w-full flex items-center justify-center gap-2 p-2 rounded',
          'bg-red-500 text-white',
        )}
      >
        <FaGoogleIcon />
        {appText.auth.signInWithGoogle}
      </button>
    </form>
  );
}