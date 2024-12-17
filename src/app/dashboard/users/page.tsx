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
      <div>
        <h1 className="text-4xl text-center text-secondary font-sancreek font-semibold mb-4">{session.user.firstname} {session.user.lastname} Profile Page</h1>
      </div>
      <div className="mt-8">
        <div className="bg-accent1  rounded-lg p-6">
          <h2 className="text-center text-2xl font-semibold mb-4">Email:</h2>
          <p className="mb-4 text-center"><strong>{session.user.email}</strong></p>
          <h2 className="text-center text-2xl font-semibold mb-4">Account Type: </h2>
          <p className="mb-4 text-center"><strong>{session.user.account_type}</strong></p>
        </div>
      </div>
    </div>
    );
  }
  