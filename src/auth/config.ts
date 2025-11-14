import { isPathProtected } from '@/app/path';
import NextAuth, { User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { Pool } from 'pg';
import PostgresAdapter from '@auth/pg-adapter';
import { NextRequest } from 'next/server';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  adapter: PostgresAdapter(pool),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) { return null; }
        const { email, password } = credentials;
        if (
          process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL === email &&
          process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD === password
        ) {
          const user: User = { id: email, email, name: 'Admin User' };
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: JWT, user: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: Session, token: JWT }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
    authorized({ auth, request }: { auth: Session | null | undefined, request: NextRequest }) {
      const { pathname } = request.nextUrl;

      const isUrlProtected = isPathProtected(pathname);
      const isUserLoggedIn = !!auth?.user;
      const isAdminUser = auth?.user?.email === process.env.ADMIN_EMAIL;

      const isRequestAuthorized =
        !isUrlProtected || (isUserLoggedIn && isAdminUser);

      return isRequestAuthorized;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
};
