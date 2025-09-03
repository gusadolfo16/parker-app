import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth/server';

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { photoIds } = await req.json();

  // Here, you would typically store photoIds in a database
  // associated with the user's session or a temporary storage.
  // For now, we'll just log them.
  console.log('Received selected photo IDs:', photoIds);

  return NextResponse.json({ message: 'Selection received' });
}