/* eslint-disable max-len */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/auth/server';
import { lockPhotos, unlockPhotos } from '@/photo/db/query';
import { revalidatePhotosKey } from '@/photo/cache';
import { revalidatePath } from 'next/cache';

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { photoIds } = await req.json();
  const userId = session.user.email; // Use email as the identifier

  if (!photoIds || photoIds.length === 0) {
    return NextResponse.json({ message: 'No photo IDs provided' }, { status: 400 });
  }

  const result = await lockPhotos(photoIds, userId);
  // Solo revalidar lo necesario: fotos + páginas de galería pública.
  // Mantiene la sincronización de checkmarks entre usuarios.
  revalidatePhotosKey();
  revalidatePath('/', 'page');
  revalidatePath('/grid', 'page');
  return NextResponse.json({
    message: 'Selection processed',
    locked: result.locked,
    alreadyLocked: result.alreadyLocked,
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { photoIds } = await req.json();
  const userId = session.user.email; // Use email as the identifier

  await unlockPhotos(photoIds, userId);
  // Solo revalidar lo necesario: fotos + páginas de galería pública.
  revalidatePhotosKey();
  revalidatePath('/', 'page');
  revalidatePath('/grid', 'page');

  return NextResponse.json({ message: 'Selection updated' });
}