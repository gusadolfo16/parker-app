'use server';

/* eslint-disable max-len */

import { getServerSession } from '@/auth/server';
import { query } from '@/platforms/postgres';
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
  let isContractSigned = false;
  if (session?.user?.email) {
    try {
      const { rows } = await query(
        'SELECT contract_signed FROM users WHERE email = $1',
        [session.user.email],
      );
      isContractSigned = rows[0]?.contract_signed ?? false;
    } catch (e: any) {
      // Column doesn't exist yet — run migration and retry
      if (/column "contract_signed" does not exist/i.test(e.message)) {
        await query(
          'ALTER TABLE users ADD COLUMN IF NOT EXISTS contract_signed BOOLEAN DEFAULT FALSE',
          [],
        );
        const { rows } = await query(
          'SELECT contract_signed FROM users WHERE email = $1',
          [session.user.email],
        );
        isContractSigned = rows[0]?.contract_signed ?? false;
      }
    }
  }
  return { session, isAdmin, isContractSigned };
};

export const signContractAction = async () => {
  const session = await getServerSession();
  if (session?.user?.email) {
    await query(
      'UPDATE users SET contract_signed = TRUE WHERE email = $1',
      [session.user.email],
    );
  }
};

export const logClientAuthUpdate = async (data: Session | null | undefined) =>
  console.log('Client auth update', data);

export const generateAuthSecretAction = async () => generateAuthSecret();
