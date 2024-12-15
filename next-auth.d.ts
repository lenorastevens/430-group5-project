import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    account_type: string;
  }

  interface Session {
    user: User;
  }
}
