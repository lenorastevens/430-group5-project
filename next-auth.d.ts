import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    account_type: string;    emailVerified: Date | null; // Add this property

  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    account_type: string;
  }

}
