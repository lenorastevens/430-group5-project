'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/NavLinks';
import HHLogo from '@/app/ui/hh-logo';
import { PowerIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useActionState } from 'react';
import { handleSignOut } from '@/app/lib/actions';

export default function SideNav() {
  const [, formAction] = useActionState(handleSignOut, undefined); // Only use formAction

  // State for managing the mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className="flex flex-col h-full px-4 py-6 bg-accent1 md:px-2 md:w-64 relative">
      {/* Logo */}
      <Link className="mb-6 flex items-center justify-center rounded-md p-4 bg-accent1 md:mb-8" href="/">
        <div className="w-32 md:w-40">
          <HHLogo />
        </div>
      </Link>

      {/* Hamburger Button (only visible on small screens) */}
      <div className="md:hidden flex justify-between mx-auto items-center mb-2 z-50">
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-accent2 transition"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-secondary" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-secondary" />
          )}
        </button>
      </div>

      {/* Desktop Menu and Mobile Menu */}
      <div className="flex flex-col flex-grow mx-auto justify-between">
        {/* Mobile Menu (hidden by default on larger screens, visible when the menu is open) */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        >
          {/* Navigation Links */}
          <NavLinks />

          {/* Sign-out button */}
          <div className="flex justify-start">
            <form action={formAction}>
              <button
                type="submit"
                className="flex items-center justify-start gap-3 p-2 text-sm font-medium text-accent3 rounded-md bg-accent1 hover:bg-accent2"
              >
                <PowerIcon className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>

        {/* Desktop Menu (hidden on smaller screens) */}
        <div className="hidden md:flex flex-col space-y-4">
          {/* Navigation Links */}
          <NavLinks />

          {/* Sign-out button */}
          <div className="flex justify-start">
            <form action={formAction}>
              <button
                type="submit"
                className="flex items-center justify-start gap-3 p-2 text-sm font-medium text-accent3 rounded-md bg-accent1 hover:bg-accent2"
              >
                <PowerIcon className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
