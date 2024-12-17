'use client';

import {
  UserGroupIcon,
  HomeModernIcon,
  ScissorsIcon,
  UserCircleIcon,
  // StarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeModernIcon },
  { name: 'User Profile', href: '/dashboard/users', icon: UserCircleIcon },
  { name: 'Artisans', href: '/dashboard/artisans', icon: UserGroupIcon },
  { name: 'Products', href: '/dashboard/product', icon: ScissorsIcon},
  // { name: 'Reviews', href: '/dashboard/reviews', icon: StarIcon }
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center gap-2 rounded-md bg-accent1 p-3 text-sm font-medium hover:bg-accent2 hover:text-accent3 md:flex-none md:justify-start md:p-2 md:px-3', // Adjusted to remove center alignment
              {
                'bg-accent1 text-accent3': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}