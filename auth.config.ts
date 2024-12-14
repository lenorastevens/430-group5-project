import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', // Use JWT for session
  },  
  callbacks: {
    async session({ session, user }) {
      // Ensure that the user object is available in the session
      if (user) {
        console.log("Session callback: ", session, user);  // Log user and session

        session.user = user;  // Attach the user to the session
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
