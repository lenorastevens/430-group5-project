import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    if (user.rows.length === 0) return undefined;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(credentials) {
        console.log("Authorize function called with credentials:", credentials);

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          console.log("These are parsedCredentials: ", parsedCredentials)
        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            console.log("User data returned from getUser: ", user)
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) {
              console.log("Did passwords match? ", passwordsMatch)
              console.log({ id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, account_type: user.account_type })
              return { id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email, account_type: user.account_type, emailVerified: user.emailVerified};
            }
        }   
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});