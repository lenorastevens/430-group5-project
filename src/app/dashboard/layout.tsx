import { Metadata } from 'next';
import Navbar from '@/app/ui/dashboard/Navbar';
import TopSearch from "../ui/dashboard/TopSearch";
import Footer from "@/app/ui/dashboard/Footer";
import { FilterProvider } from '@/app/ui/FilterContext';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 md:grid-rows-1 md:grid-cols-[auto_1fr]">
      <FilterProvider>
        {/* Top Search */}
        <div className="row-span-1 col-span-1 md:col-span-2 bg-secondary">
          <TopSearch />
        </div>

        {/* Navbar for all screen sizes */}
        <div className="w-full bg-accent1 z-50">
          <Navbar />
        </div>

        {/* Main content area */}
        <div className="flex-grow p-6 md:overflow-y-auto bg-primary md:p-12">
          {children}
        </div>

        {/* Footer */}
        <div className="row-span-1 col-span-1 py-5 md:col-span-2 text-primary bg-secondary">
          <Footer />
        </div>
      </FilterProvider>
    </div>
  );
}
