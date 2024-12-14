'use client'
import { useState } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/NavLinks';
import HHLogo from '@/app/ui/hh-logo';
import { PowerIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { signOut } from '../../../../auth';


export default function SideNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
  };

  return (
    <div className={`flex flex-col h-full px-4 py-6 bg-accent1 md:px-2 md:w-64 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
      {/* Hamburger icon for small screens */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <Link href="/" className="flex items-center justify-center rounded-md p-4 bg-accent1">
          <div className="w-32 md:w-40">
            <HHLogo />
          </div>
        </Link>
        <button type="button" onClick={toggleSidebar} className="p-2 text-white" aria-label="Toggle sidebar">
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Logo and Links */}
      <Link className="mb-6 flex items-center justify-center rounded-md p-4 bg-accent1 md:mb-8" href="/">
        <div className="w-32 md:w-40">
          <HHLogo />
        </div>
      </Link>
      
      {/* Navigation Links */}
      <div className="flex flex-col flex-grow space-y-4">
        <NavLinks />

        {/* Sign-out button */}
        <form 
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type="button"
            className="flex items-left justify-left gap-3 p-2 text-sm font-medium text-accent3 rounded-md bg-accent1 hover:bg-accent2 md:w-full"
          >
            <PowerIcon className="w-5 h-5" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
