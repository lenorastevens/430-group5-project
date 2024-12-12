import { Metadata } from 'next';
import Navbar from '@/app/ui/dashboard/Navbar';
import TopSearch from "../ui/dashboard/TopSearch";
import Footer from "@/app/ui/dashboard/Footer"

export const metadata: Metadata = {
  title: 'Home',
};

// export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" grid grid-rows-[auto_1fr] grid-cols-1 md:grid-rows-1 md:grid-cols-[auto_1fr]">
      <div className="row-span-1 col-span-1 md:col-span-2 bg-secondary">
        <TopSearch />
      </div>
      
      <div className="hidden md:block bg-accent1 w-full md:w-64">
        <Navbar />
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto bg-primary md:p-12">
      {children}</div>

      <div className="row-span-1 col-span-1 py-5 md:col-span-2 text-primary bg-secondary">
        <Footer />
      </div>
    </div>
  );
}