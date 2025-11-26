import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, getServerSession as getNextAuthServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { query } from '@/platforms/postgres';
import { Pool } from 'pg';
import PostgresAdapter from '@auth/pg-adapter';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const authOptions: NextAuthOptions = {
  adapter: PostgresAdapter(pool),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        if (
          process.env.ADMIN_EMAIL && process.env.ADMIN_EMAIL === email &&
          process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD === password
        ) {
          try {
            // Check if admin user exists in database
            const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
            let user = rows[0];

            // If admin user doesn't exist, create it
            if (!user) {
              const { rows: newUserRows } = await query(
                'INSERT INTO users (email, name, "emailVerified") VALUES ($1, $2, NOW()) RETURNING *',
                [email, 'Admin User']
              );
              user = newUserRows[0];
            }

            return user ? { id: user.id, email: user.email, name: user.name } : null;
          } catch (error) {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
      }
      if (account) {
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
    session({ session, token, user }) {
      if (!session.user) {
        session.user = {} as any;
      }

      if (session.user) {
        // When using database sessions (adapter), user is provided directly
        // When using JWT sessions, we get data from token
        if (user) {
          (session.user as any).id = user.id;
          (session.user as any).email = user.email;
          (session.user as any).name = user.name;
        } else if (token) {
          (session.user as any).id = token.id;
          (session.user as any).email = token.email;
          (session.user as any).name = token.name;
        }
      }
      if (token?.providerAccountId) {
        session.providerAccountId = token.providerAccountId;
      }
      return session;
    },
  },
};

export async function getServerSession() {
  return getNextAuthServerSession(authOptions);
}

export const runAuthenticatedAdminServerAction = async <T>(
  action: () => Promise<T>
): Promise<T> => {
  const session = await getServerSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  return action();
};
