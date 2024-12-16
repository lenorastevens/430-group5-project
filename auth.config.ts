import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/dashboard',
  },
  session: {
    strategy: 'jwt', // Use JWT for session
  },  
  callbacks: {
    async redirect({  }) {
      return '/dashboard';
    
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id); // Convert id to string
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.email = user.email;
        token.account_type = user.account_type;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string, // Ensure id is treated as string
          firstname: token.firstname as string,
          lastname: token.lastname as string,
          email: token.email as string,
          account_type: token.account_type as string,
          emailVerified: null, // Set this to null or an appropriate value
        };
      }
      return session;
    },
    async authorized({ request: { nextUrl }, auth }) {
      console.log("Authorized callback called");
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      console.log("Is the user on the dashboard: ", isOnDashboard);
      console.log("Is the user logged in: ", isLoggedIn);
      if (isOnDashboard) {
        if (isLoggedIn) {
          console.log("is the user logged in: ", isLoggedIn)
          return true;
        }
        console.log("User is not logged in, redirecting to login");
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        console.log("User is logged in, redirecting to dashboard");
        
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [],

} satisfies NextAuthConfig;
