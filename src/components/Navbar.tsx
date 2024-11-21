"use client";

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="left-nav">
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`menu ${isOpen ? 'open' : ''}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/customers">Customers</Link></li>
        <li><Link href="/sellers">Sellers</Link></li>
        <li><Link href="/product">Product</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
