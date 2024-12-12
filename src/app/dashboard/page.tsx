import HeroImage from '@/app/ui/dashboard/Hero';
import Description from '../ui/dashboard/Description';

export default function DashboardPage() {
    return (
        <div className="flex h-screen gap-4 p-6 bg-primary">
        {/* Image Section */}
        <div className="flex w-2/5 items-center justify-center h-full">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <HeroImage />
          </div>
        </div>
  
        {/* Description Section */}
        <div className="flex w-3/5 items-center bg-accent1 p-6 rounded-lg h-full">
        <div>
            <Description />
          </div>
        </div>
      </div>
 );
 }