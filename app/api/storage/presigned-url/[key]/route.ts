import { getServerSession } from '@/auth/server';
import {
  awsS3Client,
  awsS3PutObjectCommandForKey,
} from '@/platforms/storage/aws-s3';
import {
  cloudflareR2Client,
  cloudflareR2PutObjectCommandForKey,
} from '@/platforms/storage/cloudflare-r2';
import {
  CURRENT_STORAGE,
  HAS_AWS_S3_STORAGE, // Import HAS_AWS_S3_STORAGE from config.ts
  HAS_CLOUDFLARE_R2_STORAGE, // Import HAS_CLOUDFLARE_R2_STORAGE from config.ts
} from '@/app/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const { searchParams } = new URL(request.url);
  const storage = searchParams.get('storage');

  const session = await getServerSession();
  if (session?.user && key) {
    let client;
    let putCommand;

    // Prioritize storage type from query parameter
    if (storage === 'cloudflare-r2' && HAS_CLOUDFLARE_R2_STORAGE) {
      client = cloudflareR2Client();
      putCommand = cloudflareR2PutObjectCommandForKey(key);
    } else if (storage === 'aws-s3' && HAS_AWS_S3_STORAGE) {
      client = awsS3Client();
      putCommand = awsS3PutObjectCommandForKey(key);
    } else if (CURRENT_STORAGE === 'cloudflare-r2' && HAS_CLOUDFLARE_R2_STORAGE) {
      client = cloudflareR2Client();
      putCommand = cloudflareR2PutObjectCommandForKey(key);
    } else if (CURRENT_STORAGE === 'aws-s3' && HAS_AWS_S3_STORAGE) {
      client = awsS3Client();
      putCommand = awsS3PutObjectCommandForKey(key);
    } else {
      return new Response(
        'Storage provider not configured for presigned URL',
        { status: 500 }
      );
    }

    if (!client || !putCommand) {
      return new Response(
        'Failed to initialize storage client or command',
        { status: 500 }
      );
    }

    const url = await getSignedUrl(client, putCommand, { expiresIn: 3600 });
    return new Response(
      url,
      { headers: { 'content-type': 'text/plain' } },
    );
  } else {
    return new Response('Unauthorized request', { status: 401 });
  }
}
