import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/app/config';

// Allow the site generally, but keep crawlers out of heavy category listing
// paths (which fan out into many image-bearing pages) to reduce origin load.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/tag/',
        '/t/',
        '/shot-on/',
        '/lens/',
        '/film/',
        '/focal/',
        '/recipe/',
        '/year/',
        '/recents/',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
