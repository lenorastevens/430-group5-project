import { Metadata } from 'next';
import { auth } from '../../../../auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'User Profile',
};

export default async function Users() {
  const session = await auth();

  if (!session?.user) redirect("/login");

    return (
    <div className='main-body'>
      <h1>User Profile Page</h1>
      <pre>{JSON.stringify(session.user)}</pre>

    </div>
    );
  }
  