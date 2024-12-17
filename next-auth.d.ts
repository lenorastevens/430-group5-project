import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    account_type: string;    
    emailVerified: Date | null; 
  }

  interface Session {
    user: {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
      account_type: string;
      emailVerified: Date | null;
    };
  }

  interface JWT {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    account_type: string;
    emailVerified: Date | null;
  }

}
