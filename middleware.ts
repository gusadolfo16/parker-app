import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {
  PATH_ADMIN,
  PATH_ADMIN_PHOTOS,
  PATH_OG,
  PATH_OG_SAMPLE,
  PREFIX_PHOTO,
  PREFIX_TAG,
} from './src/app/path';

const middleware = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  if (pathname === PATH_ADMIN) {
    return NextResponse.redirect(new URL(PATH_ADMIN_PHOTOS, req.url));
  } else if (pathname === PATH_OG) {
    return NextResponse.redirect(new URL(PATH_OG_SAMPLE, req.url));
  } else if (/^\/photos\/(.)+$/.test(pathname)) {
    // Accept /photos/* paths, but serve /p/*
    const matches = pathname.match(/^\/photos\/(.+)$/);
    return NextResponse.rewrite(new URL(
      `${PREFIX_PHOTO}/${matches?.[1]}`,
      req.url,
    ));
  } else if (/^\/t\/(.)+$/.test(pathname)) {
    // Accept /t/* paths, but serve /tag/*
    const matches = pathname.match(/^\/t\/(.+)$/);
    return NextResponse.rewrite(new URL(
      `${PREFIX_TAG}/${matches?.[1]}`,
      req.url,
    ));
  }

  return NextResponse.next();
};

export default withAuth(middleware, {
  callbacks: {
    authorized: ({ token, req }) => {
      const pathname = req.nextUrl.pathname;
      return !!token
        || pathname.startsWith('/t/')
        || pathname.startsWith('/photos/')
        || pathname.startsWith('/artist-statement')
        || pathname.startsWith('/user-guide');
    },
  },
});

export const config = {
  // Excludes:
  // - /api + /api/auth*
  // - /_next/static*
  // - /_next/image*
  // - /favicon.ico + /favicons/*
  // - /sign-in
  // - /grid
  // - /full
  // - /p
  // - /tag
  // - /shot-on
  // - /film
  // - /lens
  // - /focal
  // - /recipe
  // - /year
  // - /recents
  // - / (root)
  // - /home-image
  // - /template-image
  // - /template-image-tight
  // - /template-url
  // eslint-disable-next-line max-len
  matcher: ['/((?!api|api/auth|_next/static|_next/image|favicon.ico|favicons|sign-in|grid|full|p|tag|shot-on|film|lens|focal|recipe|year|recents|home-image|template-image|template-image-tight|template-url|artist-statement|user-guide).+)'],
};
