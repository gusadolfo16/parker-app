'use server';

import { getServerSession } from '@/auth/server';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  generateAuthSecret,
  KEY_CALLBACK_URL,
  KEY_CREDENTIALS_CALLBACK_ROUTE_ERROR_URL,
  KEY_CREDENTIALS_SIGN_IN_ERROR,
  KEY_CREDENTIALS_SIGN_IN_ERROR_URL,
  KEY_CREDENTIALS_SUCCESS,
} from '.';
import { PATH_ROOT } from '@/app/path';

export const signOutAction = async () => {
  redirect('/api/auth/signout');
};

export const getAuthAction = async () => getServerSession();

export const getAuthSessionAction = async () => {
  const session = await getServerSession();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
  return { session, isAdmin };
};

export const logClientAuthUpdate = async (data: Session | null | undefined) =>
  console.log('Client auth update', data);

export const generateAuthSecretAction = async () => generateAuthSecret();
