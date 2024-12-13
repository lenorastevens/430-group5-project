/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import { epilogue } from './ui/fonts';
import TopSearch from '@/components/TopSearch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext'; // Corrected import path for AuthContext

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300&family=Sancreek&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={epilogue.className}>
        <AuthProvider>
          <TopSearch />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
