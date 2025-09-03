import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth/server';
import { lockPhotos, unlockPhotos } from '@/photo/db/query';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { photoIds, userId } = await req.json();

  if (session.user.id !== userId) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  await lockPhotos(photoIds, userId);

  return NextResponse.json({ message: 'Selection received' });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { photoIds, userId } = await req.json();

  if (session.user.id !== userId) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  await unlockPhotos(photoIds, userId);

  return NextResponse.json({ message: 'Selection updated' });
}