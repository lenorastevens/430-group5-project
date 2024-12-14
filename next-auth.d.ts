import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    type: string;
  }

  interface Session {
    user: User;
  }
}
