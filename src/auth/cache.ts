import { cache } from 'react';
import { getServerSession } from '@/auth/server';

export const authCachedSafe = cache(() => getServerSession().catch(() => null));
