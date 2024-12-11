/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import { epilogue } from './ui/fonts';
import TopSearch from '@/components/TopSearch';
import { FilterProvider } from '@/context/FilterContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        <FilterProvider> {/* Wrap the whole app with FilterProvider */}
          <TopSearch/>
          <Navbar/>
          {children}
          <Footer/>
        </FilterProvider>
      </body>
    </html>
  );
};
