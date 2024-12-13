'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import LogoImage from '@/components/Logo';



const Navbar = () => {
  const { isAuthenticated, setAuthenticated } = useAuth();

  const logout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';  
    setAuthenticated(false);
  };

  return (
    <div id="left-nav">
      <nav className="left-nav">
        <LogoImage />
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link href="/users">User Profile</Link>
              </li>
              <li>
                <Link href="/artisans">Artisans</Link>
              </li>
              <li>
                <Link href="/product">Products</Link>
              </li>
              <li>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        .logout-button {
          border: none;
          cursor: pointer;
          font-size: 20px;
        }

        .logout-button:hover {
          color: #EAA037;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
