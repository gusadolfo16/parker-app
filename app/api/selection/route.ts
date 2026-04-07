/* eslint-disable max-len */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/auth/server';
import { lockPhotos, unlockPhotos } from '@/photo/db/query';
import { revalidatePhotosKey } from '@/photo/cache';

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
  // Revalidar solo el tag 'photos' en lugar de todas las rutas
  // Esto reduce los ISR Writes de ~200+ a 1 por cada acción de selección
  revalidatePhotosKey();
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
  // Revalidar solo el tag 'photos' en lugar de todas las rutas
  revalidatePhotosKey();

  return NextResponse.json({ message: 'Selection updated' });
}