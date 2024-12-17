import HeroImage from '@/app/ui/dashboard/Hero';
import Description from '../ui/dashboard/Description';
import 'dotenv/config';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-primary">
      {/* Image Section */}
      <div className="flex w-full items-center justify-center h-64 md:h-full md:w-2/5">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <HeroImage />
        </div>
      </div>
      
      {/* Description Section */}
      <div className="flex w-full items-center bg-accent1 p-4 md:p-6 rounded-lg md:w-3/5">
        <div className="w-full">
          <Description />
        </div>
      </div>
    </div>
  );
}

