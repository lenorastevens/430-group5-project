import '@/app/ui/global.css';
import { epilogue } from './ui/fonts';
import { Metadata } from 'next';
import { FilterProvider } from './ui/FilterContext';

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafte Haven Home Page',
    default: 'HH Home Page',
  },
  description: 'The official page for Artisans to Showcase their work!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> 
    <FilterProvider     >
      <body className={`${epilogue.className} antialiased`}>{children}</body>
      </FilterProvider>
    </html>
  );
}
